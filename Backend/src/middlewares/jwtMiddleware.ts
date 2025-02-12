import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = "shhhhh"; // Replace with a strong secret key (use env variables in production)

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if the Authorization header exists
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return;
      }

      // Success
      res.locals.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Token Processing Error:", error);
    res.status(401).json({ message: "Unauthorized: Token processing failed" });
  }
};
