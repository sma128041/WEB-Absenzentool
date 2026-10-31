import Database from 'better-sqlite3';
import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

// Lege Pfad zum data Ordner fest und erstelle ihn, falls er nicht existiert
const dataOrdner = resolve(import.meta.dirname, 'data');
mkdirSync(dataOrdner, { recursive: true });

// Erstelle die Datenbankverbindung und erstelle die Datenbankdatei, falls sie nicht existiert
const db = new Database(resolve(dataOrdner, 'absenzen.db'));

// Fremdschlüssel prüfen (bei SQLite standardmässig aus)
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS faecher (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    fach TEXT    NOT NULL UNIQUE
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS klassen (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    klasse TEXT    NOT NULL UNIQUE
  )
`);

// Alle Personen in einer Tabelle, unterschieden durch die Rolle.
// klasse_id ist nur bei Studierenden gesetzt, sonst NULL.
db.exec(`
  CREATE TABLE IF NOT EXISTS benutzer (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    vorname       TEXT    NOT NULL,
    nachname      TEXT    NOT NULL,
    email         TEXT    NOT NULL UNIQUE,
    passwort_hash TEXT,
    rolle         TEXT    NOT NULL CHECK (rolle IN ('studierende', 'dozierende', 'schulleitung')),
    klasse_id     INTEGER,
    FOREIGN KEY (klasse_id) REFERENCES klassen(id),
    CHECK ((rolle = 'studierende') = (klasse_id IS NOT NULL))
  )
`);

// Wer unterrichtet welches Fach in welcher Klasse
db.exec(`
  CREATE TABLE IF NOT EXISTS unterricht (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    fach_id       INTEGER NOT NULL,
    dozierende_id INTEGER NOT NULL,
    klasse_id     INTEGER NOT NULL,
    UNIQUE (fach_id, klasse_id),
    FOREIGN KEY (fach_id)       REFERENCES faecher(id),
    FOREIGN KEY (dozierende_id) REFERENCES benutzer(id),
    FOREIGN KEY (klasse_id)     REFERENCES klassen(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS absenzen (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id     INTEGER NOT NULL,
    unterricht_id  INTEGER NOT NULL,
    datum          TEXT    NOT NULL,
    lektionen      INTEGER NOT NULL CHECK (lektionen > 0),
    status         TEXT    NOT NULL DEFAULT 'unentschuldigt' CHECK (status IN ('gemeldet', 'unentschuldigt', 'eingereicht', 'entschuldigt', 'abgelehnt')),
    grund          TEXT,
    entschuldigung TEXT,
    erstellt_am    TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, unterricht_id, datum),
    FOREIGN KEY (student_id)    REFERENCES benutzer(id),
    FOREIGN KEY (unterricht_id) REFERENCES unterricht(id)
  )
`);

// Jede Statusänderung einer Absenz mit Zeitpunkt und Rolle (U2.4)
db.exec(`
  CREATE TABLE IF NOT EXISTS verlauf (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    absenz_id INTEGER NOT NULL,
    status    TEXT    NOT NULL,
    rolle     TEXT    NOT NULL,
    zeitpunkt TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (absenz_id) REFERENCES absenzen(id) ON DELETE CASCADE
  )
`);

// Testdaten Fächer
const anzahl = db.prepare('SELECT COUNT(*) AS count FROM faecher').get().count;
if (anzahl === 0) {
  db.exec(`
    INSERT INTO faecher (fach) VALUES
      ('CYS'),
      ('DTR'),
      ('WEB'),
      ('LDS')
  `);
}

//Testdaten Klassen
const anzahlKlassen = db.prepare('SELECT COUNT(*) AS count FROM klassen').get().count;
if (anzahlKlassen === 0) {
  db.exec(`
    INSERT INTO klassen (klasse) VALUES
      ('25A'),
      ('25B'),
      ('25C')
      `)
};

// Testdaten Studierenden Benutzer
const anzahlStudierende = db.prepare(`SELECT COUNT(*) AS count FROM benutzer where rolle = 'studierende'`).get().count;
if (anzahlStudierende === 0) {
  db.exec(`
    INSERT INTO benutzer (vorname, nachname, email, passwort_hash, rolle, klasse_id) VALUES
      ('Sabri', 'Mahdi', 'sabri.mahdi@example.com', 'sml12345', 'studierende', 1)
  `);
}

// Testdaten Dozierende Benutzer
const anzahlDozierende = db.prepare(`SELECT COUNT(*) AS count FROM benutzer where rolle = 'dozierende'`).get().count;
if (anzahlDozierende === 0) {
  db.exec(`
    INSERT INTO benutzer (vorname, nachname, email, passwort_hash, rolle) VALUES
      ('Nicolas', 'Dumermuth', 'nicolas.dumermuth@example.com', 'sml12345', 'dozierende')
  `);
}

// Testdaten Unterricht
const anzahlUnterricht = db.prepare('SELECT COUNT(*) AS count FROM unterricht').get().count;
if (anzahlUnterricht === 0) {
  db.exec(`
    INSERT INTO unterricht (fach_id, dozierende_id, klasse_id) VALUES
      (1, 2, 1),
      (2, 2, 1),
      (3, 2, 1)
  `);
}
export default db;