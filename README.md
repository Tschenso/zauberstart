# Zauberstart

Interaktive und druckbare Lernhilfe, um Jugendlichen die Grundlagen von
Magic: The Gathering näherzubringen.

## Funktionen

- Lebenspunktezähler für zwei Personen
- geführter Zugablauf in zehn Schritten
- sechs kompakte Grundregeln
- nachschlagbare Kartenbegriffe
- zweitseitige A4-Druckansicht
- responsive Bedienung für Handy und Tablet

## Online

Nach erfolgreicher GitHub-Pages-Veröffentlichung:

<https://tschenso.github.io/zauberstart/>

## Entwicklung

Voraussetzung: Node.js 22 oder neuer und pnpm.

```bash
pnpm install
pnpm dev
```

Prüfungen:

```bash
pnpm build
pnpm test
pnpm build:pages
```

`pnpm build` erzeugt den Sites-/Cloudflare-Build. `pnpm build:pages` erzeugt
den statischen Export für GitHub Pages.

## Veröffentlichung

Ein Push auf `main` startet den Workflow
`.github/workflows/pages.yml` und veröffentlicht den Inhalt aus `out/`.

## Hinweise

Die Lernhilfe vereinfacht komplexe Sonderfälle. Kartentext geht allgemeinen
Regeln vor; für Turnierentscheidungen gelten die aktuellen offiziellen Regeln.
