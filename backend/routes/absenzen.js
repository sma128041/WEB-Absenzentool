import { Router } from "express";
import db from "../db.js";

const router = Router();

// GET /api/absenzen – alle absenzen
router.get('/', (req, res) => {
  const absenzen = db.prepare('SELECT absenzen.*, benutzer.vorname, benutzer.nachname FROM absenzen join benutzer on absenzen.student_id = benutzer.id').all();
  res.json(absenzen);
});

export default router;