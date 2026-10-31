/**
 * Füllt ein Dropdown mit Optionen aus einer Liste.
 * @param {HTMLSelectElement} dropdown - das <select>-Element
 * @param {Array} eintraege - die Daten vom Backend
 * @param {string} textFeld - welches Feld als Text angezeigt wird
 */
function fuelleDropdown(dropdown, eintraege, textFeld) {
  for (const eintrag of eintraege) {
    const option = document.createElement('option');
    option.value = eintrag.id;
    option.textContent = eintrag[textFeld];
    dropdown.append(option);
  }
}