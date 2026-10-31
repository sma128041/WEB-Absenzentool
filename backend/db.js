import databse from 'better-sqlite3';
import {resolve} from 'node:path';
import { mkdirSync } from 'node:fs';

// Lege Pfad zum data Ordner fest und erstelle ihn, falls er nicht existiert
const dataOrdner = resolve(import.meta.dirname, 'data');
mkdirSync(dataOrdner, { recursive: true });

// Erstelle die Datenbankverbindung und erstelle die Datenbankdatei, falls sie nicht existiert
const db = new databse(resolve(dataOrdner, 'absenzen.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS faecher (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fach TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS klassen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    klasse TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS studenten (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vorname TEXT NOT NULL,
    nachname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    klasse_id INTEGER NOT NULL,
    FOREIGN KEY (klasse_id) REFERENCES klassen(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS dozierende (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vorname TEXT NOT NULL,
    nachname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS unterricht (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fach_id INTEGER NOT NULL,
    dozierende_id INTEGER NOT NULL,
    klasse_id INTEGER NOT NULL,
    datum TEXT NOT NULL,
    FOREIGN KEY (fach_id) REFERENCES faecher(id),
    FOREIGN KEY (dozierende_id) REFERENCES dozierende(id),
    FOREIGN KEY (klasse_id) REFERENCES klassen(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS absenzen (
    student_id INTEGER NOT NULL,
    unterricht_id INTEGER NOT NULL,
    datum TEXT NOT NULL,
    lektionen INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'unentschuldigt' CHECK (status IN ('gemeldet', 'unentschuldigt', 'eingereicht', 'entschuldigt', 'abgelehnt')),
    grund TEXT,
    entschuldigung TEXT,
    erstellt_am TEXT NOT NULL,
    PRIMARY KEY (student_id, unterricht_id, datum),
    FOREIGN KEY (student_id) REFERENCES studenten(id),
    FOREIGN KEY (unterricht_id) REFERENCES unterricht(id)
  )
`);

const anzahl = db.prepare('SELECT COUNT(*) AS count FROM faecher').get().count;
if (anzahl === 0) {
  db.exec(`
    INSERT INTO faecher (fach) VALUES
      ('CYS'),
      ('DTR'),
      ('WEB'),
      ('LDS')
  `)
};



export default db;