import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserDTO } from "../DTOs/user";
import getDB from "../DB/db";
import bcrypt from "bcrypt";

const router = Router();
const SECRET_KEY = "shhhhh";

router.get("/user", async (req: Request, res: Response) => {
  console.log("[Info] All users requested.");

  const db = await getDB();
  const usersRaw = await db.all("SELECT * FROM users");

  const users: UserDTO[] = usersRaw.map((user: any) => ({
    id: user.id,
    name: user.name,
    lastTraining: user.last_training ?? null, // Ensure null safety
  }));

  res.json(users);
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(`[Info] User ${username} requesting login.`);

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const db = await getDB();
  const user = await db.get("SELECT * FROM users WHERE name = 'Laurin'");

  if (!user) {
    console.log(`[Sus] Requested user "${username}" does not exist.`);
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    console.log(`[Sus] User "${username}" used wrong credentials.`);
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: user.id, name: user.name, isAdmin: user.is_admin === 1 }, SECRET_KEY, {
    expiresIn: "1d",
  });

  res.send(token);
});

export default router;
