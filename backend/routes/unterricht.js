import { Router } from 'express';
import db from '../db.js';

const router = Router();

// GET /api/unterricht – alle Unterrichte mit lesbarem Namen, z. B. "WEB – 24a"
router.get('/', (req, res) => {
  const unterricht = db.prepare(`
    SELECT unterricht.id, faecher.fach || ' – ' || klassen.klasse AS name
    FROM unterricht
    JOIN faecher ON unterricht.fach_id   = faecher.id
    JOIN klassen ON unterricht.klasse_id = klassen.id
    ORDER BY faecher.fach, klassen.klasse
  `).all();
  res.json(unterricht);
});

export default router;