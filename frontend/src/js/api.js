// lade daten

export async function ladeDaten(url) {
  const antwort = await fetch(url);
  return antwort.json();
}