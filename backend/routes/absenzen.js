import { Router } from "express";
import db from "../db.js";

const router = Router();

// GET /api/absenzen – alle absenzen
router.get('/', (req, res) => {
  const absenzen = db.prepare('SELECT absenzen.*, benutzer.vorname, benutzer.nachname FROM absenzen join benutzer on absenzen.student_id = benutzer.id').all();
  res.json(absenzen);
});

// Startzustände beim Erfassen und wer sie auslöst (für den Verlauf)
const STARTSTATUS = {
  gemeldet: 'studierende',      // Studierende melden im Voraus
  unentschuldigt: 'dozierende', // Dozierende erfassen im Unterricht
};

/**
 * Prüft die Eingaben für eine neue Absenz.
 * @param {Object} daten - der Body der Anfrage
 * @returns {string|null} Fehlermeldung oder null, wenn alles stimmt
 */
function pruefeAbsenz(daten) {
  const { studentId, unterrichtId, datum, lektionen, status } = daten;

  if (!Number.isInteger(studentId) || !Number.isInteger(unterrichtId)) {
    return 'Bitte eine Person und einen Unterricht auswählen.';
  }
  if (typeof datum !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(datum)) {
    return 'Bitte ein gültiges Datum eingeben.';
  }
  if (!Number.isInteger(lektionen) || lektionen < 1 || lektionen > 10) {
    return 'Die Anzahl Lektionen muss zwischen 1 und 10 liegen.';
  }
  if (!(status in STARTSTATUS)) {
    return 'Eine neue Absenz kann nur gemeldet oder unentschuldigt sein.';
  }
  return null;
}

// POST /api/absenzen – neue Absenz erfassen
router.post('/', (req, res) => {
  // 1. Eingaben prüfen
  const fehler = pruefeAbsenz(req.body);
  if (fehler !== null) {
    return res.status(400).json({ fehler });
  }

  const { studentId, unterrichtId, datum, lektionen, status, grund } = req.body;

  // 2. Prüfen, ob die Person in der Klasse dieses Unterrichts ist
  const passt = db.prepare(`
    SELECT benutzer.id FROM benutzer
    JOIN unterricht ON unterricht.klasse_id = benutzer.klasse_id
    WHERE benutzer.id = ? AND benutzer.rolle = 'studierende' AND unterricht.id = ?
  `).get(studentId, unterrichtId);

  if (passt === undefined) {
    return res.status(400).json({ fehler: 'Diese Person besucht diesen Unterricht nicht.' });
  }

  // 3. Absenz und ersten Verlaufseintrag gemeinsam speichern
  const speichern = db.transaction(() => {
    const result = db.prepare(`
      INSERT INTO absenzen (student_id, unterricht_id, datum, lektionen, status, grund)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(studentId, unterrichtId, datum, lektionen, status, grund ?? null);

    db.prepare('INSERT INTO verlauf (absenz_id, status, rolle) VALUES (?, ?, ?)')
      .run(result.lastInsertRowid, status, STARTSTATUS[status]);

    return result.lastInsertRowid;
  });

  // 4. Ausführen, Fehler abfangen, neue Absenz zurückgeben
  try {
    const neueId = speichern();
    const neueAbsenz = db.prepare('SELECT * FROM absenzen WHERE id = ?').get(neueId);
    res.status(201).json(neueAbsenz);
  } catch (dbFehler) {
    if (dbFehler.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ fehler: 'Für diese Person ist an diesem Tag in diesem Unterricht schon eine Absenz erfasst.' });
    }
    res.status(500).json({ fehler: 'Die Absenz konnte nicht gespeichert werden.' });
  }
});

export default router;