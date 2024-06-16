import { Request, Response } from "express";
import ErrorHandler from "../../utils/errorHandler";
import User from "../../models/userModel";

const getUser = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;
        if (!email)
            throw new ErrorHandler("ERROR_MISSING_PARAMETERS", 400);
        const user = await User.findOne({ email: email.toLowerCase() }).populate('favorites');
        return res.status(200).send({ message: "success", data: { email, id: user?.id, username: user?.username, favorites: user?.favorites } });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_OBTAIN_ALL_USERS";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
}

export default getUser;