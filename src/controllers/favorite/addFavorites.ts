import { Request, Response } from 'express';
import User from '../../models/userModel';
import ErrorHandler from '../../utils/errorHandler';

const addFavorite = async (req: Request, res: Response) => {
    try {
        const { userId, pokemonId } = req.body;
        if (!userId || !pokemonId) throw new ErrorHandler("ERROR_MISSING_PARAMETERS", 400);
        const user = await User.findById(userId).populate('favorites');
        if (!user) throw new ErrorHandler("ERROR_USER_NOT_FOUND", 404);
        if (user.favorites.length >= 10) throw new ErrorHandler("ERROR_CANNOT_HAVE_MORE_THAN_TEN_POKEMONS", 400);
        if (user.favorites.includes(pokemonId)) throw new ErrorHandler("ERROR_POKEMON_ALREADY_FAVORITE", 400);
        user.favorites.push(pokemonId);
        await user.save();
        return res.status(201).send({ message: "success", data: user.favorites });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_ADD_FAVORITE";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default addFavorite;