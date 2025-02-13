import { Request, Response } from "express";
import { Router } from "express";
import { MachineDTO } from "../DTOs/machineDTO";
import getDB from "../DB/db";
import { TrainingDTO } from "../DTOs/trainingDTO";

const router = Router();

router.get("/machines", async (req: Request, res: Response) => {
  console.log("[Info] All machines requested.");
  const userId = res.locals.user.id;

  const db = await getDB();
  const query = `
    SELECT 
        m.*, 
        t.id AS training_id, 
        t.date, 
        t.weight1
    FROM machines m
    LEFT JOIN (
        SELECT * 
        FROM trainings 
        WHERE user_id = ? 
        ORDER BY date DESC
    ) t ON m.id = t.machine_id
    WHERE m.is_active = 1
    GROUP BY m.id;
`;

  const machinesRaw = await db.all(query, [userId]);

  const machines: MachineDTO[] = machinesRaw
    .filter((m) => m.is_active)
    .map((machine: any) => ({
      id: machine.id,
      name: machine.name,
      lastTraining: machine.date,
      lastWeight: machine.weight1,
    }));

  res.json(machines);
});

router.get("/:id", async (req: Request, res: Response) => {
  console.log(`[Info] Detail for machine ${req.params.id} requested.`);

  const db = await getDB();
  const trainingsRaw = await db.all("SELECT * FROM trainings WHERE user_id = (?) AND machine_id = (?)", [
    res.locals.user.id,
    req.params.id,
  ]);
  const trainings: TrainingDTO[] = trainingsRaw.map((training: any) => ({
    id: training.id,
    machine_id: training.machine_id,
    date: training.date,
    reps1: training.reps1,
    reps2: training.reps2,
    reps3: training.reps3,
    weight1: training.weight1,
    weight2: training.weight2,
    weight3: training.weight3,
  }));
  
  const latestTraining = [...trainings].reverse()[0]
  const machineRaw = await db.get("SELECT * FROM machines WHERE id = (?)", [req.params.id]);
  const machine: MachineDTO = {
    id: machineRaw.id,
    name: machineRaw.name,
    lastTraining: latestTraining.date,
    lastWeight: latestTraining.weight1,
  };

  res.json({ machine: machine, trainings: trainings });
});

export default router;
