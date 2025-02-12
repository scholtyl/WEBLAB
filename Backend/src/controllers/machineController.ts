import { Request, Response } from "express";
import { Router } from "express";
import { MachineDTO } from "../DTOs/machineDTO";
import getDB from "../DB/db";

const router = Router();

router.get("/machines", async (req: Request, res: Response) => {
  console.log("[Info] All machines requested.");

  const db = await getDB();
  const machinesRaw = await db.all("SELECT * FROM machines");

  const machines: MachineDTO[] = machinesRaw.filter(m => m.is_active).map((machine: any) => ({
    id: machine.id,
    name: machine.name,
    lastTraining: "2001-03-19",
    lastWeight: 22
  }));

  res.json(machines);
});

export default router;
