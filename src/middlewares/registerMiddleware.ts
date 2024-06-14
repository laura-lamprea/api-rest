
import { Request, Response, NextFunction } from 'express'
const { body, validationResult } = require("express-validator");

const registerMiddleware = [
    body("username")
        .notEmpty().withMessage(`Username is required`)
        .isString().withMessage(`Username must be a string`)
        .isLength({ min: 3 }).withMessage(`Username must be at least 3 characters long`),
    body("email")
        .notEmpty().withMessage(`Email is required`)
        .isString().withMessage(`Email must be a string`)
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "i").withMessage(`Email must be a valid email address`),
    body("password")
        .notEmpty().withMessage(`Password are required`)
        .isString().withMessage(`Password must be a string`)
        .isLength({ min: 6 }).withMessage(`Password must be at least 6 characters long`)
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/).withMessage(`Password must contain at least one uppercase letter, one lowercase letter, and one number`),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).array();
        if (errors.length > 0)
            return res.status(400).send({ message: "Registration failed", errors });
        next();
    },
];

export default registerMiddleware;