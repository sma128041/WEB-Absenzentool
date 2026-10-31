import { Router } from 'express';
import db from '../db.js';

const router = Router();
const ERLAUBTE_ROLLEN = ['studierende', 'dozierende', 'schulleitung'];

// GET /api/benutzer            → alle Benutzer
// GET /api/benutzer?rolle=...  → nur Benutzer dieser Rolle
router.get('/', (req, res) => {
  const { rolle } = req.query;

  // Ohne Rolle: alle Benutzer
  if (rolle === undefined) {
    const benutzer = db
      .prepare(`
        SELECT id, vorname, nachname, vorname || ' ' || nachname AS fullname, rolle
        FROM benutzer
        ORDER BY nachname, vorname
      `)
      .all();
    return res.json(benutzer);
  }

  // Mit Rolle: zuerst prüfen, dann filtern
  if (!ERLAUBTE_ROLLEN.includes(rolle)) {
    return res.status(400).json({ fehler: 'Bitte eine gültige Rolle angeben.' });
  }

  const benutzer = db
    .prepare(`
      SELECT id, vorname, nachname, vorname || ' ' || nachname AS fullname, rolle
      FROM benutzer
      WHERE rolle = ?
      ORDER BY nachname, vorname
    `)
    .all(rolle);

  res.json(benutzer);
});

export default router;