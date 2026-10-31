// pages/uebersicht.js – entscheidet, was geladen wird
import { ladeDaten } from '../api.js';
import { fuelleDropdown } from '../darstellung.js';

const faecher = await ladeDaten('/api/faecher');
fuelleDropdown(document.querySelector('#filter-subject'), faecher, 'fach');

const absenzen = await ladeDaten('/api/absenzen');
fuelleDropdown(document.querySelector('#absence-list'), absenzen, 'fach');