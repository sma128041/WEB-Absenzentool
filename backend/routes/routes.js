import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/faecher – alle Fächer alphabetisch
router.get('/', (req, res) => {
  const faecher = db.prepare('SELECT * FROM faecher ORDER BY fach').all();
  res.json(faecher);
});

export default router;