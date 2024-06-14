import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET as string;

interface AuthRequest extends Request {
    user?: { userId: string }; 
  }

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token?.toString();
        if (!token) return res.status(401).json({ error: 'ERROR_NO_TOKEN' });
        const decoded = jwt.verify(token, secretKey) as { userId: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;