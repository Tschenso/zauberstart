## 2026-07-28 - Interaktiv gegen Druck

- Scope: Seitenzustände
- Finding: Die Bildschirmansicht darf gefiltert oder schrittweise sein; die Druckansicht muss immer ungefiltert und vollständig sein.
- Severity: P2
- Evidence: `ruleSearch`, `turnIndex` in `app/page.tsx`
- Next action: Eigene statische Drucksektion verwenden.
