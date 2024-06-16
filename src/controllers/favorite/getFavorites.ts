import { Request, Response } from 'express';
import User from '../../models/userModel';
import ErrorHandler from '../../utils/errorHandler';
import { IPokemon } from '../../interfaces/IPokemons';
import axios from 'axios';

const getFavorites = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new ErrorHandler("ERROR_MISSING_ID", 400);

        const user = await User.findById(id).populate('favorites');
        if (!user) throw new ErrorHandler("ERROR_USER_NOT_FOUND", 404);
        
        const favoriteIds = user.favorites || [];
        const pokemonDataPromises = favoriteIds.map(async (id) => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonData = await response.data;

            const filteredPokemonData: IPokemon = {
                id: pokemonData.id,
                name: pokemonData.name,
                lifeTime: pokemonData.stats[0].base_stat,
                force: pokemonData.stats[1].base_stat,
                defending: pokemonData.stats[2].base_stat,
                speed: pokemonData.stats[5].base_stat,
                height: pokemonData.height,
                weight: pokemonData.weight,
                type: pokemonData.types.map((type: any) => type.type.name),
                imgT: pokemonData.sprites.other['official-artwork'].front_default,
            };

            return filteredPokemonData;
        });
        const favoritePokemons = await Promise.all(pokemonDataPromises);
        return res.status(200).send({ message: "success", data: favoritePokemons });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_GET_FAVORITES";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default getFavorites;