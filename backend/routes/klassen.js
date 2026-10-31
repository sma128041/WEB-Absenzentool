import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/klassen – alle Klassen alphabetisch
router.get('/', (req, res) => {
  const klassen = db.prepare('SELECT * FROM klassen ORDER BY klasse').all();
  res.json(klassen);
});

export default router;