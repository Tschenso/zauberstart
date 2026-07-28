"use client";

import { useMemo, useState } from "react";

const turnSteps = [
  {
    short: "Enttappen",
    title: "1. Enttappsegment",
    text: "Drehe deine getappten Karten wieder gerade. In diesem Segment wird normalerweise nichts gespielt.",
    cue: "Alles bereit machen",
  },
  {
    short: "Versorgung",
    title: "2. Versorgungssegment",
    text: "Jetzt passieren Effekte mit „zu Beginn deines Versorgungssegments“. Danach können alle reagieren.",
    cue: "Auslöser prüfen",
  },
  {
    short: "Ziehen",
    title: "3. Ziehsegment",
    text: "Ziehe eine Karte. Wer beginnt, überspringt im allerersten Zug einer Partie zu zweit diesen Kartenziehvorgang.",
    cue: "Eine Karte ziehen",
  },
  {
    short: "Haupt 1",
    title: "4. Erste Hauptphase",
    text: "Spiele ein Land (höchstens eines pro Zug) und wirke Kreaturen, Hexereien oder andere Karten.",
    cue: "Aufbauen & planen",
  },
  {
    short: "Kampfstart",
    title: "5. Beginn des Kampfes",
    text: "Letzte Gelegenheit für Effekte, bevor Angreifer bestimmt werden.",
    cue: "Kampf ankündigen",
  },
  {
    short: "Angreifen",
    title: "6. Angreifer deklarieren",
    text: "Wähle gleichzeitig deine Angreifer und wen sie angreifen. Ohne Wachsamkeit werden sie dabei getappt.",
    cue: "Angreifer wählen",
  },
  {
    short: "Blocken",
    title: "7. Blocker deklarieren",
    text: "Die verteidigende Person ordnet ungetappte Kreaturen als Blocker zu. Danach können wieder Effekte gespielt werden.",
    cue: "Blocker wählen",
  },
  {
    short: "Schaden",
    title: "8. Kampfschaden",
    text: "Angreifer und Blocker fügen ihren Schaden gleichzeitig zu. Erstschlag kann ein zusätzliches Schadenssegment erzeugen.",
    cue: "Schaden verrechnen",
  },
  {
    short: "Haupt 2",
    title: "9. Zweite Hauptphase",
    text: "Noch einmal ein Land spielen, falls du heute noch keines gespielt hast, und weitere Karten wirken.",
    cue: "Nach dem Kampf",
  },
  {
    short: "Zugende",
    title: "10. Endsegment & Aufräumen",
    text: "Effekte „zu Beginn des Endsegments“ passieren. Danach bis auf sieben Handkarten abwerfen; Schaden auf Kreaturen verschwindet.",
    cue: "Zug übergeben",
  },
];

const keywordRules = [
  { icon: "↟", term: "Fliegend", tag: "Ausweichen", text: "Kann nur von Kreaturen mit Fliegend oder Reichweite geblockt werden." },
  { icon: "⌁", term: "Reichweite", tag: "Blocken", text: "Darf Kreaturen mit Fliegend blocken, fliegt aber nicht selbst." },
  { icon: "→", term: "Trampelschaden", tag: "Kampf", text: "Tödlichen Schaden den Blockern zuweisen; überschüssiger Schaden geht zum angegriffenen Ziel." },
  { icon: "Ⅰ", term: "Erstschlag", tag: "Kampf", text: "Fügt Kampfschaden vor Kreaturen ohne Erst- oder Doppelschlag zu." },
  { icon: "Ⅱ", term: "Doppelschlag", tag: "Kampf", text: "Fügt im Erstschlagsegment und im normalen Schadenssegment Kampfschaden zu." },
  { icon: "✦", term: "Todesberührung", tag: "Schaden", text: "Schon 1 Schaden dieser Quelle gilt für eine Kreatur als tödlich." },
  { icon: "♥", term: "Lebensverknüpfung", tag: "Leben", text: "Wenn diese Quelle Schaden zufügt, erhält ihre kontrollierende Person ebenso viele Lebenspunkte." },
  { icon: "◉", term: "Wachsamkeit", tag: "Angriff", text: "Die Kreatur wird beim Angreifen nicht getappt." },
  { icon: "⚡", term: "Eile", tag: "Tempo", text: "Ignoriert Einsatzverzögerung: Sie darf sofort angreifen und ihre {T}-Fähigkeiten aktivieren." },
  { icon: "⊘", term: "Verteidiger", tag: "Grenze", text: "Diese Kreatur kann nicht angreifen. Blocken darf sie ganz normal." },
  { icon: "◇", term: "Unzerstörbar", tag: "Schutz", text: "Wird nicht durch tödlichen Schaden oder Effekte mit „zerstöre“ zerstört. Opfern und Exil wirken trotzdem." },
  { icon: "⬡", term: "Fluchsicherheit", tag: "Schutz", text: "Kann nicht Ziel von Zaubersprüchen oder Fähigkeiten sein, die Gegner kontrollieren." },
  { icon: "ₓ", term: "Abwehr", tag: "Schutz", text: "Wird sie vom Gegner als Ziel gewählt, muss dieser die angegebenen Abwehrkosten bezahlen – sonst wird der Effekt neutralisiert." },
  { icon: "☍", term: "Bedrohlich", tag: "Blocken", text: "Kann nicht von nur einer Kreatur geblockt werden; mindestens zwei Blocker sind nötig." },
  { icon: "✧", term: "Aufblitzen", tag: "Timing", text: "Die Karte darf gewirkt werden, als wäre sie ein Spontanzauber – also fast jederzeit bei eigener Priorität." },
  { icon: "+1", term: "Bravour", tag: "Bonus", text: "Immer wenn du einen Nichtkreatur-Zauberspruch wirkst, erhält sie bis zum Zugende +1/+1." },
];

const basicRules = [
  {
    n: "01",
    title: "Ziel",
    text: "Bringe die gegnerischen Lebenspunkte von 20 auf 0. Auch wer aus einer leeren Bibliothek ziehen muss oder 10 Giftmarken hat, verliert.",
  },
  {
    n: "02",
    title: "Start",
    text: "Mische, ziehe sieben Karten und bestimme, wer beginnt. Bei einem Mulligan ziehst du erneut sieben und legst danach je Mulligan eine Karte unter die Bibliothek.",
  },
  {
    n: "03",
    title: "Mana & Länder",
    text: "Tippe Länder, um Mana zu erzeugen und Kosten zu bezahlen. Das Mana verschwindet am Ende jedes Segments und jeder Phase.",
  },
  {
    n: "04",
    title: "Karten wirken",
    text: "Bezahle die Manakosten, wähle nötige Ziele und lege den Zauberspruch auf den Stapel. Spontanzauber sind flexibler als Hexereien.",
  },
  {
    n: "05",
    title: "Antworten",
    text: "Wer Priorität hat, darf handeln. Antworten liegen oben auf dem Stapel und werden von oben nach unten verrechnet.",
  },
  {
    n: "06",
    title: "Kreaturen",
    text: "Stärke ist der zugefügte Schaden, Widerstandskraft die Belastungsgrenze. Tödlicher Schaden zerstört die Kreatur.",
  },
];

const zones = [
  ["Bibliothek", "Dein verdeckter Nachziehstapel."],
  ["Hand", "Karten, die nur du sehen und spielen kannst."],
  ["Schlachtfeld", "Hier liegen bleibende Karten: Länder, Kreaturen und mehr."],
  ["Friedhof", "Offener Ablagestapel für zerstörte, abgeworfene und verrechnete Karten."],
  ["Exil", "Ein eigener Bereich außerhalb des Friedhofs; Rückkehr nur, wenn eine Karte es erlaubt."],
  ["Stapel", "Warteschlange für Zaubersprüche und Fähigkeiten – zuletzt hinein, zuerst heraus."],
];

function LifeCounter({
  name,
  accent,
}: {
  name: string;
  accent: "sun" | "mint";
}) {
  const [life, setLife] = useState(20);
  const change = (amount: number) => setLife((value) => Math.max(0, value + amount));

  return (
    <div className={`life-card ${accent}`}>
      <div className="life-head">
        <span>{name}</span>
        <button className="reset-mini" onClick={() => setLife(20)} aria-label={`${name} auf 20 zurücksetzen`}>
          ↻ Reset
        </button>
      </div>
      <output className="life-value" aria-live="polite">{life}</output>
      <div className="life-controls" aria-label={`Lebenspunkte für ${name}`}>
        <button onClick={() => change(-5)} aria-label="Fünf Lebenspunkte abziehen">−5</button>
        <button onClick={() => change(-1)} aria-label="Einen Lebenspunkt abziehen">−1</button>
        <button onClick={() => change(1)} aria-label="Einen Lebenspunkt hinzufügen">+1</button>
        <button onClick={() => change(5)} aria-label="Fünf Lebenspunkte hinzufügen">+5</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [turnIndex, setTurnIndex] = useState(0);
  const [ruleSearch, setRuleSearch] = useState("");

  const filteredKeywords = useMemo(() => {
    const query = ruleSearch.trim().toLocaleLowerCase("de");
    if (!query) return keywordRules;
    return keywordRules.filter((rule) =>
      `${rule.term} ${rule.tag} ${rule.text}`.toLocaleLowerCase("de").includes(query),
    );
  }, [ruleSearch]);

  const nextStep = () => setTurnIndex((value) => (value + 1) % turnSteps.length);
  const previousStep = () =>
    setTurnIndex((value) => (value - 1 + turnSteps.length) % turnSteps.length);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#start" aria-label="Zauberstart – nach oben">
          <span className="brand-mark">Z</span>
          <span>ZAUBERSTART</span>
        </a>
        <nav aria-label="Seitennavigation">
          <a href="#zug">Zug</a>
          <a href="#grundlagen">Grundlagen</a>
          <a href="#begriffe">Kartenregeln</a>
        </nav>
        <a className="quick-link" href="#zaehler">LP zählen <span>↓</span></a>
      </header>

      <section className="hero" id="start">
        <div className="hero-copy">
          <div className="eyebrow"><span />Dein Begleiter für die erste Partie</div>
          <h1>Magic lernen.<br /><em>Zug für Zug.</em></h1>
          <p className="hero-lead">
            Die wichtigsten Regeln ohne Regelbuch-Dschungel. Offen auf den Tisch legen,
            gemeinsam spielen und bei Fragen kurz nachsehen.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#zug">Zug starten <span>→</span></a>
            <a className="text-link" href="#grundlagen">Erst die Grundlagen</a>
          </div>
        </div>
        <div className="hero-card" aria-label="Merksatz">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="card-inner">
            <span className="card-kicker">MERKE</span>
            <strong>Lesen schlägt Erinnern.</strong>
            <p>Der Text auf einer Karte darf die normalen Regeln verändern. Was auf der Karte steht, gilt.</p>
            <div className="card-rule" />
            <small>Bei Widerspruch: die genauere Regel gewinnt.</small>
          </div>
        </div>
      </section>

      <section className="counter-section" id="zaehler">
        <div className="section-heading compact">
          <div>
            <span className="section-number">00</span>
            <h2>Spieltisch</h2>
          </div>
          <p>Standardstart: 20 Leben. Commander startet meist mit 40.</p>
        </div>
        <div className="counter-grid">
          <LifeCounter name="Spieler:in 1" accent="sun" />
          <div className="versus">VS</div>
          <LifeCounter name="Spieler:in 2" accent="mint" />
        </div>
      </section>

      <section className="turn-section" id="zug">
        <div className="section-heading">
          <div>
            <span className="section-number">01</span>
            <h2>Ein Zug in<br />zehn Schritten</h2>
          </div>
          <p>Tippe auf einen Schritt oder führe die Runde mit den Pfeilen. Nach Schritt zehn beginnt die nächste Person wieder beim Enttappen.</p>
        </div>

        <div className="turn-board">
          <div className="phase-rail" role="tablist" aria-label="Zugschritte">
            {turnSteps.map((step, index) => (
              <button
                key={step.short}
                className={turnIndex === index ? "active" : ""}
                onClick={() => setTurnIndex(index)}
                role="tab"
                aria-selected={turnIndex === index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step.short}
              </button>
            ))}
          </div>

          <div className="phase-detail">
            <div className="phase-meta">AKTUELLER SCHRITT · {String(turnIndex + 1).padStart(2, "0")}/{turnSteps.length}</div>
            <div className="phase-detail-grid">
              <div>
                <h3>{turnSteps[turnIndex].title}</h3>
                <p>{turnSteps[turnIndex].text}</p>
              </div>
              <div className="phase-cue">
                <span>JETZT</span>
                <strong>{turnSteps[turnIndex].cue}</strong>
              </div>
            </div>
            <div className="phase-navigation">
              <button onClick={previousStep}>← Zurück</button>
              <div className="progress-dots" aria-hidden="true">
                {turnSteps.map((step, index) => <i key={step.short} className={index === turnIndex ? "active" : ""} />)}
              </div>
              <button className="next" onClick={nextStep}>Weiter →</button>
            </div>
          </div>
        </div>
      </section>

      <section className="basics-section" id="grundlagen">
        <div className="section-heading">
          <div>
            <span className="section-number">02</span>
            <h2>Das Spiel<br />in sechs Regeln</h2>
          </div>
          <p>Damit könnt ihr eine erste offene Lernpartie beginnen. Bei Sonderfällen hilft immer der genaue Kartentext.</p>
        </div>
        <div className="basics-grid">
          {basicRules.map((rule) => (
            <article className="basic-card" key={rule.n}>
              <span>{rule.n}</span>
              <h3>{rule.title}</h3>
              <p>{rule.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="zones-section" id="zonen">
        <div className="zones-title">
          <span className="section-number">03</span>
          <h2>Wo liegt welche Karte?</h2>
          <p>Sechs Zonen, die ständig vorkommen.</p>
        </div>
        <div className="zones-list">
          {zones.map(([title, text], index) => (
            <div className="zone-row" key={title}>
              <span className="zone-index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="keywords-section" id="begriffe">
        <div className="section-heading">
          <div>
            <span className="section-number">04</span>
            <h2>Kartenwörter<br />schnell erklärt</h2>
          </div>
          <div className="search-wrap">
            <label htmlFor="rule-search">Begriff suchen</label>
            <input
              id="rule-search"
              type="search"
              value={ruleSearch}
              onChange={(event) => setRuleSearch(event.target.value)}
              placeholder="z. B. Fliegend"
            />
          </div>
        </div>
        <div className="keyword-grid">
          {filteredKeywords.map((rule) => (
            <article className="keyword-card" key={rule.term}>
              <div className="keyword-icon">{rule.icon}</div>
              <div>
                <span>{rule.tag}</span>
                <h3>{rule.term}</h3>
                <p>{rule.text}</p>
              </div>
            </article>
          ))}
        </div>
        {filteredKeywords.length === 0 && (
          <div className="empty-state">Kein Treffer. Probiere „Kampf“, „Schutz“ oder „Fliegend“.</div>
        )}
      </section>

      <section className="missing-section">
        <div className="missing-title">
          <span>GUT ZU WISSEN</span>
          <h2>Was sonst noch oft fehlt</h2>
        </div>
        <div className="missing-grid">
          <article>
            <span>60+</span>
            <h3>Deckbau</h3>
            <p>Ein normales Constructed-Deck hat mindestens 60 Karten. Außer Standardländern höchstens vier Karten mit gleichem Namen.</p>
          </article>
          <article>
            <span>⌛</span>
            <h3>Einsatzverzögerung</h3>
            <p>Eine Kreatur kann erst ab deinem nächsten Zug angreifen oder Fähigkeiten mit dem Tappen-Symbol nutzen. Blocken darf sie sofort.</p>
          </article>
          <article>
            <span>↧</span>
            <h3>Blockiert bleibt blockiert</h3>
            <p>Verschwindet ein Blocker, bleibt der Angreifer blockiert. Ohne Trampelschaden trifft er die angegriffene Person dann nicht.</p>
          </article>
          <article>
            <span>?</span>
            <h3>Offen spielen</h3>
            <p>Für Lernpartien: Hände offen zeigen, Entscheidungen erklären und Fehler zurücknehmen. Das macht Regeln schneller verständlich.</p>
          </article>
        </div>
      </section>

      <footer>
        <div className="brand footer-brand">
          <span className="brand-mark">Z</span>
          <span>ZAUBERSTART</span>
        </div>
        <p>Eine kompakte Lernhilfe für Magic: The Gathering. Bei Turnieren und Detailfragen gelten die aktuellen offiziellen Regeln.</p>
        <a href="#start">Nach oben ↑</a>
      </footer>
    </main>
  );
}
