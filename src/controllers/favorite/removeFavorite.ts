import { Request, Response } from 'express';
import User from '../../models/userModel';
import ErrorHandler from '../../utils/errorHandler';

const removeFavorite = async (req: Request, res: Response) => {
    try {
        const { userId, pokemonId } = req.body;
        if (!userId || !pokemonId) throw new ErrorHandler("ERROR_MISSING_PARAMETERS", 400);

        const user = await User.findById(userId).populate('favorites');
        if (!user) throw new ErrorHandler("ERROR_USER_NOT_FOUND", 404);

        const isFavorite = user.favorites.includes(pokemonId);
        if (!isFavorite) throw new ErrorHandler("ERROR_POKEMON_NOT_FAVORITE", 400);

        user.favorites = user.favorites.filter(fav => fav.toString() !== pokemonId.toString());
        await user.save();
        return res.status(200).send({ message: "success", data: user.favorites });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_DELETE_FAVORITE";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
};

export default removeFavorite;