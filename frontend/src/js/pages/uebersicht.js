// pages/uebersicht.js – Seite "Übersicht"
import { ladeDaten } from '../api.js';
import { fuelleDropdown, zeigeAbsenzenListe } from '../darstellung.js';

const ladeMeldung = document.querySelector('#status-message');
const fehlerMeldung = document.querySelector('#error-message');

// Erfolgsmeldung zeigen, wenn wir von "Absenz erfassen" kommen
const parameter = new URLSearchParams(window.location.search);
if (parameter.get('gespeichert') === '1') {
  document.querySelector('#saved-message').hidden = false;
}

// Daten laden und anzeigen – bei einem Fehler eine Meldung statt Absturz
try {
  const faecher = await ladeDaten('/api/faecher');
  fuelleDropdown(document.querySelector('#filter-subject'), faecher, 'fach');

  const absenzen = await ladeDaten('/api/absenzen');
  zeigeAbsenzenListe(absenzen);
} catch (fehler) {
  console.warn(fehler);
  fehlerMeldung.hidden = false;
} finally {
  ladeMeldung.hidden = true;
}