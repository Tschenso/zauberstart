## 2026-07-28 - Druckansicht

- Scope: `app/page.tsx`, `app/globals.css`
- Finding: Im Druck müssen alle Zugschritte und Kartenbegriffe unabhängig vom interaktiven Zustand vollständig erscheinen.
- Severity: P2
- Evidence: Nutzerauftrag zur druckbaren Ansicht
- Next action: Drucklayout aus den vollständigen Regelarrays erzeugen und im Build prüfen.

## 2026-07-28 - Responsive Invarianten

- Scope: Handy 390 × 844 und Tablet 820 × 1180
- Finding: Kein horizontaler Überlauf; Zugwechsel reagiert korrekt. Sekundäre Touchflächen waren teilweise kleiner als 44 px.
- Severity: P2
- Evidence: Browserprüfung der lokalen Seite
- Next action: Touchflächen auf mindestens 44 px erhöhen und beide Breiten erneut prüfen.
