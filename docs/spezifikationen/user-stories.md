# User Stories – Absenzen-Tool

Grundlage: Use-Case-, Aktivitäts-, Zustands- und Sequenzdiagramm in `UML_Diagramme.pdf`.

## Rollen

| Rolle | Beschreibung |
|---|---|
| Studierende | Gehören zu genau einer Klasse. Melden Absenzen im Voraus und entschuldigen Absenzen. |
| Dozierende | Unterrichten ein oder mehrere Fächer in Klassen. Erfassen Absenzen und beurteilen Meldungen und Entschuldigungen. |
| Schulleitung | Hat den Überblick über alle Absenzen und wertet sie aus. |

## Status einer Absenz

`Gemeldet` · `Unentschuldigt` · `Eingereicht` · `Entschuldigt` · `Abgelehnt` (siehe Zustandsdiagramm)

## Priorisierung

- **Must:** Ohne diese Story funktioniert der Kern nicht.
- **Should:** Wichtig, der Kern funktioniert aber auch ohne.
- **Could:** Nützliches Extra.

---

## Must

### M1 – In der eigenen Rolle arbeiten

**Als** Benutzer/in **möchte ich** in meiner Rolle arbeiten, **damit** ich nur sehe und tun kann, was mir zusteht.

Akzeptanzkriterien:
1. In der Kopfzeile kann die Rolle Studierende, Dozierende oder Schulleitung gewählt werden.
2. Nach einem Rollenwechsel zeigt die Anwendung nur die Aktionen, die diese Rolle ausführen darf (z. B. sehen Studierende keine Schaltfläche «Akzeptieren»).
3. Ruft eine Rolle eine Aktion auf, die ihr nicht zusteht, lehnt das Backend sie mit einer Fehlermeldung ab.

### M2 – Absenz im Voraus melden

**Als** Studierende **möchte ich** eine geplante Absenz im Voraus melden, **damit** sie entschuldigt werden kann.

Akzeptanzkriterien:
1. Nach dem Senden hat die Absenz den Status «Gemeldet» und erscheint in der Übersicht.
2. Ein Datum in der Vergangenheit wird mit einer Meldung beim Feld abgelehnt.
3. Eine Anzahl Lektionen ausserhalb von 1 bis 10 wird mit einer Meldung beim Feld abgelehnt.
4. Nur Unterricht der eigenen Klasse kann ausgewählt werden.

### M3 – Absenz erfassen

**Als** Dozierende **möchte ich** eine Absenz im Unterricht erfassen, **damit** fehlende Studierende festgehalten sind.

Akzeptanzkriterien:
1. Nach dem Speichern hat die Absenz den Status «Unentschuldigt», und die Übersicht zeigt eine Bestätigung.
2. Wird eine Person gewählt, die nicht in der Klasse des Unterrichts ist, erscheint eine Fehlermeldung und nichts wird gespeichert.
3. Dieselbe Person kann für denselben Unterricht und dasselbe Datum nicht zweimal erfasst werden, auch nicht durch schnelles Doppelklicken.
4. Eine Anzahl Lektionen ausserhalb von 1 bis 10 wird mit einer Meldung beim Feld abgelehnt.

### M4 – Absenz entschuldigen

**Als** Studierende **möchte ich** eine unentschuldigte Absenz mit einer Begründung entschuldigen, **damit** sie geprüft werden kann.

Akzeptanzkriterien:
1. Nach dem Senden hat die Absenz den Status «Eingereicht».
2. Eine Begründung mit weniger als 10 Zeichen wird mit einer Meldung beim Feld abgelehnt.
3. Entschuldigen ist nur bei Absenzen mit dem Status «Unentschuldigt» möglich; bei allen anderen Status ist die Aktion nicht verfügbar.

### M5 – Entschuldigung beurteilen

**Als** Dozierende **möchte ich** eine eingereichte Entschuldigung akzeptieren oder ablehnen, **damit** der Status der Absenz geklärt ist.

Akzeptanzkriterien:
1. Akzeptieren setzt den Status auf «Entschuldigt», Ablehnen auf «Abgelehnt».
2. Beurteilen ist nur bei Absenzen mit dem Status «Eingereicht» möglich.
3. Eine abgelehnte Absenz kann nicht nachträglich auf «Entschuldigt» gesetzt werden; die Anwendung verhindert das in der Oberfläche und im Backend.

### M6 – Gemeldete Absenz bestätigen

**Als** Dozierende **möchte ich** eine im Voraus gemeldete Absenz bestätigen, **damit** sie als entschuldigt gilt.

Akzeptanzkriterien:
1. Bestätigen setzt den Status von «Gemeldet» auf «Entschuldigt».
2. Nur Dozierende des betroffenen Unterrichts können die Absenz bestätigen.

### M7 – Eigene Absenzen ansehen

**Als** Studierende **möchte ich** meine eigenen Absenzen mit Status sehen, **damit** ich weiss, was noch offen ist.

Akzeptanzkriterien:
1. Die Übersicht zeigt nur die Absenzen der angemeldeten Person, mit Datum, Fach, Lektionen und Status.
2. Gibt es keine Absenzen, erscheint der Hinweis «Noch keine Absenzen erfasst» statt einer leeren Tabelle.

### M8 – Absenzen des eigenen Unterrichts ansehen

**Als** Dozierende **möchte ich** alle Absenzen meines Unterrichts sehen, **damit** ich offene Meldungen und Entschuldigungen erkenne.

Akzeptanzkriterien:
1. Die Übersicht zeigt nur Absenzen aus dem eigenen Unterricht, die neuesten zuerst.
2. Erfasste Absenzen und Statusänderungen sind nach dem Neuladen der Seite noch vorhanden.
3. Kann das Backend nicht erreicht werden, erscheint eine verständliche Fehlermeldung.

### M9 – Verlauf einer Absenz ansehen

**Als** Studierende oder Dozierende **möchte ich** in der Detailansicht den Verlauf einer Absenz sehen, **damit** nachvollziehbar ist, wer wann was geändert hat.

Akzeptanzkriterien:
1. Jede Statusänderung erscheint im Verlauf mit Zeitpunkt, neuem Status und Rolle.
2. Der Verlauf beginnt mit dem Eintrag beim Erfassen bzw. Melden und ist zeitlich sortiert.

---

## Should

### S1 – Absenzen filtern und sortieren

**Als** Dozierende **möchte ich** die Übersicht nach Fach und Status filtern und sortieren, **damit** ich schnell finde, was ich suche.

Akzeptanzkriterien:
1. Die Filter Fach, Status und Name lassen sich kombinieren.
2. Die Liste lässt sich nach Datum, Name oder Anzahl Lektionen sortieren.

### S2 – Absenzen auswerten

**Als** Schulleitung **möchte ich** Kennzahlen zu den Absenzen sehen, **damit** ich den Überblick behalte.

Akzeptanzkriterien:
1. Angezeigt werden die Anzahl offener Entschuldigungen, die Anzahl unentschuldigter Absenzen und das Total der Lektionen.
2. Die Kennzahlen passen sich an, wenn ein Filter gesetzt wird.

### S3 – Alle Absenzen ansehen

**Als** Schulleitung **möchte ich** die Absenzen aller Klassen sehen, **damit** ich Auffälligkeiten erkenne.

Akzeptanzkriterien:
1. Die Übersicht der Schulleitung zeigt Absenzen aller Klassen und Fächer.
2. Die Schulleitung kann keine Absenzen erfassen, entschuldigen oder beurteilen.

### S4 – Absenz bearbeiten

**Als** Dozierende **möchte ich** eine falsch erfasste Absenz korrigieren, **damit** die Daten stimmen.

Akzeptanzkriterien:
1. Datum, Lektionen und Grund lassen sich ändern, solange die Absenz den Status «Unentschuldigt» hat.
2. Für die geänderten Werte gelten dieselben Prüfungen wie beim Erfassen.

### S5 – Absenz löschen

**Als** Dozierende **möchte ich** eine irrtümlich erfasste Absenz löschen, **damit** sie nicht in der Auswertung zählt.

Akzeptanzkriterien:
1. Vor dem Löschen erscheint eine Rückfrage.
2. Nach dem Löschen verschwindet die Absenz samt Verlauf aus der Übersicht.

---

## Could

### C1 – Mit E-Mail und Passwort anmelden

**Als** Benutzer/in **möchte ich** mich mit E-Mail und Passwort anmelden, **damit** niemand anderes in meiner Rolle arbeiten kann.

### C2 – Warnung bei Absenzengrenze

**Als** Dozierende oder Schulleitung **möchte ich** gewarnt werden, wenn eine Person in einem Fach die Absenzengrenze erreicht, **damit** ich rechtzeitig reagieren kann.

### C3 – Absenzen exportieren

**Als** Schulleitung **möchte ich** die gefilterte Liste als CSV exportieren, **damit** ich sie weiterverarbeiten kann.

---

## Zuordnung zu den Diagrammen

| Story | Use Case | Aktivität | Zustand |
|---|---|---|---|
| M1 | Anmelden | – | – |
| M2 | Absenz im Voraus melden | 2b | Start → Gemeldet |
| M3 | Absenz erfassen | 2a | Start → Unentschuldigt |
| M4 | Absenz entschuldigen | 2c | Unentschuldigt → Eingereicht |
| M5 | Entschuldigung beurteilen | 2c | Eingereicht → Entschuldigt / Abgelehnt |
| M6 | Entschuldigung beurteilen | 2b | Gemeldet → Entschuldigt |
| M7 | Eigene Absenzen ansehen | – | – |
| M8 | Absenzen ansehen | – | – |
| M9 | Absenzen ansehen | 2a, 2b, 2c (Verlauf) | alle Übergänge |
| S1–S5 | Absenzen ansehen / auswerten | – | – |
