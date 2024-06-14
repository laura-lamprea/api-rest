import { Request, Response } from "express";
import ErrorHandler from "../../utils/errorHandler";
import User from "../../models/userModel";
import jwt from 'jsonwebtoken';
const bcrypt = require("bcryptjs");
const secretKey = process.env.JWT_SECRET as string;

const loginWithCredentials = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new ErrorHandler("ERROR_MISSING_PARAMETERS", 400);

        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user || !await bcrypt.compare(password, user.password)) 
            throw new ErrorHandler("ERROR_INVALID_CREDENTIALS", 401)
        
        const token = jwt.sign({ userId: user.id, userName: user.username }, secretKey , { expiresIn: '1h' });
        return res.status(200).send({ message: "success", token });
    } catch (error) {
        const customInstance = error instanceof ErrorHandler;
        const message = customInstance
            ? error.message
            : "ERROR_CANNOT_LOGIN_USER";
        const status = customInstance ? error.statusNumber : 400;
        return res.status(status).send({ message: message });
    }
}

export default loginWithCredentials;