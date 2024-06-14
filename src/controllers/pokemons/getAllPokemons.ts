import { Request, Response } from 'express';
import ErrorHandler from '../../utils/errorHandler';
import { IPokemon } from '../../interfaces/IPokemons';
import axios from 'axios';

const getPokemons = async (req: Request, res: Response) => {
    try {
        const { limit = 120 } = req.query;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const urlArr = response.data.results.map((p: any) => p.url);
        const pokemonsData = await Promise.all(urlArr.map((url: string) => axios.get(url)));

        const pokemons: IPokemon[] = pokemonsData.map(({ data: pokemonData }) => ({
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
        }));

        return res.status(200).send({ message: "success", data: pokemons });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_GET_POKEMONS";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default getPokemons;
