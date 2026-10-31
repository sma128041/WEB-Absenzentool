import { ladeDaten } from '../api.js';
import { fuelleDropdown } from '../darstellung.js';

// Erfolgsmeldung zeigen, wenn wir von "Absenz erfassen" kommen
const parameter = new URLSearchParams(window.location.search);
if (parameter.get('gespeichert') === '1') {
  document.querySelector('#saved-message').hidden = false;
}

const faecher = await ladeDaten('/api/faecher');
fuelleDropdown(document.querySelector('#filter-subject'), faecher, 'fach');

const absenzen = await ladeDaten('/api/absenzen');
fuelleDropdown(document.querySelector('#absence-list'), absenzen, 'fach');