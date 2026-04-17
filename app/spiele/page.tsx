'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { quizPersons } from '@/app/data/alumni';

// ============================================================
// BINGO
// ============================================================
const BINGO_SQUARES = [
  'Jemand hat Fotos von damals dabei',
  '"Weißt du noch, als..."',
  'Jemand sieht 0% anders aus',
  'Jemand ist Arzt geworden',
  '"Ich wohn noch in der Nähe"',
  'Handy rausnehmen für Selfie',
  'Jemand kennt alle noch beim Vornamen',
  '"Ich hab damals gewusst..."',
  'Kindheitsfoto auf dem Tisch',
  'Tränen bei Wiedersehen',
  '⭐ FREI ⭐',
  'WhatsApp-Gruppe startet Diskussion',
  'Jemand hat zugenommen / abgenommen',
  'Lehrergeschichten werden erzählt',
  '"Was macht ihr beruflich?"',
  '"Ich bin extra angereist!"',
  'Tanz zu 90er-Hit',
  '"Früher war alles besser"',
  'Jemand hat Kinder mitgebracht',
  'Peinliche Abizeitung-Story',
  '"Der sieht aus wie sein Vater"',
  'Gemeinsames Foto aller',
  'Jemand schläft ein',
  '"Bis 2056!"',
  'Heulen beim Klassenfotos',
];

function BingoGame() {
  const [marked, setMarked] = useState<Set<number>>(new Set([10]));

  const toggle = (i: number) => {
    if (i === 10) return;
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const checkBingo = () => {
    for (let r = 0; r < 5; r++) {
      if ([0,1,2,3,4].every((c) => marked.has(r*5+c))) return true;
    }
    for (let c = 0; c < 5; c++) {
      if ([0,1,2,3,4].every((r) => marked.has(r*5+c))) return true;
    }
    if ([0,6,12,18,24].every((i) => marked.has(i))) return true;
    if ([4,8,12,16,20].every((i) => marked.has(i))) return true;
    return false;
  };

  return (
    <div className="space-y-4">
      {checkBingo() && (
        <div className="bg-yellow-500 text-black font-black text-2xl text-center py-3 rounded-xl animate-bounce">
          🎉 BINGO! 🎉
        </div>
      )}
      <div className="grid grid-cols-5 gap-1.5">
        {BINGO_SQUARES.map((sq, i) => (
          <button key={i} onClick={() => toggle(i)}
            className={`aspect-square flex items-center justify-center text-xs font-medium p-1 rounded text-center transition-all leading-tight
              ${marked.has(i) ? (i===10 ? 'bg-yellow-500 text-black font-black' : 'bg-pink-600 text-white scale-95') : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
            {sq}
          </button>
        ))}
      </div>
      <button onClick={() => setMarked(new Set([10]))} className="text-xs text-slate-500 hover:text-slate-300 transition">
        Neustart
      </button>
    </div>
  );
}

// ============================================================
// GUT / SCHLECHT GEALTERT
// ============================================================
const VOTE_CATEGORIES = [
  { id: 'gut', label: 'Gut gealtert wie...', image: '/grafiken/gut-gealtert-wine.png', emoji: '🍷' },
  { id: 'schlecht', label: 'Schlecht gealtert wie...', image: '/grafiken/schlecht-gealtert-cheese.png', emoji: '🧀' },
];

function VotingSection() {
  const [votes, setVotes] = useState<Record<string, string>>({});
  const candidates = ['Bartling, Sönke','Esser, Sebastian','Böer, Thomas','Styra, Darius','Fritz, Jochen','Hehl, Boris','Baldus, Markus','Giehl, Stephan'];

  return (
    <div className="space-y-6">
      {VOTE_CATEGORIES.map((cat) => (
        <div key={cat.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex gap-4 items-start mb-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={cat.image} alt={cat.label} fill className="object-cover" sizes="80px" />
            </div>
            <div>
              <h4 className="font-bold text-lg">{cat.emoji} {cat.label}</h4>
              <p className="text-sm text-slate-400">Voting beim Treffen aktiv</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {candidates.map((c) => (
              <button key={c} onClick={() => setVotes((v) => ({...v, [cat.id]: c}))}
                className={`text-sm p-2 rounded text-left transition ${votes[cat.id]===c ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                {votes[cat.id]===c ? '✓ ' : ''}{c.split(', ').reverse().join(' ')}
              </button>
            ))}
          </div>
          {votes[cat.id] && <p className="text-sm text-green-400 mt-2">Dein Vote: {votes[cat.id].split(', ').reverse().join(' ')}</p>}
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
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-400">Frage {current+1} / {quizPersons.length}</span>
        <span className="text-sm text-yellow-400 font-bold">Score: {score}</span>
      </div>
      <div className="space-y-3">
        {person.clues.slice(0, clueIndex+1).map((clue, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="text-pink-400 font-bold text-sm">#{i+1}</span>
            <p className="text-slate-200">{clue}</p>
          </div>
        ))}
      </div>
      {!revealed ? (
        <div className="flex gap-3 flex-wrap">
          {clueIndex < person.clues.length-1 && (
            <button onClick={() => setClueIndex((i) => i+1)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition">
              Noch ein Hinweis...
            </button>
          )}
          <button onClick={() => setRevealed(true)} className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-sm font-bold transition">
            Auflösen!
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-green-900/40 border border-green-600/50 rounded-lg p-4">
            <p className="text-green-400 font-bold text-lg">{person.answer.split(', ').reverse().join(' ')}</p>
          </div>
          <button onClick={() => { setRevealed(false); setClueIndex(0); setCurrent((c) => (c+1)%quizPersons.length); }}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition">
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
  { id: 'success', label: 'Erfolgreichste Karriere', emoji: '🏆' },
  { id: 'changed', label: 'Am meisten verändert', emoji: '🦋' },
  { id: 'unchanged', label: 'Am wenigsten verändert', emoji: '🧊' },
  { id: 'traveler', label: 'Weitest gereist für das Treffen', emoji: '✈️' },
  { id: 'funny', label: 'Lustigste Abizeitung-Geschichte', emoji: '😂' },
  { id: 'surprise', label: 'Größte Überraschung', emoji: '🎊' },
];

function SuperlativesVoting() {
  const [votes, setVotes] = useState<Record<string, string>>({});
  return (
    <div className="space-y-4">
      {SUPERLATIVES.map((sup) => (
        <div key={sup.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h4 className="font-bold mb-2">{sup.emoji} {sup.label}</h4>
          <input type="text" placeholder="Name eingeben..." value={votes[sup.id]||''}
            onChange={(e) => setVotes((v) => ({...v, [sup.id]: e.target.value}))}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500" />
        </div>
      ))}
      <div className="text-center">
        <button className="px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-lg font-bold transition">
          Votes abschicken (coming soon)
        </button>
      </div>
    </div>
  );
}

// ============================================================
// WAS KOSTETE DAS IN DM?
// ============================================================
const DM_ITEMS = [
  { item: 'Big Mac', price: '4,90 DM', hint: 'McDonald\'s' },
  { item: 'Bravo (Heft)', price: '3,50 DM', hint: 'Jugendzeitschrift' },
  { item: 'Kinokarte', price: '10,00 DM', hint: 'Abendkasse' },
  { item: 'Benzin (1L Super)', price: '1,35 DM', hint: 'Tankstelle' },
  { item: 'Bier (0,5L Kneipe)', price: '2,50 DM', hint: 'Gaststätte' },
  { item: 'Zigaretten (20er)', price: '4,50 DM', hint: 'Automatenpreis' },
  { item: 'VHS-Kassette (neu)', price: '29,95 DM', hint: 'Videothek' },
  { item: 'Monatskarte ÖPNV', price: '58,00 DM', hint: 'Studentenkarte' },
  { item: 'Compact Disc (CD)', price: '22,00 DM', hint: 'Musikgeschäft' },
  { item: 'Döner Kebab', price: '2,50 DM', hint: 'Imbiss' },
];

function DmPreisSpiel() {
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = DM_ITEMS[idx];

  const handleReveal = () => {
    setRevealed(true);
    // Parse guess and correct price
    const guessNum = parseFloat(guess.replace(',', '.'));
    const correctNum = parseFloat(current.price.replace(',', '.').replace(' DM', ''));
    if (!isNaN(guessNum) && Math.abs(guessNum - correctNum) <= 0.50) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (idx >= DM_ITEMS.length - 1) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setGuess('');
      setRevealed(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">💰</div>
        <p className="text-2xl font-bold mb-2">Ergebnis: {score} / {DM_ITEMS.length}</p>
        <p className="text-slate-400 mb-4">
          {score >= 8 ? 'Echter 90er-Kenner! 🏆' : score >= 5 ? 'Nicht schlecht! 👍' : 'Die DM ist schon lange her... 😅'}
        </p>
        <button onClick={() => { setIdx(0); setGuess(''); setRevealed(false); setScore(0); setDone(false); }}
          className="px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-lg font-bold transition">
          Nochmal spielen
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-slate-400">
        <span>Frage {idx+1} / {DM_ITEMS.length}</span>
        <span className="text-yellow-400 font-bold">Score: {score}</span>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
        <p className="text-slate-400 text-sm mb-1">{current.hint}</p>
        <h3 className="text-3xl font-black mb-4">{current.item}</h3>
        <p className="text-slate-400 text-sm mb-4">Was hat das 1996 in DM gekostet?</p>
        {!revealed ? (
          <div className="flex gap-2 max-w-xs mx-auto">
            <div className="relative flex-1">
              <input type="text" placeholder="z.B. 4,90" value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key==='Enter' && guess && handleReveal()}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 pr-12" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">DM</span>
            </div>
            <button onClick={handleReveal} disabled={!guess}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-bold transition">
              →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className={`rounded-lg p-4 ${Math.abs(parseFloat(guess.replace(',','.')) - parseFloat(current.price.replace(',','.').replace(' DM',''))) <= 0.50 ? 'bg-green-900/40 border border-green-600/50' : 'bg-red-900/40 border border-red-600/50'}`}>
              <p className="text-2xl font-black">{current.price}</p>
              {guess && (
                <p className={`text-sm mt-1 ${Math.abs(parseFloat(guess.replace(',','.')) - parseFloat(current.price.replace(',','.').replace(' DM',''))) <= 0.50 ? 'text-green-400' : 'text-red-400'}`}>
                  Deine Schätzung: {guess} DM
                  {Math.abs(parseFloat(guess.replace(',','.')) - parseFloat(current.price.replace(',','.').replace(' DM',''))) <= 0.50 ? ' ✓ Treffer!' : ' ✗'}
                </p>
              )}
            </div>
            <button onClick={handleNext} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition">
              Nächstes →
            </button>
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
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * DUDA_QUOTES.length));
  const [animating, setAnimating] = useState(false);

  const next = () => {
    setAnimating(true);
    setTimeout(() => {
      setIdx(Math.floor(Math.random() * DUDA_QUOTES.length));
      setAnimating(false);
    }, 200);
  };

  const q = DUDA_QUOTES[idx];

  return (
    <div className="space-y-6">
      <div className={`bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-600/40 rounded-2xl p-8 text-center transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-5xl mb-4">📖</div>
        <blockquote className="text-xl font-semibold text-white leading-relaxed mb-4 italic">
          {q.quote}
        </blockquote>
        <p className="text-indigo-300 text-sm">— {q.person}</p>
      </div>
      <div className="text-center space-y-3">
        <button onClick={next} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold transition">
          🎲 Neuer Spruch
        </button>
        <p className="text-slate-500 text-xs">{idx+1} / {DUDA_QUOTES.length} Perlen der Abizeitung</p>
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
  { then: 'Brief schreiben und 3 Tage warten', now: 'WhatsApp — gesendet, gelesen, 2 Minuten später antworten', emoji: '✉️' },
  { then: 'Fotoentwicklung: 2 Wochen warten', now: 'Foto fertig in 0,1 Sek., sofort teilen', emoji: '📸' },
  { then: 'Schulaufgabe: Bibliothek, Karteikasten', now: 'ChatGPT / Claude in 3 Sekunden', emoji: '🤖' },
  { then: 'Berliner Mauer seit 7 Jahren weg', now: '30 Jahre nach der Wende', emoji: '🏛️' },
  { then: 'Bundesliga gucken: TV oder Zeitung am nächsten Tag', now: 'Live-Stream, Highlights in 2 Min., Statistiken in Echtzeit', emoji: '⚽' },
];

function FlipCards() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-slate-400 text-sm mb-4">Tippe auf eine Karte zum Umdrehen.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FLIP_CARDS.map((card, i) => (
          <button key={i} onClick={() => toggle(i)}
            className={`p-5 rounded-xl border text-left transition-all ${flipped.has(i) ? 'bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border-cyan-500/50' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}>
            <div className="flex gap-3 items-start">
              <span className="text-2xl flex-shrink-0">{card.emoji}</span>
              <div>
                {!flipped.has(i) ? (
                  <div>
                    <p className="text-xs text-yellow-400 font-bold mb-1">1996</p>
                    <p className="text-sm text-slate-200">{card.then}</p>
                    <p className="text-xs text-slate-600 mt-2">→ Umdrehen für 2026</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-cyan-400 font-bold mb-1">2026</p>
                    <p className="text-sm text-white">{card.now}</p>
                    <p className="text-xs text-slate-600 mt-2">← Zurück zu 1996</p>
                  </div>
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
  { artist: 'Alanis Morissette', title: 'Ironic', year: 1996 },
  { artist: 'Oasis', title: 'Wonderwall', year: 1995 },
  { artist: 'Coolio', title: "Gangsta's Paradise", year: 1995 },
  { artist: 'Macarena', title: 'Los Del Rio', year: 1996 },
  { artist: 'Spice Girls', title: 'Wannabe', year: 1996 },
];

function KassettenMixtape() {
  const [songs, setSongs] = useState(PRESET_SONGS);
  const [input, setInput] = useState({ artist: '', title: '' });

  const addSong = () => {
    if (!input.artist || !input.title) return;
    setSongs((prev) => [...prev, { ...input, year: 1996 }]);
    setInput({ artist: '', title: '' });
  };

  const totalMin = songs.length * 4; // ~4min per song

  return (
    <div className="space-y-5">
      {/* Tape visual */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-2 border-slate-600 rounded-2xl p-5">
        <div className="flex gap-3 items-center mb-4">
          <div className="text-4xl">📼</div>
          <div>
            <p className="font-black text-lg">Marienstatt Reunion Mix 2026</p>
            <p className="text-sm text-slate-400">{songs.length} Tracks · ~{totalMin} Minuten · Side A</p>
          </div>
        </div>
        {/* Tape reels */}
        <div className="flex gap-4 justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center text-slate-600 font-black">▶</div>
          <div className="flex-1 h-2 bg-slate-600 rounded-full self-center" />
          <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center text-slate-600 font-black">▶</div>
        </div>
        {/* Track list */}
        <ol className="space-y-1.5">
          {songs.map((s, i) => (
            <li key={i} className="flex gap-3 items-center text-sm">
              <span className="text-slate-500 w-5 flex-shrink-0">{i+1}.</span>
              <span className="text-white font-medium">{s.title}</span>
              <span className="text-slate-400">—</span>
              <span className="text-slate-400">{s.artist}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Add song */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
        <h4 className="font-bold text-sm text-slate-300">Deinen Song hinzufügen</h4>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Interpret" value={input.artist}
            onChange={(e) => setInput((v) => ({...v, artist: e.target.value}))}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500" />
          <input type="text" placeholder="Titel" value={input.title}
            onChange={(e) => setInput((v) => ({...v, title: e.target.value}))}
            onKeyDown={(e) => e.key==='Enter' && addSong()}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500" />
        </div>
        <button onClick={addSong} disabled={!input.artist || !input.title}
          className="w-full py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-bold text-sm transition">
          + Auf die Kassette
        </button>
      </div>
    </div>
  );
}

// ============================================================
// NOKIA SNAKE
// ============================================================
const CELL = 16;
const COLS = 20;
const ROWS = 15;

type Pt = [number, number];
type Dir = 'UP'|'DOWN'|'LEFT'|'RIGHT';

function NokiaSnake() {
  const [snake, setSnake] = useState<Pt[]>([[10, 7],[9, 7],[8, 7]]);
  const [food, setFood] = useState<Pt>([15, 7]);
  const [dir, setDir] = useState<Dir>('RIGHT');
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  const dirRef = useRef<Dir>('RIGHT');
  const snakeRef = useRef<Pt[]>([[10,7],[9,7],[8,7]]);
  const foodRef = useRef<Pt>([15,7]);
  const runningRef = useRef(false);

  const newFood = useCallback((s: Pt[]): Pt => {
    let f: Pt;
    do {
      f = [Math.floor(Math.random()*COLS), Math.floor(Math.random()*ROWS)];
    } while (s.some(([x,y]) => x===f[0] && y===f[1]));
    return f;
  }, []);

  const reset = useCallback(() => {
    const s: Pt[] = [[10,7],[9,7],[8,7]];
    const f: Pt = [15,7];
    snakeRef.current = s;
    foodRef.current = f;
    dirRef.current = 'RIGHT';
    setSnake(s);
    setFood(f);
    setDir('RIGHT');
    setDead(false);
    setScore(0);
    setRunning(false);
    runningRef.current = false;
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = { ArrowUp:'UP', ArrowDown:'DOWN', ArrowLeft:'LEFT', ArrowRight:'RIGHT', w:'UP', s:'DOWN', a:'LEFT', d:'RIGHT' };
      const opposite: Record<Dir, Dir> = { UP:'DOWN', DOWN:'UP', LEFT:'RIGHT', RIGHT:'LEFT' };
      if (map[e.key] && map[e.key] !== opposite[dirRef.current]) {
        dirRef.current = map[e.key];
        setDir(map[e.key]);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!running) return;
    const tick = setInterval(() => {
      const s = snakeRef.current;
      const [hx, hy] = s[0];
      const dmap: Record<Dir,[number,number]> = { UP:[0,-1], DOWN:[0,1], LEFT:[-1,0], RIGHT:[1,0] };
      const [dx, dy] = dmap[dirRef.current];
      const nx = hx+dx, ny = hy+dy;
      if (nx<0||nx>=COLS||ny<0||ny>=ROWS||s.some(([x,y])=>x===nx&&y===ny)) {
        clearInterval(tick);
        runningRef.current = false;
        setRunning(false);
        setDead(true);
        setHighscore((h) => Math.max(h, score + (snakeRef.current.length-3)*10));
        return;
      }
      const [fx, fy] = foodRef.current;
      const ate = nx===fx && ny===fy;
      const newSnake: Pt[] = [[nx,ny], ...s.slice(0, ate ? s.length : s.length-1)];
      snakeRef.current = newSnake;
      if (ate) {
        const nf = newFood(newSnake);
        foodRef.current = nf;
        setFood(nf);
        setScore((sc) => sc + 10);
      }
      setSnake([...newSnake]);
    }, 130);
    return () => clearInterval(tick);
  }, [running, newFood, score]);

  const start = () => {
    if (dead) reset();
    runningRef.current = true;
    setRunning(true);
  };

  const swipe = (d: Dir) => {
    const opposite: Record<Dir, Dir> = { UP:'DOWN', DOWN:'UP', LEFT:'RIGHT', RIGHT:'LEFT' };
    if (d !== opposite[dirRef.current]) { dirRef.current = d; setDir(d); }
  };

  return (
    <div className="space-y-4 flex flex-col items-center">
      {/* Score */}
      <div className="flex gap-8 text-sm">
        <span className="text-slate-400">Score: <span className="text-white font-bold">{score}</span></span>
        <span className="text-slate-400">Best: <span className="text-yellow-400 font-bold">{highscore}</span></span>
      </div>

      {/* Game canvas */}
      <div
        className="relative rounded-lg overflow-hidden border-2 border-green-700"
        style={{ width: COLS*CELL, height: ROWS*CELL, background: '#001100', imageRendering: 'pixelated' }}
      >
        {/* Grid lines */}
        {Array.from({length: COLS}).map((_,x) => (
          <div key={x} className="absolute top-0 bottom-0 border-r border-green-900/20" style={{left: x*CELL}} />
        ))}
        {/* Food */}
        <div className="absolute rounded-full bg-red-500" style={{ left: food[0]*CELL+2, top: food[1]*CELL+2, width: CELL-4, height: CELL-4 }} />
        {/* Snake */}
        {snake.map(([x,y], i) => (
          <div key={`${x}-${y}-${i}`} className={`absolute rounded-sm ${i===0 ? 'bg-green-400' : 'bg-green-600'}`}
            style={{ left: x*CELL+1, top: y*CELL+1, width: CELL-2, height: CELL-2 }} />
        ))}
        {/* Overlay */}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
            {dead ? (
              <>
                <p className="text-red-400 font-black text-xl mb-1">GAME OVER</p>
                <p className="text-white text-sm mb-3">Score: {score}</p>
              </>
            ) : (
              <p className="text-green-400 font-black text-lg mb-3">NOKIA SNAKE</p>
            )}
            <button onClick={start} className="px-5 py-2 bg-green-600 hover:bg-green-500 rounded font-bold text-sm transition">
              {dead ? 'Nochmal' : 'Start'}
            </button>
          </div>
        )}
      </div>

      {/* Touch controls */}
      <div className="grid grid-cols-3 gap-1 w-32">
        <div />
        <button onClick={() => swipe('UP')} className="bg-slate-700 hover:bg-slate-600 rounded p-2 text-center text-sm active:bg-slate-500">▲</button>
        <div />
        <button onClick={() => swipe('LEFT')} className="bg-slate-700 hover:bg-slate-600 rounded p-2 text-center text-sm active:bg-slate-500">◄</button>
        <button onClick={() => running && setRunning(false) || (!running && start())} className="bg-slate-800 rounded p-2 text-center text-xs text-slate-500">⏸</button>
        <button onClick={() => swipe('RIGHT')} className="bg-slate-700 hover:bg-slate-600 rounded p-2 text-center text-sm active:bg-slate-500">►</button>
        <div />
        <button onClick={() => swipe('DOWN')} className="bg-slate-700 hover:bg-slate-600 rounded p-2 text-center text-sm active:bg-slate-500">▼</button>
        <div />
      </div>
      <p className="text-xs text-slate-600">Tastatur: WASD oder Pfeiltasten</p>
    </div>
  );
}

// ============================================================
// WER HAT'S GESAGT? LEHRER-EDITION
// ============================================================
const LEHRER_QUOTES = [
  {
    quote: '"Das ist in Ihrer Laufbahn hier das Dümmste, was ich je gehört habe."',
    options: ['Fritzinger (Bio)', 'Gerthold (Deutsch)', 'Schönberger (Mathe)', 'Albert (Deutsch)'],
    answer: 'Gerthold (Deutsch)',
    context: 'Klassiker bei Aufsatz-Besprechungen'
  },
  {
    quote: '"Setzen Sie sich hin und denken Sie nach. Wenn Ihnen etwas einfällt, melden Sie sich."',
    options: ['Schönberger (Mathe)', 'Fritzinger (Bio)', 'Heß (Sport)', 'Gerthold (Deutsch)'],
    answer: 'Schönberger (Mathe)',
    context: 'Mathe-Stunde, Tafel-Aufgabe'
  },
  {
    quote: '"In meinem Unterricht wird nicht geflüstert — laut geredet oder gar nicht."',
    options: ['Albert (Deutsch)', 'Fritzinger (Bio)', 'Schwärzel (Kunst)', 'Heß (Sport)'],
    answer: 'Fritzinger (Bio)',
    context: 'Bio-LK, 1. Stunde nach den Ferien'
  },
  {
    quote: '"Wenn das Ihr Ernst ist, besorge ich Ihnen einen Therapieplatz."',
    options: ['Gerthold (Deutsch)', 'Albert (Deutsch)', 'Schönberger (Mathe)', 'Fritzinger (Bio)'],
    answer: 'Albert (Deutsch)',
    context: 'Gedicht-Interpretation ging... schief'
  },
  {
    quote: '"Ich gebe Ihnen die Note, und Sie sind froh, dass ich Ihnen die Note gebe."',
    options: ['Schönberger (Mathe)', 'Gerthold (Deutsch)', 'Fritzinger (Bio)', 'Heß (Sport)'],
    answer: 'Schönberger (Mathe)',
    context: 'Klausurrückgabe'
  },
];

function LehrerQuiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string|null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = LEHRER_QUOTES[idx];

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s+1);
  };

  const handleNext = () => {
    if (idx >= LEHRER_QUOTES.length-1) { setDone(true); return; }
    setIdx((i) => i+1);
    setSelected(null);
  };

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎓</div>
        <p className="text-2xl font-bold mb-2">Ergebnis: {score} / {LEHRER_QUOTES.length}</p>
        <p className="text-slate-400 mb-4">
          {score===LEHRER_QUOTES.length ? 'Du hast aufgepasst! 🏆' : score>=3 ? 'Gute Erinnerungen! 👍' : 'Die Lehrer waren doch austauschbar... 😅'}
        </p>
        <button onClick={() => { setIdx(0); setSelected(null); setScore(0); setDone(false); }}
          className="px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-lg font-bold transition">
          Nochmal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-slate-400">
        <span>Zitat {idx+1} / {LEHRER_QUOTES.length}</span>
        <span className="text-yellow-400 font-bold">Score: {score}</span>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-5">
        <blockquote className="text-xl font-semibold text-white italic leading-relaxed border-l-4 border-pink-500 pl-4">
          {q.quote}
        </blockquote>
        <p className="text-slate-400 text-sm font-medium">Wer hat das gesagt?</p>
        <div className="grid grid-cols-1 gap-2">
          {q.options.map((opt) => {
            let cls = 'bg-slate-700 text-slate-300 hover:bg-slate-600';
            if (selected) {
              if (opt === q.answer) cls = 'bg-green-700 text-white';
              else if (opt === selected) cls = 'bg-red-800 text-white';
              else cls = 'bg-slate-800 text-slate-600';
            }
            return (
              <button key={opt} onClick={() => handleSelect(opt)}
                className={`p-3 rounded-lg text-sm text-left transition font-medium ${cls}`}>
                {opt}
              </button>
            );
          })}
        </div>
        {selected && (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 italic">Kontext: {q.context}</p>
            <button onClick={handleNext} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm font-bold transition">
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
  { id: 'bingo', label: '🎯 Bingo' },
  { id: 'voting', label: '🍷 Gut/Schlecht' },
  { id: 'quiz', label: '🕵️ Wer bin ich?' },
  { id: 'superlatives', label: '🏆 Superlative' },
  { id: 'dm', label: '💰 DM-Preise' },
  { id: 'duda', label: '📖 Duda-Sprüche' },
  { id: 'flip', label: '🔄 1996 vs 2026' },
  { id: 'mixtape', label: '📼 Mixtape' },
  { id: 'snake', label: '🐍 Nokia Snake' },
  { id: 'lehrer', label: '🎓 Lehrer-Quiz' },
];

const TAB_TITLES: Record<string, { h: string; sub: string }> = {
  bingo: { h: 'Reunion Bingo', sub: 'Tippe auf ein Feld wenn es passiert. Reihe, Spalte oder Diagonale gewinnt!' },
  voting: { h: 'Gut gealtert / Schlecht gealtert', sub: 'Wie guter Wein oder reifer Käse — wer hat sich wie entwickelt?' },
  quiz: { h: 'Wer bin ich?', sub: 'Errate die Person. Weniger Hinweise = mehr Punkte!' },
  superlatives: { h: 'Superlative 2026', sub: 'Nominiere für die Jahrgangssuperlative.' },
  dm: { h: 'Was kostete das in DM?', sub: 'Schätze die alten Preise — ±50 Pfennig gilt als Treffer!' },
  duda: { h: 'Duda-Spruch-Generator', sub: 'Perlen aus der Abizeitung 1996. Immer noch Gold.' },
  flip: { h: '1996 vs. 2026', sub: 'Tippe um die Karte umzudrehen — von damals zu heute.' },
  mixtape: { h: 'Kassetten-Mixtape', sub: 'Die Playlist des Jahrgangs. Füge deinen Song hinzu.' },
  snake: { h: 'Nokia Snake', sub: 'WASD / Pfeiltasten oder Touch-Buttons. Highscore schlagen!' },
  lehrer: { h: 'Wer hat\'s gesagt? Lehrer-Edition', sub: 'Erkennst du noch, welcher Lehrer das gesagt hat?' },
};

export default function SpielePage() {
  const [tab, setTab] = useState('bingo');
  const t = TAB_TITLES[tab];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
            Spiele &amp; Voting
          </h1>
          <p className="text-slate-400">Für das Treffen am 12./13. Juni 2026</p>
        </div>

        {/* Tab bar — horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap flex-shrink-0 ${
                tab===t.id ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">{t.h}</h2>
          <p className="text-slate-400 text-sm">{t.sub}</p>
        </div>

        {/* Tab content */}
        {tab === 'bingo' && <BingoGame />}
        {tab === 'voting' && <VotingSection />}
        {tab === 'quiz' && <WerBinIchQuiz />}
        {tab === 'superlatives' && <SuperlativesVoting />}
        {tab === 'dm' && <DmPreisSpiel />}
        {tab === 'duda' && <DudaSpruchGenerator />}
        {tab === 'flip' && <FlipCards />}
        {tab === 'mixtape' && <KassettenMixtape />}
        {tab === 'snake' && <NokiaSnake />}
        {tab === 'lehrer' && <LehrerQuiz />}
      </div>
    </main>
  );
}
