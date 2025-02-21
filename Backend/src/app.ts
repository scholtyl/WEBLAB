import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userController from "./controllers/userController";
import machineController from "./controllers/machineController";
import trainingController from "./controllers/trainingController";
import statisticsController from "./controllers/statisticsController";
import adminController from "./controllers/adminController";
import { authMiddleware } from "./middlewares/jwtMiddleware";
import { adminMiddleware } from "./middlewares/adminMiddleware";

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use("/api/user", userController);
app.use("/api/machine", authMiddleware, machineController);
app.use("/api/training", authMiddleware, trainingController);
app.use("/api/statistics", authMiddleware, statisticsController);
app.use("/api/admin", authMiddleware, adminMiddleware, adminController);

app.use(express.static("public"));

app.get("**", (req: Request, res: Response) => {
    res.status(404).json({error: "Sorry, no endpoint here!"});
});

export default app;
