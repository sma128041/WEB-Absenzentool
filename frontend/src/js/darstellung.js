/**
 * Füllt ein Dropdown mit Optionen aus einer Liste.
 * @param {HTMLSelectElement} dropdown - das <select>-Element
 * @param {Array} eintraege - die Daten vom Backend
 * @param {string} textFeld - welches Feld als Text angezeigt wird
 */
export function fuelleDropdown(dropdown, eintraege, textFeld) {
  for (const eintrag of eintraege) {
    const option = document.createElement('option');
    option.value = eintrag.id;
    option.textContent = eintrag[textFeld];
    dropdown.append(option);
  }
}

// Anzeigetexte zu den Statuswerten aus der Datenbank
const STATUS_TEXT = {
  gemeldet: 'Gemeldet',
  unentschuldigt: 'Unentschuldigt',
  eingereicht: 'Entschuldigung eingereicht',
  entschuldigt: 'Entschuldigt',
  abgelehnt: 'Abgelehnt',
};

/**
 * Wandelt ein Datum von "2026-10-28" in "28.10.2026" um.
 * @param {string} isoDatum - Datum im Format JJJJ-MM-TT
 * @returns {string} Datum im Format TT.MM.JJJJ
 */
export function formatiereDatum(isoDatum) {
  const [jahr, monat, tag] = isoDatum.split('-');
  return `${tag}.${monat}.${jahr}`;
}

/**
 * Setzt den Text eines Feldes mit data-field="..." in einem Element.
 * @param {DocumentFragment|HTMLElement} element - wo gesucht wird
 * @param {string} feld - Name im data-field-Attribut
 * @param {string|number} wert - anzuzeigender Text
 */
function setzeFeld(element, feld, wert) {
  element.querySelector(`[data-field="${feld}"]`).textContent = wert;
}

/**
 * Erstellt eine Tabellenzeile für eine Absenz aus der Vorlage im HTML.
 * @param {Object} absenz - eine Absenz vom Backend
 * @returns {DocumentFragment} die fertige Zeile
 */
function erstelleAbsenzZeile(absenz) {
  const vorlage = document.querySelector('#absence-row-template');
  const zeile = vorlage.content.cloneNode(true);

  setzeFeld(zeile, 'date', formatiereDatum(absenz.datum));
  setzeFeld(zeile, 'student', `${absenz.vorname} ${absenz.nachname}`);
  setzeFeld(zeile, 'subject', absenz.fach);
  setzeFeld(zeile, 'lessons', absenz.lektionen);

  const badge = zeile.querySelector('[data-field="status"]');
  badge.textContent = STATUS_TEXT[absenz.status];
  badge.classList.add(`badge--${absenz.status}`);

  zeile.querySelector('[data-field="link"]').href = `/detail.html?id=${absenz.id}`;

  return zeile;
}

/**
 * Zeigt die Absenzen in der Tabelle an, oder den Leerzustand, wenn es keine gibt.
 * @param {Array} absenzen - Liste der Absenzen vom Backend
 */
export function zeigeAbsenzenListe(absenzen) {
  const tabelle = document.querySelector('#absence-list');
  const leerzustand = document.querySelector('#empty-state');

  tabelle.replaceChildren();
  leerzustand.hidden = absenzen.length > 0;

  for (const absenz of absenzen) {
    tabelle.append(erstelleAbsenzZeile(absenz));
  }
}