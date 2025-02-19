import express, { Request, Response, Router} from "express";
import dotenv from "dotenv";
import userController from "./controllers/userController";
import machineController from "./controllers/machineController";
import { authMiddleware } from "./middlewares/jwtMiddleware";
import cors from 'cors';
import trainingController from "./controllers/trainingController";
import adminController from "./controllers/adminController";
import statisticsController from "./controllers/statisticsController";
import { adminMiddleware } from "./middlewares/adminMiddleware";

dotenv.config(); // Load environment variables

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:4200', // Allow requests only from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  }));

app.use(express.json());

app.use("/api/user", userController);
app.use("/api/machine",authMiddleware, machineController);
app.use("/api/training",authMiddleware, trainingController);
app.use("/api/statistics",authMiddleware, statisticsController);
app.use("/api/admin", authMiddleware, adminMiddleware, adminController);

app.use(express.static("public"));

app.get("**", (req: Request, res: Response) => {
    res.status(404).send("Sorry, no endpoint here!");
});

app.listen(PORT, () => {
    console.log(`[Info] Server running at http://localhost:${PORT}`);
});
