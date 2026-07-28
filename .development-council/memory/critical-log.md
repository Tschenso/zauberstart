# Critical Log

## 2026-07-28 - Kleine Touchflächen

- Scope: Mobile Bedienung
- Finding: Einige sekundäre Bedienelemente unterschritten 44 px Höhe.
- Severity: P2
- Evidence: Browserprüfung bei 390 × 844
- Next action: Erledigt und bei 390 × 844 sowie 820 × 1180 mit mindestens 44 px erneut geprüft.

## 2026-07-28 - Überlauf auf sehr kleinen Handys

- Scope: `app/globals.css`, Viewport 320 × 568
- Finding: Die intrinsische Breite der Überschrift „Kartenwörter“ vergrößerte den einspaltigen Grid-Track und erzeugte horizontalen Seitenüberlauf.
- Severity: P2
- Evidence: Öffentliche Pages-Version vor der Korrektur mit 374 px Scrollbreite bei 320 px Viewport.
- Next action: Erledigt; Grid-Kind darf schrumpfen und mobile Abschnittsüberschriften skalieren responsiv. Danach kein Überlauf bei 320, 360, 390, 820 und 1180 px.
