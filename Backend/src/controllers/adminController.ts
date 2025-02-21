import { Request, Response, Router } from "express";
import getDB from "../DB/db";
import multer from "multer";
import { MachineDTO } from "../DTOs/machineDTO";
import bcrypt from "bcrypt";

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

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only JPG and PNG are allowed."), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded." });
    return;
  }

  const machineName = req.body.name;
  if (!machineName) {
    res.status(400).json({ error: "Machine name is required." });
    return;
  }

  const db = await getDB();
  const resId = await db.get(`SELECT MAX(id) AS max_id FROM machines`);
  const newId: number = resId?.max_id ? Number(resId.max_id) + 1 : 1;

  await db.run(`INSERT INTO machines (id, name, is_active) VALUES (?, ?, ?)`, [newId, machineName, 1]);

  console.log(`[ADMIN] Machine '${machineName}' added with ID: ${newId}.`);
  res.status(200).json(`[INFO] Machine '${machineName}' added with ID: ${newId}.`);
});

router.get("/machines", async (req: Request, res: Response) => {
  console.log("[ADMIN] Admin all machines requested.");

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
  const { toActivated , machineId } = req.body;

  if (toActivated == undefined || machineId == undefined) {
    res.status(400).json({ message: "machineId and toActivated is required." });
    return;
  }
  console.log(`[ADMIN] Switching activation status of machine rquested.`);

  const db = await getDB();
  const query = `UPDATE machines SET is_active = (?) WHERE id = (?);`;
  await db.run(query, [toActivated, machineId]);

  res.status(200).json({ Message: `Switched machine ${machineId} to ${toActivated}` });
});

router.put("/setPin", async (req: Request, res: Response) => {
  const userId = req.body.userId;

  if (!req.body.pin || !userId) {
    res.status(400).json({ error: "PIN and user must be set!" });
    return;
  }

  if (req.body.pin.length != 4 || isNaN(Number(req.body.pin))) {
    res.status(400).json({ error: "PIN must be 4 digits!" });
    return;
  }

  const pin = await bcrypt.hash(req.body.pin, 10);
  console.log(`[ADMIN] Updating user ${userId}'s Pin.`);

  const db = await getDB();
  const query = `UPDATE users SET password = (?) WHERE id = (?);`;
  await db.run(query, [pin, userId]);

  res.status(200).json({ Message: `Updated user ${userId}'s Pin` });
});

export default router;
