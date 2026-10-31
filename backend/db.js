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

export default db;