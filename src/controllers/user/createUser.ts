import { Request, Response } from "express";
import ErrorHandler from "../../utils/errorHandler";
import User from "../../models/userModel";
const bcrypt = require("bcryptjs")

const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            throw new ErrorHandler("ERROR_MISSING_PARAMETERS", 400)

        const checkIfExists = await User.findOne({ email: email.toLowerCase() })
        if (checkIfExists)
            throw new ErrorHandler("ERROR_USER_ALREADY_EXISTS", 400);

        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userCreated = await User.create({ username, email: email.toLowerCase(), password: hashedPassword });
        if(!userCreated) throw new ErrorHandler("USER_NOT_CREATED", 400);
        
        return res.status(200).send({ message: "success", email: userCreated.email });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_CREATING_USER";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
}

export default createUser;