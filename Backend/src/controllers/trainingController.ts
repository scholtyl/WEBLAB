import { Request, Response } from "express";
import { Router } from "express";
import getDB from "../DB/db";

const router = Router();

router.delete("/:id", async (req: Request, res: Response) => {
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

export default router;
