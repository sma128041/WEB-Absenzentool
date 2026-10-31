// pages/erfassen.js – Seite "Absenz erfassen"
import { ladeDaten, sendeDaten } from '../api.js';
import { fuelleDropdown } from '../darstellung.js';

const formular = document.querySelector('#absence-form');
const knopf = formular.querySelector('button[type="submit"]');
const erfolgMeldung = document.querySelector('#form-success');
const fehlerMeldung = document.querySelector('#form-error');

// Dropdowns beim Laden der Seite füllen
const unterricht = await ladeDaten('/api/unterricht');
fuelleDropdown(document.querySelector('#unterricht'), unterricht, 'name');

const studierende = await ladeDaten('/api/benutzer?rolle=studierende');
fuelleDropdown(document.querySelector('#student'), studierende, 'fullname');

/**
 * Liest die Werte aus dem Formular und wandelt Zahlen um.
 * @returns {Object} Daten im Format, das POST /api/absenzen erwartet
 */
function leseFormular() {
  const felder = new FormData(formular);
  return {
    studentId: Number(felder.get('studentId')),
    unterrichtId: Number(felder.get('unterrichtId')),
    datum: felder.get('date'),
    lektionen: Number(felder.get('lessons')),
    status: felder.get('type'),
    grund: felder.get('reason').trim() || null,
  };
}

// Beim Absenden: Daten ans Backend schicken und Rückmeldung anzeigen
formular.addEventListener('submit', async (event) => {
  event.preventDefault();      // verhindert das Neuladen der Seite
  knopf.disabled = true;       // verhindert doppeltes Absenden
  erfolgMeldung.hidden = true;
  fehlerMeldung.hidden = true;

  try {
    const { ok, daten } = await sendeDaten('/api/absenzen', leseFormular());
    if (ok) {
      erfolgMeldung.hidden = false;
      formular.reset();
    } else {
      fehlerMeldung.textContent = daten.fehler;
      fehlerMeldung.hidden = false;
    }
  } catch {
    fehlerMeldung.textContent = 'Keine Verbindung zum Server. Bitte später erneut versuchen.';
    fehlerMeldung.hidden = false;
  } finally {
    knopf.disabled = false;
  }
});