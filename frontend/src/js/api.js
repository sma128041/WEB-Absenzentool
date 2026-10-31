/**
 * Lädt Daten mit GET vom Backend.
 * @param {string} url - z. B. '/api/faecher'
 * @returns {Promise<any>} die Antwort als JavaScript-Wert
 * @throws {Error} wenn das Backend nicht erreichbar ist oder einen Fehler meldet
 */
export async function ladeDaten(url) {
  const antwort = await fetch(url);
  if (!antwort.ok) {
    throw new Error(`Laden von ${url} fehlgeschlagen (Status ${antwort.status})`);
  }
  return antwort.json();
}

/**
 * Schickt Daten mit POST an das Backend.
 * @param {string} url - z. B. '/api/absenzen'
 * @param {Object} daten - wird als JSON mitgeschickt
 * @returns {Promise<{ok: boolean, daten: any}>} ok ist true bei Erfolg (Status 200–299)
 */
export async function sendeDaten(url, daten) {
  const antwort = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(daten),
  });
  return { ok: antwort.ok, daten: await antwort.json() };
}