## 2026-07-28 - Interaktiv gegen Druck

- Scope: Seitenzustände
- Finding: Die Bildschirmansicht darf gefiltert oder schrittweise sein; die Druckansicht muss immer ungefiltert und vollständig sein.
- Severity: P2
- Evidence: `ruleSearch`, `turnIndex` in `app/page.tsx`
- Next action: Eigene statische Drucksektion verwenden.

## 2026-07-28 - Zwei Veröffentlichungsziele

- Scope: Sites und GitHub Pages
- Finding: Die Sites-Fassung benötigt den Server-Build ohne Basispfad; GitHub Pages benötigt statischen Export mit `/zauberstart` als Basispfad.
- Severity: P2
- Evidence: `next.config.ts` und `.github/workflows/pages.yml`
- Next action: Buildziel über `GITHUB_ACTIONS` trennen und beide Builds prüfen.
