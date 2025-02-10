import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt"
import zod, { string } from "zod";
import { Content, Link, User } from "./db";
import { JWT_SECRET } from "./config";
import userMiddleware from "./middleware";
import { random } from "./utils";
import cors from "cors";

const router: Router = Router();
const app: express.Application = express();

app.use(express.json()) // Middleware to parse JSON requests
// CORS configuration - must be before any routes
app.use(cors({
    origin: "http://localhost:5173" // Allow requests from frontend
}));

// Define routes here...

const PORT = 3000; // Define the port for the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`); // Log server start
}); 