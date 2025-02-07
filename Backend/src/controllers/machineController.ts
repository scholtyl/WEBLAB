import { Request, Response } from "express";
import { Router } from "express";
import { Machine } from "../DTOs/Machine";

const router = Router();

router.get("/machines", (req: Request, res: Response) => {
  console.log("Machines requested.");

  let m1 = new Machine(1, "Bauchpresse", new Date("1241-08-01"), 30);
  let m2 = new Machine(2, "Beinpresse", new Date("1241-08-01"), 50);
  let m3 = new Machine(3, "Brustpresse", new Date("1241-08-01"), 35);
  let m4 = new Machine(4, "Lat-Zug", new Date("1241-08-01"), 40);
  let m5 = new Machine(5, "Rückenstrecker", new Date("1241-08-01"), 5);
  let m6 = new Machine(6, "Schulterpresse", new Date("1241-08-01"), 15);

  res.json([m1, m2, m3, m4, m5, m6]);
});

export default router;
