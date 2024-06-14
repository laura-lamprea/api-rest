
import { Request, Response, NextFunction } from 'express'
const { body, validationResult } = require("express-validator");

const addFavoriteMiddleware = [
    body("userId")
        .notEmpty().withMessage(`User ID is required`)
        .isMongoId().withMessage(`User ID must be a valid Mongo ID`),
    body("pokemonId")
        .notEmpty().withMessage(`Pokemon ID is required`)
        .isInt({ min: 1, max: 300 }).withMessage(`Pokemon ID must be an integer between 1 and 300`),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).array();
        if (errors.length > 0)
            return res.status(400).send({ message: "Action failed", errors });
        next();
    },
];

export default addFavoriteMiddleware;
