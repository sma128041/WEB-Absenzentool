import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/unterricht – alle Unterrichtseinheiten
router.get('/', (req, res) => {
  const unterricht = db.prepare('SELECT * FROM unterricht').all();
  res.json(unterricht);
});

export default router;