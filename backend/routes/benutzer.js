import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/benutzer – alle Benutzer
router.get('/', (req, res) => {
  const benutzer = db.prepare('SELECT * FROM benutzer').all();
  res.json(benutzer);
});

export default router;