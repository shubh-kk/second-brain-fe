import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

// Middleware to verify user authentication
const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Get the JWT token from the request headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(403).json({ msg: 'No token provided' }); // Respond if no token
        return;
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(authHeader, JWT_SECRET) as { id: string };
        // Attach the decoded user (information) to the request object
        req.userId = decoded.id;
        next(); // Proceed to the next middleware
    } catch (e) {
        res.status(403).json({ msg: 'Invalid token' }); // Respond if token is invalid
        return;
    }
};

export default userMiddleware; // Export middleware for use in routes 