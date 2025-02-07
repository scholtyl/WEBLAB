import express, { Request, Response, Router} from "express";
import dotenv from "dotenv";
import userController from "./controllers/userController";
import machineController from "./controllers/machineController";
import { authMiddleware } from "./middlewares/jwtMiddleware";

dotenv.config(); // Load environment variables

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/user", userController);
app.use("/api/machine",authMiddleware, machineController);

app.get("**", (req: Request, res: Response) => {
    res.status(404).send("Sorry, no endpoint here!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
