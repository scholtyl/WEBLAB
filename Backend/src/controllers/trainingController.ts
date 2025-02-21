import { Request, Response } from "express";
import { Router } from "express";
import getDB from "../DB/db";
import { v4 as uuidv4 } from "uuid";
import { TrainingDTO } from "../DTOs/trainingDTO";

const router = Router();

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Training ID is required." });
    return;
  }
  console.log(`[Info] Deletion of training ${req.params.id} requested.`);

  const db = await getDB();
  const trainingRaw = await db.get("SELECT * FROM trainings WHERE id = (?)", req.params.id);

  if (trainingRaw) {
    //Check if user is owner of training
    if (trainingRaw.user_id == res.locals.user.id) {
      db.run("DELETE FROM trainings WHERE id = (?)", req.params.id);
      res.status(200).json("Success");
    } else {
      res.status(403).json({ message: "Training belongs to other user" });
    }
  } else {
    res.status(404).json(`No training found with id ${req.params.id}`);
  }
});

router.put("", async (req: Request, res: Response) => {
  const training = req.body as TrainingDTO;
  if (
    !training.id ||
    !training.machine_id ||
    !training.date ||
    !training.reps1 == undefined ||
    !training.weight1 == undefined ||
    !training.reps2 == undefined ||
    !training.weight2 == undefined ||
    !training.reps3 == undefined ||
    !training.weight3 == undefined
  ) {
    res.status(400).json({ message: "Not all required fields present." });
    return;
  }
  console.log(`[Info] Updating training ${training.id} rquested`);

  const db = await getDB();
  const trainingRaw = await db.get("SELECT * FROM trainings WHERE id = ?", training.id);

  if (!trainingRaw) {
    res.status(404).json({ message: `No training found with id ${training.id}` });
  }

  // Check if user is the owner of the training
  if (trainingRaw.user_id !== res.locals.user.id) {
    res.status(403).json({ message: "You are not authorized to update this training." });
  }

  const query = `
    UPDATE trainings
    SET machine_id = ?, date = ?, reps1 = ?, weight1 = ?, reps2 = ?, weight2 = ?, reps3 = ?, weight3 = ?
    WHERE id = ?;
  `;

  await db.run(query, [
    training.machine_id,
    training.date,
    training.reps1,
    training.weight1,
    training.reps2,
    training.weight2,
    training.reps3,
    training.weight3,
    training.id,
  ]);

  console.log(`[Success] Training ${training.id} updated.`);
  res.status(200).json({ message: "Training updated successfully." });
});

router.post("", async (req: Request, res: Response) => {
  const training = req.body as TrainingDTO;
  if (
    !training.machine_id ||
    !training.reps1 == undefined ||
    !training.weight1 == undefined ||
    !training.reps2 == undefined ||
    !training.weight2 == undefined ||
    !training.reps3 == undefined ||
    !training.weight3 == undefined
  ) {
    res.status(400).json({ message: "Not all required fields present." });
    return;
  }
  console.log(`[Info] New training registered.`);

  const userId = res.locals.user.id;

  const date = new Date().toISOString();
  const trainingId = uuidv4();

  const query = `
            INSERT INTO trainings (
                id, user_id, machine_id, date, reps1, weight1, reps2, weight2, reps3, weight3 ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

  let db = await getDB();
  await db.run(query, [
    trainingId,
    userId,
    training.machine_id,
    date,
    training.reps1,
    training.weight1,
    training.reps2,
    training.weight2,
    training.reps3,
    training.weight3,
  ]);
  const trainingsRaw = await db.all("SELECT * FROM trainings WHERE user_id = (?) AND machine_id = (?)", [
    res.locals.user.id,
    training.machine_id,
  ]);
  const trainings: TrainingDTO[] = trainingsRaw.map((training: any) => ({
    id: training.id,
    date: training.date,
    machine_id: training.machine_id,
    reps1: training.reps1,
    reps2: training.reps2,
    reps3: training.reps3,
    weight1: training.weight1,
    weight2: training.weight2,
    weight3: training.weight3,
  }));

  res.status(201).json(trainings);
});

export default router;
