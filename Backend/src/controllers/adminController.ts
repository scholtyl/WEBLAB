import { Request, Response, Router } from "express";
import getDB from "../DB/db";
import multer from "multer";
import { MachineDTO } from "../DTOs/machineDTO";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/machines");
  },
  filename: async (req, file, cb) => {
    const db = await getDB();
    const query = `SELECT MAX(id) AS max_id FROM machines`;
    const res = await db.get(query);

    cb(null, `Machine${Number(res.max_id) + 1}.jpg`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json("No file uploaded.");
  }
  res.status(200).json("All good");
});

router.get("/machines", async (req: Request, res: Response) => {
  console.log("[Info] Admin all machines requested.");

  const db = await getDB();
  const query = "SELECT * FROM machines;";

  const machinesRaw = await db.all(query);

  const machines: MachineDTO[] = machinesRaw.map((machine: any) => ({
    id: machine.id,
    name: machine.name,
    isActive: machine.is_active,
  }));

  res.status(200).json(machines);
});

router.put("/switch", async (req: Request, res: Response) => {
  console.log(`[Info] Switching activation status of machine .`);

  const is_activated = req.body.toActivated;
  const machineId = req.body.machineId;
console.log(req.body);

  const db = await getDB();
  const query = `UPDATE machines SET is_active = (?) WHERE id = (?);`;
  await db.run(query, [is_activated, machineId]);

  res.status(200).json({ Message: `Switched machine ${machineId} to ${is_activated}` });
});

export default router;
