import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/jwtMiddleware";
import { User } from "../DTOs/user";

const router = Router();

router.get("/user", (req: Request, res: Response) => {
  console.log("Users requested.");
  let u1 = new User("123", "Laurin", new Date("2001-03-19"));
  let u2 = new User("456", "Gast", new Date("1241-08-01"));
  res.json([u1, u2]);
});

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log(`Someone tried to login with UN:${username} and PW:${password}`);

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  var token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "1h" });
  res.send(token);
});

export default router;
