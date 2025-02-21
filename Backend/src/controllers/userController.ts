import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserDTO } from "../DTOs/userDTO";
import getDB from "../DB/db";
import bcrypt from "bcrypt";

const router = Router();
const SECRET_KEY = "shhhhh";

router.get("/users", async (req: Request, res: Response) => {
  console.log("[Info] All users requested.");

  const db = await getDB();

  const query = `
    SELECT 
        u.*, 
        t.latest_date AS latest_training_date
    FROM users u
    LEFT JOIN (
        SELECT user_id, MAX(date) AS latest_date
        FROM trainings
        GROUP BY user_id
    ) t ON u.id = t.user_id;
`;

  const usersRaw = await db.all(query);

  const users: UserDTO[] = usersRaw.map((user: any) => ({
    id: user.id,
    name: user.name,
    lastTraining: user.latest_training_date ?? null,
  }));

  res.json(users);
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, pin } = req.body;
  if (!username || !pin) {
    res.status(400).json({ error: "Username and PIN are required" });
    return;
  }
  console.log(`[Info] User ${username} requesting login.`);

  const db = await getDB();
  const user = await db.get("SELECT * FROM users WHERE name = (?)", [username]);

  if (!user) {
    console.log(`[Sus] Requested user "${username}" does not exist.`);
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const passwordMatch = await bcrypt.compare(pin, user.password);
  if (!passwordMatch) {
    console.log(`[Sus] User "${username}" used wrong credentials.`);
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: user.id, name: user.name, isAdmin: user.is_admin === 1 }, SECRET_KEY, {
    expiresIn: "1d",
  });

  console.log(`[Info] User "${username}" logged in admin:${user.is_admin}.`);
  res.json({ token: token });
});

export default router;
