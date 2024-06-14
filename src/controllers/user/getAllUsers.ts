import { Request, Response } from "express";
import ErrorHandler from "../../utils/errorHandler";
import User from "../../models/userModel";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.status(200).send({ message: "success", data: users });
    } catch (error) {      
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_OBTAIN_ALL_USERS";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
}

export default getAllUsers;