'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { quizPersons } from '@/app/data/alumni';

// ============================================================
// BINGO
// ============================================================
const BINGO_SQUARES = [
  'Jemand hat Fotos von damals dabei','"Weißt du noch, als..."',
  'Jemand sieht 0% anders aus','Jemand ist Arzt geworden',
  '"Ich wohn noch in der Nähe"','Handy rausnehmen für Selfie',
  'Jemand kennt alle noch beim Vornamen','"Ich hab damals gewusst..."',
  'Kindheitsfoto auf dem Tisch','Tränen bei Wiedersehen',
  '⭐ FREI ⭐','WhatsApp-Gruppe startet Diskussion',
  'Jemand hat zugenommen / abgenommen','Lehrergeschichten werden erzählt',
  '"Was macht ihr beruflich?"','"Ich bin extra angereist!"',
  'Tanz zu 90er-Hit','"Früher war alles besser"',
  'Jemand hat Kinder mitgebracht','Peinliche Abizeitung-Story',
  '"Der sieht aus wie sein Vater"','Gemeinsames Foto aller',
  'Jemand schläft ein','"Bis 2056!"',
  'Heulen beim Klassenfotos',
];

function BingoGame() {
  const [marked, setMarked] = useState<Set<number>>(new Set([10]));
  const toggle = (i: number) => {
    if (i === 10) return;
    setMarked((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };
  const hasBingo = () => {
    for (let r = 0; r < 5; r++) if ([0,1,2,3,4].every((c) => marked.has(r*5+c))) return true;
    for (let c = 0; c < 5; c++) if ([0,1,2,3,4].every((r) => marked.has(r*5+c))) return true;
    if ([0,6,12,18,24].every((i) => marked.has(i))) return true;
    if ([4,8,12,16,20].every((i) => marked.has(i))) return true;
    return false;
  };
  return (
    <div className="space-y-4">
      {hasBingo() && (
        <div className="font-black text-2xl text-center py-3 rounded-xl animate-bounce text-white"
          style={{ background: '#E84060', boxShadow: '0 4px 20px rgba(232,64,96,0.35)' }}>
          🎉 BINGO! 🎉
        </div>
      )}
      <div className="grid grid-cols-5 gap-1.5">
        {BINGO_SQUARES.map((sq, i) => (
          <button key={i} onClick={() => toggle(i)}
            className="aspect-square flex items-center justify-center text-xs font-medium p-1 rounded-lg text-center transition-all leading-tight border"
            style={marked.has(i)
              ? (i === 10
                  ? { background: '#E84060', color: 'white', fontWeight: 900, borderColor: '#E84060' }
                  : { background: '#2D6A4F', color: 'white', transform: 'scale(0.95)', borderColor: '#2D6A4F' })
              : { background: 'white', color: '#374151', borderColor: 'rgba(0,0,0,0.08)' }
            }
          >{sq}</button>
        ))}
      </div>
      <button onClick={() => setMarked(new Set([10]))} className="text-xs text-[#9ca3af] hover:text-[#6b7280] transition-colors">Neustart</button>
    </div>
  );
}

// ============================================================
// GUT / SCHLECHT GEALTERT
// ============================================================
const VOTE_CATS = [
  { id: 'gut', label: 'Gut gealtert wie...', image: '/grafiken/gut-gealtert-wine.png', emoji: '🍷' },
  { id: 'schlecht', label: 'Schlecht gealtert wie...', image: '/grafiken/schlecht-gealtert-cheese.png', emoji: '🧀' },
];

function VotingSection() {
  const [votes, setVotes] = useState<Record<string, string>>({});
  const candidates = ['Bartling, Sönke','Esser, Sebastian','Böer, Thomas','Styra, Darius','Fritz, Jochen','Hehl, Boris','Baldus, Markus','Giehl, Stephan'];
  return (
    <div className="space-y-6">
      {VOTE_CATS.map((cat) => (
        <div key={cat.id} className="glass rounded-2xl p-5">
          <div className="flex gap-4 items-start mb-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#f3f4f6]">
              <Image src={cat.image} alt={cat.label} fill className="object-cover" sizes="80px" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#111827]">{cat.emoji} {cat.label}</h4>
              <p className="text-sm text-[#9ca3af]">Voting beim Treffen aktiv</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {candidates.map((c) => (
              <button key={c} onClick={() => setVotes((v) => ({...v, [cat.id]: c}))}
                className="text-sm p-2 rounded-lg text-left transition-all border"
                style={votes[cat.id] === c
                  ? { background: '#E84060', color: 'white', fontWeight: 700, borderColor: '#E84060' }
                  : { background: 'white', color: '#374151', borderColor: 'rgba(0,0,0,0.08)' }
                }>
                {votes[cat.id] === c ? '✓ ' : ''}{c.split(', ').reverse().join(' ')}
              </button>
            ))}
          </div>
          {votes[cat.id] && (
            <p className="text-sm mt-2 font-semibold text-[#2D6A4F]">
              Dein Vote: {votes[cat.id].split(', ').reverse().join(' ')}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// WER BIN ICH
// ============================================================
function WerBinIchQuiz() {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [clueIndex, setClueIndex] = useState(0);
  const [score, setScore] = useState(0);
  const person = quizPersons[current];
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#9ca3af]">Frage {current+1} / {quizPersons.length}</span>
        <span className="text-sm font-black" style={{ color: '#E84060' }}>Score: {score}</span>
      </div>
      <div className="space-y-3">
        {person.clues.slice(0, clueIndex+1).map((clue, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="font-black text-sm" style={{ color: '#E84060' }}>#{i+1}</span>
            <p className="text-[#374151] text-sm">{clue}</p>
          </div>
        ))}
      </div>
      {!revealed ? (
        <div className="flex gap-3 flex-wrap">
          {clueIndex < person.clues.length-1 && (
            <button onClick={() => setClueIndex((i) => i+1)}
              className="px-4 py-2 rounded-lg text-sm bg-white border border-black/[0.08] text-[#374151] transition-colors hover:border-[#2D6A4F]/30">
              Noch ein Hinweis...
            </button>
          )}
          <button onClick={() => setRevealed(true)}
            className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: '#E84060' }}>
            Auflösen!
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl p-4 bg-[#f0fdf4] border border-[#2D6A4F]/20">
            <p className="font-black text-lg text-[#2D6A4F]">{person.answer.split(', ').reverse().join(' ')}</p>
          </div>
          <button onClick={() => { setRevealed(false); setClueIndex(0); setCurrent((c) => (c+1)%quizPersons.length); }}
            className="px-4 py-2 rounded-lg text-sm bg-white border border-black/[0.08] text-[#374151] hover:border-[#2D6A4F]/30 transition-colors">
            Nächste Person →
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SUPERLATIVES
// ============================================================
const SUPERLATIVES = [
  { id: 'success',   label: 'Erfolgreichste Karriere',            emoji: '🏆' },
  { id: 'changed',   label: 'Am meisten verändert',               emoji: '🦋' },
  { id: 'unchanged', label: 'Am wenigsten verändert',             emoji: '🧊' },
  { id: 'traveler',  label: 'Weitest gereist für das Treffen',    emoji: '✈️' },
  { id: 'funny',     label: 'Lustigste Abizeitung-Geschichte',    emoji: '😂' },
  { id: 'surprise',  label: 'Größte Überraschung',                emoji: '🎊' },
];

function SuperlativesVoting() {
  const [votes, setVotes] = useState<Record<string, string>>({});
  return (
    <div className="space-y-4">
      {SUPERLATIVES.map((sup) => (
        <div key={sup.id} className="glass rounded-xl p-4">
          <h4 className="font-semibold mb-2 text-[#111827]">{sup.emoji} {sup.label}</h4>
          <input type="text" placeholder="Name eingeben…" value={votes[sup.id]||''}
            onChange={(e) => setVotes((v) => ({...v, [sup.id]: e.target.value}))}
            className="w-full rounded-lg px-3 py-2 text-sm text-[#111827] outline-none bg-white border border-black/[0.08] focus:border-[#2D6A4F]/40 transition-colors" />
        </div>
      ))}
      <div className="text-center">
        <button className="px-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: '#2D6A4F' }}>
          Votes abschicken (coming soon)
        </button>
      </div>
    </div>
  );
}

// ============================================================
// DM PREIS SPIEL
// ============================================================
const DM_ITEMS = [
  { item: 'Big Mac',               price: '4,90 DM', hint: "McDonald's" },
  { item: 'Bravo (Heft)',          price: '3,50 DM', hint: 'Jugendzeitschrift' },
  { item: 'Kinokarte',             price: '10,00 DM', hint: 'Abendkasse' },
  { item: 'Benzin (1L Super)',     price: '1,35 DM', hint: 'Tankstelle' },
  { item: 'Bier (0,5L Kneipe)',    price: '2,50 DM', hint: 'Gaststätte' },
  { item: 'Zigaretten (20er)',     price: '4,50 DM', hint: 'Automatenpreis' },
  { item: 'VHS-Kassette (neu)',    price: '29,95 DM', hint: 'Videothek' },
  { item: 'Monatskarte ÖPNV',     price: '58,00 DM', hint: 'Studentenkarte' },
  { item: 'Compact Disc (CD)',     price: '22,00 DM', hint: 'Musikgeschäft' },
  { item: 'Döner Kebab',           price: '2,50 DM', hint: 'Imbiss' },
];

function DmPreisSpiel() {
  const [idx, setIdx]           = useState(0);
  const [guess, setGuess]       = useState('');
  const [revealed, setRevealed] = useState(false);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const current = DM_ITEMS[idx];

  const handleReveal = () => {
    setRevealed(true);
    const g = parseFloat(guess.replace(',', '.'));
    const c = parseFloat(current.price.replace(',', '.').replace(' DM', ''));
    if (!isNaN(g) && Math.abs(g - c) <= 0.5) setScore((s) => s+1);
  };
  const handleNext = () => {
    if (idx >= DM_ITEMS.length-1) { setDone(true); return; }
    setIdx((i) => i+1); setGuess(''); setRevealed(false);
  };

  if (done) return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">💰</div>
      <p className="text-2xl font-black mb-2 text-[#111827]">Ergebnis: {score} / {DM_ITEMS.length}</p>
      <p className="mb-4 text-[#6b7280]">
        {score >= 8 ? 'Echter 90er-Kenner! 🏆' : score >= 5 ? 'Nicht schlecht! 👍' : 'Die DM ist schon lange her... 😅'}
      </p>
      <button onClick={() => { setIdx(0); setGuess(''); setRevealed(false); setScore(0); setDone(false); }}
        className="px-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
        style={{ background: '#E84060' }}>Nochmal spielen</button>
    </div>
  );

  const g = parseFloat(guess.replace(',', '.'));
  const c = parseFloat(current.price.replace(',', '.').replace(' DM', ''));
  const hit = !isNaN(g) && Math.abs(g - c) <= 0.5;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-[#9ca3af]">Frage {idx+1} / {DM_ITEMS.length}</span>
        <span className="font-black" style={{ color: '#E84060' }}>Score: {score}</span>
      </div>
      <div className="glass rounded-2xl p-6 text-center">
        <p className="text-sm text-[#9ca3af] mb-1">{current.hint}</p>
        <h3 className="text-3xl font-black mb-4 text-[#111827]">{current.item}</h3>
        <p className="text-sm text-[#6b7280] mb-4">Was hat das 1996 in DM gekostet?</p>
        {!revealed ? (
          <div className="flex gap-2 max-w-xs mx-auto">
            <div className="relative flex-1">
              <input type="text" placeholder="z.B. 4,90" value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && guess && handleReveal()}
                className="w-full rounded-lg px-3 py-2 text-[#111827] pr-12 outline-none bg-white border border-black/[0.08] focus:border-[#2D6A4F]/40 transition-colors" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-sm text-[#9ca3af]">DM</span>
            </div>
            <button onClick={handleReveal} disabled={!guess}
              className="px-4 py-2 rounded-lg font-bold text-white transition-opacity"
              style={{ background: guess ? '#E84060' : '#e5e7eb', color: guess ? 'white' : '#9ca3af' }}>→</button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-xl p-4" style={hit
              ? { background: '#f0fdf4', border: '1px solid rgba(45,106,79,0.25)' }
              : { background: '#fff1f2', border: '1px solid rgba(232,64,96,0.25)' }
            }>
              <p className="text-2xl font-black text-[#111827]">{current.price}</p>
              {guess && <p className="text-sm mt-1" style={{ color: hit ? '#2D6A4F' : '#E84060' }}>
                Deine Schätzung: {guess} DM {hit ? '✓ Treffer!' : '✗'}
              </p>}
            </div>
            <button onClick={handleNext}
              className="px-6 py-2 rounded-lg font-semibold bg-white border border-black/[0.08] text-[#374151] hover:border-[#2D6A4F]/30 transition-colors">Nächstes →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// DUDA-SPRUCH-GENERATOR
// ============================================================
const DUDA_QUOTES = [
  { quote: '"Von Genialität bis zum Wahnsinn ist es nur ein kleiner Schritt."', person: 'Über Sönke Bartling' },
  { quote: '"200 cm Unsinn, aber im richtigen Moment."', person: 'Zitat: Gerthold über Bartling' },
  { quote: '"Also in Australien war das ganz anders..."', person: 'Sebastian Esser, obligatorisch' },
  { quote: '"Ihr müßt mir nicht zuhöhren!"', person: 'Jochen Fritz zum Publikum' },
  { quote: '"Old Mac Jochen has a farm — E-I-E-I-O!"', person: 'Jochen Fritz, Alleinunterhalter' },
  { quote: '"Gell, wir sind Freunde!"', person: 'Jochen Fritz' },
  { quote: '"Mit dir trink ich am liebsten!"', person: 'Jochen Fritz' },
  { quote: '"Das Bartling-Syndrom: Wenn Chaos auf Genie trifft."', person: 'Abizeitung 1996' },
  { quote: '"Die Farbe seiner Winterjacke tut einem in den Augen weh."', person: 'Über Sebastian Esser' },
  { quote: '"Redet wie eine Schnecke läuft."', person: 'Über Sebastian Esser' },
  { quote: '"Er ließ die (Meer-)Sau raus."', person: 'Über Jochen Fritz' },
  { quote: '"Wenn er erzählt, bleibt kein Auge trocken."', person: 'Über Jochen Fritz' },
  { quote: '"ob blond ob schwarz ob rot ob braun — Jochen Fritz liebt alle Frau\'n"', person: 'Abizeitung 1996' },
  { quote: '"Zentrum des Chaos"', person: 'Über Sönke Bartling' },
  { quote: '"Dudist — von Genialität und Wahnsinn."', person: 'Abizeitung 1996' },
];

function DudaSpruchGenerator() {
  const [idx, setIdx]        = useState(() => Math.floor(Math.random() * DUDA_QUOTES.length));
  const [animating, setAnim] = useState(false);
  const next = () => {
    setAnim(true);
    setTimeout(() => { setIdx(Math.floor(Math.random() * DUDA_QUOTES.length)); setAnim(false); }, 200);
  };
  const q = DUDA_QUOTES[idx];
  return (
    <div className="space-y-6">
      <div
        className="glass rounded-2xl p-8 text-center transition-opacity duration-200"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <div className="text-5xl mb-4">📖</div>
        <blockquote className="text-xl font-semibold text-[#111827] leading-relaxed mb-4 italic">{q.quote}</blockquote>
        <p className="text-sm" style={{ color: '#E84060' }}>— {q.person}</p>
      </div>
      <div className="text-center space-y-2">
        <button onClick={next}
          className="px-8 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{ background: '#E84060', boxShadow: '0 4px 20px rgba(232,64,96,0.25)' }}>
          🎲 Neuer Spruch
        </button>
        <p className="text-xs text-[#9ca3af]">{idx+1} / {DUDA_QUOTES.length} Perlen der Abizeitung</p>
      </div>
    </div>
  );
}

// ============================================================
// 1996 VS 2026 FLIP CARDS
// ============================================================
const FLIP_CARDS = [
  { then: '56k Modem — "Einwählen" dauert 30 Sek.', now: '1 Gbit/s Glasfaser — überall, sofort', emoji: '🌐' },
  { then: 'Floppy Disk: 1,44 MB', now: 'MicroSD: 1 TB (700.000× mehr)', emoji: '💾' },
  { then: 'Nokia 1610 — Snake, kein Foto', now: 'iPhone 17 — KI, 4K-Video, AR', emoji: '📱' },
  { then: 'Videothek: VHS ausleihen, zurückbringen', now: 'Netflix, Disney+, Spotify — alles sofort', emoji: '🎬' },
  { then: 'Straßenkarte falten können war Pflicht', now: 'Google Maps sagt "In 200m links"', emoji: '🗺️' },
  { then: 'Brief schreiben und 3 Tage warten', now: 'WhatsApp — gesendet, gelesen, 2 Min. Antwort', emoji: '✉️' },
  { then: 'Fotoentwicklung: 2 Wochen warten', now: 'Foto fertig in 0,1 Sek., sofort teilen', emoji: '📸' },
  { then: 'Schulaufgabe: Bibliothek, Karteikasten', now: 'ChatGPT / Claude in 3 Sekunden', emoji: '🤖' },
  { then: 'Berliner Mauer seit 7 Jahren weg', now: '30 Jahre nach der Wende', emoji: '🏛️' },
  { then: 'Bundesliga: TV oder Zeitung am nächsten Tag', now: 'Live-Stream, Highlights in 2 Min.', emoji: '⚽' },
];

function FlipCards() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setFlipped((p) => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <div className="space-y-3">
      <p className="text-sm mb-4 text-[#9ca3af]">Tippe auf eine Karte zum Umdrehen.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FLIP_CARDS.map((card, i) => (
          <button key={i} onClick={() => toggle(i)}
            className="p-5 rounded-2xl text-left transition-all border hover:shadow-sm"
            style={flipped.has(i)
              ? { background: '#eff6ff', borderColor: 'rgba(59,130,246,0.3)' }
              : { background: 'white', borderColor: 'rgba(0,0,0,0.08)' }
            }>
            <div className="flex gap-3 items-start">
              <span className="text-2xl flex-shrink-0">{card.emoji}</span>
              <div>
                {!flipped.has(i) ? (
                  <>
                    <p className="text-xs font-bold mb-1" style={{ color: '#E84060' }}>1996</p>
                    <p className="text-sm text-[#374151]">{card.then}</p>
                    <p className="text-xs mt-2 text-[#9ca3af]">→ Umdrehen für 2026</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold mb-1 text-blue-500">2026</p>
                    <p className="text-sm text-[#374151]">{card.now}</p>
                    <p className="text-xs mt-2 text-[#9ca3af]">← Zurück zu 1996</p>
                  </>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// KASSETTEN-MIXTAPE
// ============================================================
const PRESET_SONGS = [
  { artist: 'Alanis Morissette', title: 'Ironic' },
  { artist: 'Oasis', title: 'Wonderwall' },
  { artist: 'Coolio', title: "Gangsta's Paradise" },
  { artist: 'Los Del Rio', title: 'Macarena' },
  { artist: 'Spice Girls', title: 'Wannabe' },
];

function KassettenMixtape() {
  const [songs, setSongs] = useState(PRESET_SONGS);
  const [inp, setInp]     = useState({ artist: '', title: '' });
  const add = () => {
    if (!inp.artist || !inp.title) return;
    setSongs((p) => [...p, inp]);
    setInp({ artist: '', title: '' });
  };
  return (
    <div className="space-y-5">
      <div className="glass rounded-2xl p-5">
        <div className="flex gap-3 items-center mb-4">
          <div className="text-4xl">📼</div>
          <div>
            <p className="font-bold text-base text-[#111827]">Marienstatt Reunion Mix 2026</p>
            <p className="text-sm text-[#9ca3af]">{songs.length} Tracks · ~{songs.length*4} Min · Side A</p>
          </div>
        </div>
        <ol className="space-y-1.5">
          {songs.map((s, i) => (
            <li key={i} className="flex gap-3 items-center text-sm">
              <span className="w-5 flex-shrink-0 text-[#9ca3af]">{i+1}.</span>
              <span className="text-[#111827] font-medium">{s.title}</span>
              <span className="text-[#9ca3af]">—</span>
              <span className="text-[#6b7280]">{s.artist}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="glass rounded-xl p-4 space-y-3">
        <h4 className="font-semibold text-sm text-[#111827]">Deinen Song hinzufügen</h4>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Interpret" value={inp.artist}
            onChange={(e) => setInp((v) => ({...v, artist: e.target.value}))}
            className="rounded-lg px-3 py-2 text-sm text-[#111827] outline-none bg-white border border-black/[0.08] focus:border-[#2D6A4F]/40 transition-colors" />
          <input type="text" placeholder="Titel" value={inp.title}
            onChange={(e) => setInp((v) => ({...v, title: e.target.value}))}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            className="rounded-lg px-3 py-2 text-sm text-[#111827] outline-none bg-white border border-black/[0.08] focus:border-[#2D6A4F]/40 transition-colors" />
        </div>
        <button onClick={add} disabled={!inp.artist || !inp.title}
          className="w-full py-2 rounded-lg font-semibold text-sm transition-opacity"
          style={{ background: inp.artist && inp.title ? '#E84060' : '#e5e7eb', color: inp.artist && inp.title ? 'white' : '#9ca3af' }}>
          + Auf die Kassette
        </button>
      </div>
    </div>
  );
}

// ============================================================
// NOKIA SNAKE
// ============================================================
const CELL = 16, COLS = 20, ROWS = 15;
type Pt = [number, number];
type Dir = 'UP'|'DOWN'|'LEFT'|'RIGHT';

function NokiaSnake() {
  const [snake, setSnake]     = useState<Pt[]>([[10,7],[9,7],[8,7]]);
  const [food, setFood]       = useState<Pt>([15,7]);
  const [dir, setDir]         = useState<Dir>('RIGHT');
  const [running, setRunning] = useState(false);
  const [dead, setDead]       = useState(false);
  const [score, setScore]     = useState(0);
  const [highscore, setHS]    = useState(0);
  const dirRef   = useRef<Dir>('RIGHT');
  const snakeRef = useRef<Pt[]>([[10,7],[9,7],[8,7]]);
  const foodRef  = useRef<Pt>([15,7]);

  const newFood = useCallback((s: Pt[]): Pt => {
    let f: Pt;
    do { f = [Math.floor(Math.random()*COLS), Math.floor(Math.random()*ROWS)]; }
    while (s.some(([x,y]) => x===f[0] && y===f[1]));
    return f;
  }, []);

  const reset = useCallback(() => {
    const s: Pt[] = [[10,7],[9,7],[8,7]], f: Pt = [15,7];
    snakeRef.current = s; foodRef.current = f; dirRef.current = 'RIGHT';
    setSnake(s); setFood(f); setDir('RIGHT'); setDead(false); setScore(0); setRunning(false);
  }, []);

  useEffect(() => {
    const opp: Record<Dir, Dir> = { UP:'DOWN', DOWN:'UP', LEFT:'RIGHT', RIGHT:'LEFT' };
    const map: Record<string, Dir> = { ArrowUp:'UP', ArrowDown:'DOWN', ArrowLeft:'LEFT', ArrowRight:'RIGHT', w:'UP', s:'DOWN', a:'LEFT', d:'RIGHT' };
    const h = (e: KeyboardEvent) => {
      if (map[e.key] && map[e.key] !== opp[dirRef.current]) { dirRef.current = map[e.key]; setDir(map[e.key]); e.preventDefault(); }
    };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    if (!running) return;
    const dmap: Record<Dir,[number,number]> = { UP:[0,-1], DOWN:[0,1], LEFT:[-1,0], RIGHT:[1,0] };
    const tick = setInterval(() => {
      const s = snakeRef.current, [hx,hy] = s[0], [dx,dy] = dmap[dirRef.current];
      const nx = hx+dx, ny = hy+dy;
      if (nx<0||nx>=COLS||ny<0||ny>=ROWS||s.some(([x,y])=>x===nx&&y===ny)) {
        clearInterval(tick); setRunning(false); setDead(true);
        setHS((h) => Math.max(h, snakeRef.current.length*10)); return;
      }
      const [fx,fy] = foodRef.current, ate = nx===fx&&ny===fy;
      const ns: Pt[] = [[nx,ny], ...s.slice(0, ate ? s.length : s.length-1)];
      snakeRef.current = ns;
      if (ate) { const nf = newFood(ns); foodRef.current = nf; setFood(nf); setScore((sc) => sc+10); }
      setSnake([...ns]);
    }, 130);
    return () => clearInterval(tick);
  }, [running, newFood]);

  const start = () => { if (dead) reset(); setRunning(true); };
  const swipe = (d: Dir) => { const opp: Record<Dir,Dir> = { UP:'DOWN',DOWN:'UP',LEFT:'RIGHT',RIGHT:'LEFT' }; if (d!==opp[dirRef.current]) { dirRef.current=d; setDir(d); } };

  return (
    <div className="space-y-4 flex flex-col items-center">
      <div className="flex gap-8 text-sm">
        <span className="text-[#6b7280]">Score: <strong className="text-[#111827]">{score}</strong></span>
        <span className="text-[#6b7280]">Best: <strong style={{ color: '#E84060' }}>{highscore}</strong></span>
      </div>
      <div className="relative rounded-lg overflow-hidden border-2 border-[#2D6A4F]" style={{ width: COLS*CELL, height: ROWS*CELL, background: '#f0fdf4' }}>
        <div className="absolute rounded-full bg-red-500" style={{ left: food[0]*CELL+2, top: food[1]*CELL+2, width: CELL-4, height: CELL-4 }} />
        {snake.map(([x,y], i) => (
          <div key={`${x}-${y}-${i}`} className="absolute rounded-sm" style={{ left: x*CELL+1, top: y*CELL+1, width: CELL-2, height: CELL-2, background: i===0 ? '#2D6A4F' : '#52b788' }} />
        ))}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
            {dead && <><p className="font-black text-xl mb-1" style={{ color: '#E84060' }}>GAME OVER</p><p className="text-sm text-[#374151] mb-3">Score: {score}</p></>}
            {!dead && <p className="font-black text-lg mb-3 text-[#2D6A4F]">NOKIA SNAKE</p>}
            <button onClick={start} className="px-5 py-2 rounded-lg font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: '#2D6A4F' }}>{dead ? 'Nochmal' : 'Start'}</button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1 w-32">
        <div /><button onClick={() => swipe('UP')} className="rounded p-2 text-center text-sm bg-white border border-black/[0.08] text-[#374151]">▲</button><div />
        <button onClick={() => swipe('LEFT')} className="rounded p-2 text-center text-sm bg-white border border-black/[0.08] text-[#374151]">◄</button>
        <button onClick={() => { running ? setRunning(false) : start(); }} className="rounded p-2 text-center text-xs bg-[#f3f4f6] text-[#9ca3af]">⏸</button>
        <button onClick={() => swipe('RIGHT')} className="rounded p-2 text-center text-sm bg-white border border-black/[0.08] text-[#374151]">►</button>
        <div /><button onClick={() => swipe('DOWN')} className="rounded p-2 text-center text-sm bg-white border border-black/[0.08] text-[#374151]">▼</button><div />
      </div>
      <p className="text-xs text-[#9ca3af]">Tastatur: WASD oder Pfeiltasten</p>
    </div>
  );
}

// ============================================================
// LEHRER QUIZ
// ============================================================
const LEHRER_QUOTES = [
  { quote: '"Das ist in Ihrer Laufbahn hier das Dümmste, was ich je gehört habe."', options: ['Fritzinger (Bio)','Gerthold (Deutsch)','Schönberger (Mathe)','Albert (Deutsch)'], answer: 'Gerthold (Deutsch)', context: 'Klassiker bei Aufsatz-Besprechungen' },
  { quote: '"Setzen Sie sich hin und denken Sie nach. Wenn Ihnen etwas einfällt, melden Sie sich."', options: ['Schönberger (Mathe)','Fritzinger (Bio)','Heß (Sport)','Gerthold (Deutsch)'], answer: 'Schönberger (Mathe)', context: 'Mathe-Stunde, Tafel-Aufgabe' },
  { quote: '"In meinem Unterricht wird nicht geflüstert — laut geredet oder gar nicht."', options: ['Albert (Deutsch)','Fritzinger (Bio)','Schwärzel (Kunst)','Heß (Sport)'], answer: 'Fritzinger (Bio)', context: 'Bio-LK, 1. Stunde nach den Ferien' },
  { quote: '"Wenn das Ihr Ernst ist, besorge ich Ihnen einen Therapieplatz."', options: ['Gerthold (Deutsch)','Albert (Deutsch)','Schönberger (Mathe)','Fritzinger (Bio)'], answer: 'Albert (Deutsch)', context: 'Gedicht-Interpretation ging... schief' },
  { quote: '"Ich gebe Ihnen die Note, und Sie sind froh, dass ich Ihnen die Note gebe."', options: ['Schönberger (Mathe)','Gerthold (Deutsch)','Fritzinger (Bio)','Heß (Sport)'], answer: 'Schönberger (Mathe)', context: 'Klausurrückgabe' },
];

function LehrerQuiz() {
  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState<string|null>(null);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const q = LEHRER_QUOTES[idx];

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s+1);
  };
  const handleNext = () => {
    if (idx >= LEHRER_QUOTES.length-1) { setDone(true); return; }
    setIdx((i) => i+1); setSelected(null);
  };

  if (done) return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">🎓</div>
      <p className="text-2xl font-black mb-2 text-[#111827]">Ergebnis: {score} / {LEHRER_QUOTES.length}</p>
      <p className="mb-4 text-[#6b7280]">
        {score===LEHRER_QUOTES.length ? 'Du hast aufgepasst! 🏆' : score>=3 ? 'Gute Erinnerungen! 👍' : 'Die Lehrer waren doch austauschbar... 😅'}
      </p>
      <button onClick={() => { setIdx(0); setSelected(null); setScore(0); setDone(false); }}
        className="px-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
        style={{ background: '#E84060' }}>Nochmal</button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-[#9ca3af]">Zitat {idx+1} / {LEHRER_QUOTES.length}</span>
        <span className="font-black" style={{ color: '#E84060' }}>Score: {score}</span>
      </div>
      <div className="glass rounded-2xl p-6 space-y-5">
        <blockquote className="text-xl font-semibold text-[#111827] italic leading-relaxed border-l-4 pl-4" style={{ borderColor: '#E84060' }}>
          {q.quote}
        </blockquote>
        <p className="font-semibold text-sm text-[#6b7280]">Wer hat das gesagt?</p>
        <div className="grid grid-cols-1 gap-2">
          {q.options.map((opt) => (
            <button key={opt} onClick={() => handleSelect(opt)}
              className="p-3 rounded-lg text-sm text-left transition font-medium border"
              style={selected
                ? (opt === q.answer
                    ? { background: '#f0fdf4', color: '#2D6A4F', borderColor: 'rgba(45,106,79,0.3)' }
                    : opt === selected
                    ? { background: '#fff1f2', color: '#E84060', borderColor: 'rgba(232,64,96,0.3)' }
                    : { background: 'white', color: '#9ca3af', borderColor: 'rgba(0,0,0,0.04)' })
                : { background: 'white', color: '#374151', borderColor: 'rgba(0,0,0,0.08)' }
              }
            >{opt}</button>
          ))}
        </div>
        {selected && (
          <div className="space-y-2">
            <p className="text-xs italic text-[#9ca3af]">Kontext: {q.context}</p>
            <button onClick={handleNext}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-black/[0.08] text-[#374151] hover:border-[#2D6A4F]/30 transition-colors">
              Nächstes Zitat →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
const TABS = [
  { id: 'bingo',        label: '🎯 Bingo' },
  { id: 'voting',       label: '🍷 Gut/Schlecht' },
  { id: 'quiz',         label: '🕵️ Wer bin ich?' },
  { id: 'superlatives', label: '🏆 Superlative' },
  { id: 'dm',           label: '💰 DM-Preise' },
  { id: 'duda',         label: '📖 Duda-Sprüche' },
  { id: 'flip',         label: '🔄 1996 vs 2026' },
  { id: 'mixtape',      label: '📼 Mixtape' },
  { id: 'snake',        label: '🐍 Nokia Snake' },
  { id: 'lehrer',       label: '🎓 Lehrer-Quiz' },
];

const TITLES: Record<string, { h: string; sub: string }> = {
  bingo:        { h: 'Reunion Bingo',                    sub: 'Reihe, Spalte oder Diagonale gewinnt!' },
  voting:       { h: 'Gut gealtert / Schlecht gealtert', sub: 'Wie guter Wein oder reifer Käse — wer hat sich wie entwickelt?' },
  quiz:         { h: 'Wer bin ich?',                     sub: 'Errate die Person. Weniger Hinweise = mehr Punkte!' },
  superlatives: { h: 'Superlative 2026',                 sub: 'Nominiere für die Jahrgangssuperlative.' },
  dm:           { h: 'Was kostete das in DM?',           sub: 'Schätze die alten Preise — ±50 Pfennig gilt als Treffer!' },
  duda:         { h: 'Duda-Spruch-Generator',            sub: 'Perlen aus der Abizeitung 1996. Immer noch Gold.' },
  flip:         { h: '1996 vs. 2026',                    sub: 'Tippe um die Karte umzudrehen.' },
  mixtape:      { h: 'Kassetten-Mixtape',                sub: 'Die Playlist des Jahrgangs. Füge deinen Song hinzu.' },
  snake:        { h: 'Nokia Snake',                      sub: 'WASD / Pfeiltasten oder Touch-Buttons. Highscore schlagen!' },
  lehrer:       { h: "Wer hat's gesagt? Lehrer-Edition", sub: 'Erkennst du noch, welcher Lehrer das gesagt hat?' },
};

export default function SpielePage() {
  const [tab, setTab] = useState('bingo');
  const t = TITLES[tab];

  return (
    <main className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="font-black mb-2 tracking-tight text-[#111827]"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
          >
            <span style={{ color: '#2D6A4F' }}>Spiele</span>
          </h1>
          <p className="text-[#6b7280]">Für das Treffen am 12./13. Juni 2026</p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8" style={{ scrollbarWidth: 'none' }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 border"
              style={tab === t.id
                ? { background: '#2D6A4F', color: 'white', borderColor: '#2D6A4F' }
                : { background: 'white', color: '#6b7280', borderColor: 'rgba(0,0,0,0.08)' }
              }
            >{t.label}</button>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-xl mb-1 text-[#111827]">{t.h}</h2>
          <p className="text-sm text-[#9ca3af]">{t.sub}</p>
        </div>

        {tab === 'bingo'        && <BingoGame />}
        {tab === 'voting'       && <VotingSection />}
        {tab === 'quiz'         && <WerBinIchQuiz />}
        {tab === 'superlatives' && <SuperlativesVoting />}
        {tab === 'dm'           && <DmPreisSpiel />}
        {tab === 'duda'         && <DudaSpruchGenerator />}
        {tab === 'flip'         && <FlipCards />}
        {tab === 'mixtape'      && <KassettenMixtape />}
        {tab === 'snake'        && <NokiaSnake />}
        {tab === 'lehrer'       && <LehrerQuiz />}
      </div>
    </main>
  );
}
