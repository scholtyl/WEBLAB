import express, { Request, Response, Router } from "express";
import getDB from "../DB/db";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/machines");
  },
  filename: async (req, file, cb) => {
    const db = await getDB();
    const query = `SELECT MAX(id) AS max_id FROM machines`;
    const res = await db.get(query);

    console.log(res.max_id)
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

router.use(express.static("public"));

export default router;