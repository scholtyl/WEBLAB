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
      t.date AS last_training, 
      t.weight1 AS last_weight
    FROM machines m
    LEFT JOIN trainings t 
      ON t.machine_id = m.id
      AND t.user_id = ?
      AND t.date = (
          SELECT MAX(t2.date) 
          FROM trainings t2 
          WHERE t2.machine_id = m.id 
          AND t2.user_id = ?
      )
    WHERE m.is_active = 1;
  `;

  const machinesRaw = await db.all(query, userId, userId);

  const machines: MachineDTO[] = machinesRaw.map((machine: any) => ({
    id: machine.id,
    name: machine.name,
    lastTraining: machine.last_training,
    lastWeight: machine.last_weight,
  }));

  res.json(machines);
});

router.get("/:id", async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Machine ID is required." });
    return;
  }
  console.log(`[Info] Detail for machine ${req.params.id} requested.`);

  const db = await getDB();
  const machineRaw = await db.get("SELECT * FROM machines WHERE id = (?)", [req.params.id]);

  if(!machineRaw)
  {
    res.status(404).json({ message: "Machine not found." });
    return;
  }
  
  const trainingsRaw = await db.all("SELECT * FROM trainings WHERE user_id = (?) AND machine_id = (?) ORDER BY date", [
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

  const latestTraining = [...trainings].reverse()[0];
  const machine: MachineDTO = {
    id: machineRaw.id,
    name: machineRaw.name,
    lastTraining: latestTraining?.date,
    lastWeight: latestTraining?.weight1,
  };

  res.json({ machine: machine, trainings: trainings });
});

export default router;
