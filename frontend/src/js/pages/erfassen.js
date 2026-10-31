// pages/uebersicht.js – entscheidet, was geladen wird
import { ladeDaten } from '../api.js';
import { fuelleDropdown } from '../darstellung.js';

const faecher = await ladeDaten('/api/faecher');
fuelleDropdown(document.querySelector('#subject'), faecher, 'fach');