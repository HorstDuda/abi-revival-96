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
    setMarked((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };
  const checkBingo = () => {
    for (let r = 0; r < 5; r++) if ([0,1,2,3,4].every((c) => marked.has(r*5+c))) return true;
    for (let c = 0; c < 5; c++) if ([0,1,2,3,4].every((r) => marked.has(r*5+c))) return true;
    if ([0,6,12,18,24].every((i) => marked.has(i))) return true;
    if ([4,8,12,16,20].every((i) => marked.has(i))) return true;
    return false;
  };
  return (
    <div className="space-y-4">
      {checkBingo() && (
        <div className="py-3 rounded-xl text-center font-black text-xl animate-bounce" style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)', color: '#000' }}>
          🎉 BINGO! 🎉
        </div>
      )}
      <div className="grid grid-cols-5 gap-1.5">
        {BINGO_SQUARES.map((sq, i) => (
          <button key={i} onClick={() => toggle(i)}
            className="aspect-square flex items-center justify-center text-[10px] sm:text-xs font-medium p-1 rounded-lg text-center transition-all leading-tight"
            style={{
              background: marked.has(i) ? (i===10 ? 'linear-gradient(135deg,#f59e0b,#f97316)' : 'linear-gradient(135deg,#ec4899,#7c3aed)') : 'rgba(255,255,255,0.06)',
              border: '1px solid ' + (marked.has(i) ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'),
              color: marked.has(i) ? '#fff' : 'rgba(241,245,249,0.5)',
              transform: marked.has(i) && i!==10 ? 'scale(0.95)' : 'scale(1)',
            }}>
            {sq}
          </button>
        ))}
      </div>
      <button onClick={() => setMarked(new Set([10]))} className="text-xs text-white/30 hover:text-white/60 transition-colors">
        Neustart
      </button>
    </div>
  );
}

// ============================================================
// VOTING
// ============================================================
const VOTE_CATEGORIES = [
  { id: 'gut', label: 'Gut gealtert wie...', image: '/grafiken/gut-gealtert-wine.png', emoji: '🍷', color: '#10b981' },
  { id: 'schlecht', label: 'Schlecht gealtert wie...', image: '/grafiken/schlecht-gealtert-cheese.png', emoji: '🧀', color: '#f59e0b' },
];
const CANDIDATES = ['Bartling, Sönke','Esser, Sebastian','Böer, Thomas','Styra, Darius','Fritz, Jochen','Hehl, Boris','Baldus, Markus','Giehl, Stephan'];

function VotingSection() {
  const [votes, setVotes] = useState<Record<string,string>>({});
  return (
    <div className="space-y-6">
      {VOTE_CATEGORIES.map((cat) => (
        <div key={cat.id} className="rounded-xl p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex gap-4 items-start">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={cat.image} alt={cat.label} fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <h4 className="font-bold text-base">{cat.emoji} {cat.label}</h4>
              <p className="text-xs text-white/40 mt-0.5">Voting beim Treffen aktiv</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CANDIDATES.map((c) => {
              const sel = votes[cat.id]===c;
              return (
                <button key={c} onClick={() => setVotes((v) => ({...v,[cat.id]:c}))}
                  className="text-sm p-2.5 rounded-lg text-left transition-all"
                  style={{
                    background: sel ? `rgba(${cat.id==='gut'?'16,185,129':'245,158,11'},0.2)` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${sel ? cat.color+'66' : 'rgba(255,255,255,0.07)'}`,
                    color: sel ? '#fff' : 'rgba(241,245,249,0.6)',
                    fontWeight: sel ? 700 : 400,
                  }}>
                  {sel ? '✓ ' : ''}{c.split(', ').reverse().join(' ')}
                </button>
              );
            })}
          </div>
          {votes[cat.id] && <p className="text-xs font-semibold" style={{ color: cat.color }}>Dein Vote: {votes[cat.id].split(', ').reverse().join(' ')}</p>}
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-white/40">Frage {current+1} / {quizPersons.length}</span>
        <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>Score: {score}</span>
      </div>
      <div className="rounded-xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {person.clues.slice(0, clueIndex+1).map((clue, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="text-xs font-bold text-pink-500 mt-0.5">#{i+1}</span>
            <p className="text-sm text-white/80">{clue}</p>
          </div>
        ))}
      </div>
      {!revealed ? (
        <div className="flex gap-3 flex-wrap">
          {clueIndex < person.clues.length-1 && (
            <button onClick={() => setClueIndex((i)=>i+1)} className="px-4 py-2 rounded-lg text-sm transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(241,245,249,0.7)' }}>
              Noch ein Hinweis...
            </button>
          )}
          <button onClick={() => setRevealed(true)} className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: '#fff' }}>
            Auflösen!
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-lg p-4" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <p className="font-bold text-lg" style={{ color: '#6ee7b7' }}>{person.answer.split(', ').reverse().join(' ')}</p>
          </div>
          <button onClick={() => { setRevealed(false); setClueIndex(0); setCurrent((c)=>(c+1)%quizPersons.length); }} className="px-4 py-2 rounded-lg text-sm transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(241,245,249,0.7)' }}>
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
  const [votes, setVotes] = useState<Record<string,string>>({});
  return (
    <div className="space-y-3">
      {SUPERLATIVES.map((sup) => (
        <div key={sup.id} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h4 className="font-semibold text-sm mb-2">{sup.emoji} {sup.label}</h4>
          <input type="text" placeholder="Name eingeben..." value={votes[sup.id]||''}
            onChange={(e) => setVotes((v) => ({...v,[sup.id]:e.target.value}))}
            className="w-full text-sm text-white placeholder-white/25 outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' }} />
        </div>
      ))}
      <div className="text-center pt-2">
        <button className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: '#fff' }}>
          Votes abschicken (coming soon)
        </button>
      </div>
    </div>
  );
}

// ============================================================
// DM PREISE
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
  const isClose = () => { const g = parseFloat(guess.replace(',','.')); const c = parseFloat(current.price.replace(',','.').replace(' DM','')); return !isNaN(g) && Math.abs(g-c)<=0.5; };
  const handleReveal = () => { setRevealed(true); if (isClose()) setScore((s)=>s+1); };
  const handleNext = () => { if (idx>=DM_ITEMS.length-1) { setDone(true); return; } setIdx((i)=>i+1); setGuess(''); setRevealed(false); };
  if (done) return (
    <div className="text-center py-8">
      <div className="text-5xl mb-4">💰</div>
      <p className="text-2xl font-bold mb-2">Ergebnis: {score} / {DM_ITEMS.length}</p>
      <p className="text-white/50 mb-6">{score>=8?'Echter 90er-Kenner! 🏆':score>=5?'Nicht schlecht! 👍':'Die DM ist schon lange her... 😅'}</p>
      <button onClick={() => { setIdx(0); setGuess(''); setRevealed(false); setScore(0); setDone(false); }} className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: '#fff' }}>
        Nochmal spielen
      </button>
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm"><span className="text-white/40">Frage {idx+1}/{DM_ITEMS.length}</span><span className="font-bold" style={{ color: '#f59e0b' }}>Score: {score}</span></div>
      <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-white/40 text-xs mb-1">{current.hint}</p>
        <h3 className="text-3xl font-black mb-4">{current.item}</h3>
        <p className="text-white/40 text-sm mb-5">Was hat das 1996 in DM gekostet?</p>
        {!revealed ? (
          <div className="flex gap-2 max-w-xs mx-auto">
            <div className="relative flex-1">
              <input type="text" placeholder="z.B. 4,90" value={guess} onChange={(e)=>setGuess(e.target.value)} onKeyDown={(e)=>e.key==='Enter'&&guess&&handleReveal()}
                className="w-full text-white placeholder-white/25 outline-none pr-10 py-2.5 pl-3 text-sm"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.625rem' }} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs font-bold">DM</span>
            </div>
            <button onClick={handleReveal} disabled={!guess} className="px-4 py-2.5 rounded-lg font-bold transition-all hover:scale-105 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: '#fff' }}>→</button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-xl p-4" style={{ background: isClose()?'rgba(16,185,129,0.12)':'rgba(239,68,68,0.12)', border: `1px solid ${isClose()?'rgba(16,185,129,0.3)':'rgba(239,68,68,0.3)'}` }}>
              <p className="text-2xl font-black">{current.price}</p>
              <p className="text-sm mt-1" style={{ color: isClose()?'#6ee7b7':'#fca5a5' }}>Deine Schätzung: {guess} DM {isClose()?'✓ Treffer!':'✗'}</p>
            </div>
            <button onClick={handleNext} className="px-5 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(241,245,249,0.7)' }}>Nächstes →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// DUDA SPRÜCHE
// ============================================================
const DUDA_QUOTES = [
  { quote: '"Von Genialität bis zum Wahnsinn ist es nur ein kleiner Schritt."', person: 'Über Sönke Bartling' },
  { quote: '"200 cm Unsinn, aber im richtigen Moment."', person: 'Zitat: Gerthold über Bartling' },
  { quote: '"Also in Australien war das ganz anders..."', person: 'Sebastian Esser, obligatorisch' },
  { quote: '"Ihr müßt mir nicht zuhöhren!"', person: 'Jochen Fritz zum Publikum' },
  { quote: '"Old Mac Jochen has a farm — E-I-E-I-O!"', person: 'Jochen Fritz, Alleinunterhalter' },
  { quote: '"Gell, wir sind Freunde!"', person: 'Jochen Fritz' },
  { quote: '"Das Bartling-Syndrom: Wenn Chaos auf Genie trifft."', person: 'Abizeitung 1996' },
  { quote: '"Die Farbe seiner Winterjacke tut einem in den Augen weh."', person: 'Über Sebastian Esser' },
  { quote: '"Er ließ die (Meer-)Sau raus."', person: 'Über Jochen Fritz' },
  { quote: '"Wenn er erzählt, bleibt kein Auge trocken."', person: 'Über Jochen Fritz' },
  { quote: '"ob blond ob schwarz ob rot ob braun — Jochen Fritz liebt alle Frau\'n"', person: 'Abizeitung 1996' },
  { quote: '"Zentrum des Chaos"', person: 'Über Sönke Bartling' },
  { quote: '"Dudist — von Genialität und Wahnsinn."', person: 'Abizeitung 1996' },
];

function DudaSpruchGenerator() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random()*DUDA_QUOTES.length));
  const [anim, setAnim] = useState(false);
  const next = () => { setAnim(true); setTimeout(() => { setIdx(Math.floor(Math.random()*DUDA_QUOTES.length)); setAnim(false); }, 220); };
  const q = DUDA_QUOTES[idx];
  return (
    <div className="space-y-6">
      <div className={`rounded-2xl p-8 text-center transition-opacity duration-200 ${anim?'opacity-0':'opacity-100'}`}
        style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(124,58,237,0.2))', border: '1px solid rgba(99,102,241,0.25)' }}>
        <div className="text-4xl mb-4">📖</div>
        <blockquote className="text-lg sm:text-xl font-semibold text-white leading-relaxed mb-4 italic">{q.quote}</blockquote>
        <p className="text-indigo-300 text-sm">— {q.person}</p>
      </div>
      <div className="text-center space-y-2">
        <button onClick={next} className="px-8 py-3 rounded-xl font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', color: '#fff' }}>
          🎲 Neuer Spruch
        </button>
        <p className="text-white/25 text-xs">{idx+1} / {DUDA_QUOTES.length} Perlen der Abizeitung</p>
      </div>
    </div>
  );
}

// ============================================================
// FLIP CARDS 1996 vs 2026
// ============================================================
const FLIP_CARDS_DATA = [
  { then: '56k Modem — "Einwählen" dauert 30 Sek.', now: '1 Gbit/s Glasfaser — überall, sofort', emoji: '🌐' },
  { then: 'Floppy Disk: 1,44 MB', now: 'MicroSD: 1 TB (700.000× mehr)', emoji: '💾' },
  { then: 'Nokia 1610 — Snake, kein Foto', now: 'iPhone — KI, 4K-Video, AR', emoji: '📱' },
  { then: 'Videothek: VHS ausleihen, zurückbringen', now: 'Netflix, Disney+, Spotify — alles sofort', emoji: '🎬' },
  { then: 'Straßenkarte falten können war Pflicht', now: 'Google Maps sagt "In 200m links"', emoji: '🗺️' },
  { then: 'Brief schreiben und 3 Tage warten', now: 'WhatsApp — gesendet, gelesen, 2 Minuten', emoji: '✉️' },
  { then: 'Fotoentwicklung: 2 Wochen warten', now: 'Foto fertig in 0,1 Sek., sofort teilen', emoji: '📸' },
  { then: 'Schulaufgabe: Bibliothek, Karteikasten', now: 'ChatGPT / Claude in 3 Sekunden', emoji: '🤖' },
];

function FlipCardsGame() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setFlipped((p) => { const n = new Set(p); n.has(i)?n.delete(i):n.add(i); return n; });
  return (
    <div className="space-y-2">
      <p className="text-white/40 text-sm mb-4">Tippe auf eine Karte zum Umdrehen.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FLIP_CARDS_DATA.map((card, i) => (
          <button key={i} onClick={() => toggle(i)} className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
            style={{
              background: flipped.has(i) ? 'linear-gradient(135deg,rgba(6,182,212,0.15),rgba(99,102,241,0.15))' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${flipped.has(i)?'rgba(6,182,212,0.35)':'rgba(255,255,255,0.08)'}`,
            }}>
            <div className="flex gap-3 items-start">
              <span className="text-2xl flex-shrink-0">{card.emoji}</span>
              <div>
                {!flipped.has(i) ? (
                  <>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: '#f59e0b' }}>1996</p>
                    <p className="text-sm text-white/70">{card.then}</p>
                    <p className="text-[10px] text-white/25 mt-2">→ Tippen für 2026</p>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: '#22d3ee' }}>2026</p>
                    <p className="text-sm text-white">{card.now}</p>
                    <p className="text-[10px] text-white/25 mt-2">← Zurück zu 1996</p>
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
// KASSETTEN MIXTAPE
// ============================================================
const PRESET_SONGS = [
  { artist: 'Alanis Morissette', title: 'Ironic', year: 1996 },
  { artist: 'Oasis', title: 'Wonderwall', year: 1995 },
  { artist: 'Coolio', title: "Gangsta's Paradise", year: 1995 },
  { artist: 'Los Del Rio', title: 'Macarena', year: 1996 },
  { artist: 'Spice Girls', title: 'Wannabe', year: 1996 },
];

function KassettenMixtape() {
  const [songs, setSongs] = useState(PRESET_SONGS);
  const [input, setInput] = useState({ artist: '', title: '' });
  const addSong = () => { if (!input.artist || !input.title) return; setSongs((p) => [...p, {...input, year: 1996}]); setInput({artist:'',title:''}); };
  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg,rgba(30,30,30,0.8),rgba(20,20,20,0.8))', border: '2px solid rgba(255,255,255,0.1)' }}>
        <div className="flex gap-3 items-center mb-4">
          <div className="text-3xl">📼</div>
          <div>
            <p className="font-black text-base">Marienstatt Reunion Mix 2026</p>
            <p className="text-xs text-white/40">{songs.length} Tracks · ~{songs.length*4} Min · Side A</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-white/30" style={{ background: '#111', border: '2px solid rgba(255,255,255,0.1)' }}>▶</div>
          <div className="flex-1 h-1 rounded-full self-center" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-white/30" style={{ background: '#111', border: '2px solid rgba(255,255,255,0.1)' }}>▶</div>
        </div>
        <ol className="space-y-1.5">
          {songs.map((s, i) => (
            <li key={i} className="flex gap-3 items-center text-sm">
              <span className="text-white/25 w-4 flex-shrink-0 text-right">{i+1}.</span>
              <span className="text-white font-medium">{s.title}</span>
              <span className="text-white/25 text-xs">—</span>
              <span className="text-white/50 text-xs">{s.artist}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h4 className="text-sm font-semibold text-white/60">Deinen Song hinzufügen</h4>
        <div className="grid grid-cols-2 gap-2">
          {(['artist','title'] as const).map((k) => (
            <input key={k} type="text" placeholder={k==='artist'?'Interpret':'Titel'} value={input[k]}
              onChange={(e) => setInput((v) => ({...v,[k]:e.target.value}))}
              onKeyDown={(e) => e.key==='Enter'&&addSong()}
              className="text-sm text-white placeholder-white/25 outline-none px-3 py-2"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }} />
          ))}
        </div>
        <button onClick={addSong} disabled={!input.artist||!input.title} className="w-full py-2 rounded-lg text-sm font-bold transition-all hover:scale-105 disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg,#f97316,#f59e0b)', color: '#000' }}>
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
  const [snake, setSnake] = useState<Pt[]>([[10,7],[9,7],[8,7]]);
  const [food, setFood] = useState<Pt>([15,7]);
  const [dir, setDir] = useState<Dir>('RIGHT');
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const dirRef = useRef<Dir>('RIGHT');
  const snakeRef = useRef<Pt[]>([[10,7],[9,7],[8,7]]);
  const foodRef = useRef<Pt>([15,7]);
  const newFood = useCallback((s: Pt[]): Pt => { let f: Pt; do { f = [Math.floor(Math.random()*COLS), Math.floor(Math.random()*ROWS)]; } while (s.some(([x,y])=>x===f[0]&&y===f[1])); return f; }, []);
  const reset = useCallback(() => { const s: Pt[] = [[10,7],[9,7],[8,7]]; const f: Pt = [15,7]; snakeRef.current=s; foodRef.current=f; dirRef.current='RIGHT'; setSnake(s); setFood(f); setDir('RIGHT'); setDead(false); setScore(0); setRunning(false); }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { const m: Record<string,Dir>={ArrowUp:'UP',ArrowDown:'DOWN',ArrowLeft:'LEFT',ArrowRight:'RIGHT',w:'UP',s:'DOWN',a:'LEFT',d:'RIGHT'}; const opp: Record<Dir,Dir>={UP:'DOWN',DOWN:'UP',LEFT:'RIGHT',RIGHT:'LEFT'}; if(m[e.key]&&m[e.key]!==opp[dirRef.current]){dirRef.current=m[e.key];setDir(m[e.key]);e.preventDefault();} };
    window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h);
  }, []);
  useEffect(() => {
    if (!running) return;
    const tick = setInterval(() => {
      const s=snakeRef.current; const [hx,hy]=s[0]; const dm: Record<Dir,[number,number]>={UP:[0,-1],DOWN:[0,1],LEFT:[-1,0],RIGHT:[1,0]}; const [dx,dy]=dm[dirRef.current]; const nx=hx+dx,ny=hy+dy;
      if(nx<0||nx>=COLS||ny<0||ny>=ROWS||s.some(([x,y])=>x===nx&&y===ny)){clearInterval(tick);setRunning(false);setDead(true);setHighscore((h)=>Math.max(h,score+(snakeRef.current.length-3)*10));return;}
      const [fx,fy]=foodRef.current; const ate=nx===fx&&ny===fy; const ns: Pt[]=[[nx,ny],...s.slice(0,ate?s.length:s.length-1)]; snakeRef.current=ns;
      if(ate){const nf=newFood(ns);foodRef.current=nf;setFood(nf);setScore((sc)=>sc+10);}
      setSnake([...ns]);
    }, 130);
    return ()=>clearInterval(tick);
  }, [running, newFood, score]);
  const start = () => { if(dead)reset(); setTimeout(()=>{setRunning(true);},10); };
  const swipe = (d: Dir) => { const opp: Record<Dir,Dir>={UP:'DOWN',DOWN:'UP',LEFT:'RIGHT',RIGHT:'LEFT'}; if(d!==opp[dirRef.current]){dirRef.current=d;setDir(d);} };
  return (
    <div className="space-y-4 flex flex-col items-center">
      <div className="flex gap-8 text-sm"><span className="text-white/40">Score: <span className="text-white font-bold">{score}</span></span><span className="text-white/40">Best: <span className="font-bold" style={{color:'#f59e0b'}}>{highscore}</span></span></div>
      <div className="relative rounded-xl overflow-hidden" style={{width:COLS*CELL,height:ROWS*CELL,background:'#001100',border:'2px solid rgba(0,180,0,0.4)'}}>
        <div className="absolute rounded-full bg-red-500" style={{left:food[0]*CELL+2,top:food[1]*CELL+2,width:CELL-4,height:CELL-4}} />
        {snake.map(([x,y],i)=>(
          <div key={`${x}-${y}-${i}`} className="absolute rounded-sm" style={{left:x*CELL+1,top:y*CELL+1,width:CELL-2,height:CELL-2,background:i===0?'#4ade80':'#16a34a'}} />
        ))}
        {!running&&(
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{background:'rgba(0,0,0,0.75)'}}>
            {dead?<><p className="font-black text-xl mb-1" style={{color:'#f87171'}}>GAME OVER</p><p className="text-white text-sm mb-3">Score: {score}</p></>:<p className="font-black text-lg mb-3" style={{color:'#4ade80'}}>NOKIA SNAKE</p>}
            <button onClick={start} className="px-5 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105" style={{background:'#16a34a',color:'#fff'}}>{dead?'Nochmal':'Start'}</button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1 w-28">
        <div/><button onClick={()=>swipe('UP')} className="p-2 rounded text-sm text-center hover:bg-white/10 transition-colors" style={{background:'rgba(255,255,255,0.07)'}}>▲</button><div/>
        <button onClick={()=>swipe('LEFT')} className="p-2 rounded text-sm text-center hover:bg-white/10 transition-colors" style={{background:'rgba(255,255,255,0.07)'}}>◄</button>
        <button onClick={()=>running?setRunning(false):start()} className="p-2 rounded text-xs text-center" style={{background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.3)'}}>⏸</button>
        <button onClick={()=>swipe('RIGHT')} className="p-2 rounded text-sm text-center hover:bg-white/10 transition-colors" style={{background:'rgba(255,255,255,0.07)'}}>►</button>
        <div/><button onClick={()=>swipe('DOWN')} className="p-2 rounded text-sm text-center hover:bg-white/10 transition-colors" style={{background:'rgba(255,255,255,0.07)'}}>▼</button><div/>
      </div>
      <p className="text-xs text-white/20">WASD oder Pfeiltasten · Touch-Controls oben</p>
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
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string|null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = LEHRER_QUOTES[idx];
  const handle = (opt: string) => { if(selected)return; setSelected(opt); if(opt===q.answer)setScore((s)=>s+1); };
  const next = () => { if(idx>=LEHRER_QUOTES.length-1){setDone(true);return;} setIdx((i)=>i+1); setSelected(null); };
  if (done) return (
    <div className="text-center py-8">
      <div className="text-5xl mb-4">🎓</div>
      <p className="text-2xl font-bold mb-2">Ergebnis: {score} / {LEHRER_QUOTES.length}</p>
      <p className="text-white/40 mb-6">{score===LEHRER_QUOTES.length?'Du hast aufgepasst! 🏆':score>=3?'Gute Erinnerungen! 👍':'Die Lehrer waren doch austauschbar... 😅'}</p>
      <button onClick={()=>{setIdx(0);setSelected(null);setScore(0);setDone(false);}} className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105" style={{background:'linear-gradient(135deg,#ec4899,#7c3aed)',color:'#fff'}}>Nochmal</button>
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm"><span className="text-white/40">Zitat {idx+1}/{LEHRER_QUOTES.length}</span><span className="font-bold" style={{color:'#f59e0b'}}>Score: {score}</span></div>
      <div className="rounded-xl p-5 space-y-4" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
        <blockquote className="text-lg font-semibold text-white italic leading-relaxed" style={{borderLeft:'3px solid #ec4899',paddingLeft:'1rem'}}>
          {q.quote}
        </blockquote>
        <p className="text-sm text-white/40 font-medium">Wer hat das gesagt?</p>
        <div className="grid grid-cols-1 gap-2">
          {q.options.map((opt) => {
            let bg = 'rgba(255,255,255,0.06)'; let border = 'rgba(255,255,255,0.08)'; let color = 'rgba(241,245,249,0.7)';
            if (selected) { if(opt===q.answer){bg='rgba(16,185,129,0.18)';border='rgba(16,185,129,0.4)';color='#6ee7b7';} else if(opt===selected){bg='rgba(239,68,68,0.15)';border='rgba(239,68,68,0.3)';color='#fca5a5';} else{color='rgba(241,245,249,0.25)';} }
            return <button key={opt} onClick={()=>handle(opt)} className="p-3 rounded-lg text-sm text-left font-medium transition-all" style={{background:bg,border:`1px solid ${border}`,color}}>{opt}</button>;
          })}
        </div>
        {selected && (
          <div className="space-y-2">
            <p className="text-xs text-white/30 italic">Kontext: {q.context}</p>
            <button onClick={next} className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style={{background:'rgba(255,255,255,0.08)',color:'rgba(241,245,249,0.7)'}}>Nächstes Zitat →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TABS CONFIG
// ============================================================
const TABS = [
  { id: 'bingo',       icon: '🎯', label: 'Bingo',         desc: 'Reunion-Bingo' },
  { id: 'voting',      icon: '🍷', label: 'Gut/Schlecht',  desc: 'Wer ist wie gealtert?' },
  { id: 'quiz',        icon: '🕵️', label: 'Wer bin ich?',  desc: 'Errate die Person' },
  { id: 'superlatives',icon: '🏆', label: 'Superlative',   desc: 'Nominiere' },
  { id: 'dm',          icon: '💰', label: 'DM-Preise',     desc: 'Was kostete das?' },
  { id: 'duda',        icon: '📖', label: 'Duda-Sprüche',  desc: 'Abizeitung Perlen' },
  { id: 'flip',        icon: '🔄', label: '1996 vs 2026',  desc: 'Die Veränderungen' },
  { id: 'mixtape',     icon: '📼', label: 'Mixtape',       desc: 'Kassette zusammenstellen' },
  { id: 'snake',       icon: '🐍', label: 'Nokia Snake',   desc: 'Highscore schlagen' },
  { id: 'lehrer',      icon: '🎓', label: 'Lehrer-Quiz',   desc: 'Wer hat das gesagt?' },
];

const TITLES: Record<string, { h: string; sub: string }> = {
  bingo:        { h: 'Reunion Bingo',               sub: 'Tippe auf ein Feld wenn es passiert. Reihe oder Spalte gewinnt!' },
  voting:       { h: 'Gut gealtert / Schlecht gealtert', sub: 'Wie guter Wein oder reifer Käse — wer hat sich wie entwickelt?' },
  quiz:         { h: 'Wer bin ich?',                sub: 'Errate die Person aus Hinweisen. Weniger Hinweise = cooler.' },
  superlatives: { h: 'Superlative 2026',            sub: 'Nominiere für die Jahrgangssuperlative.' },
  dm:           { h: 'Was kostete das in DM?',      sub: 'Schätze die alten Preise — ±50 Pfennig gilt als Treffer!' },
  duda:         { h: 'Duda-Spruch-Generator',       sub: 'Perlen aus der Abizeitung 1996. Immer noch Gold.' },
  flip:         { h: '1996 vs. 2026',               sub: 'Tippe auf eine Karte — von damals zu heute.' },
  mixtape:      { h: 'Kassetten-Mixtape',           sub: 'Die Playlist des Jahrgangs. Füge deinen Song hinzu.' },
  snake:        { h: 'Nokia Snake',                 sub: 'WASD / Pfeiltasten oder Touch. Highscore schlagen!' },
  lehrer:       { h: "Wer hat's gesagt? Lehrer-Edition", sub: 'Erkennst du noch, welcher Lehrer das gesagt hat?' },
};

export default function SpielePage() {
  const [tab, setTab] = useState('bingo');
  const t = TITLES[tab];
  const currentTab = TABS.find((x) => x.id === tab);

  return (
    <main className="min-h-screen py-12 relative">
      {/* Orbs */}
      <div className="orb orb-violet animate-glow" style={{width:400,height:400,top:'-5%',left:'-5%',opacity:0.4}} />
      <div className="orb orb-pink animate-glow delay-400" style={{width:350,height:350,bottom:'5%',right:'-5%',opacity:0.3}} />

      {/* Retro marquee */}
      <div className="retro-marquee bg-green-500 text-black py-1 text-sm font-bold">
        <marquee>★ SPIELE & VOTING ★ BINGO ★ NOKIA SNAKE ★ WER BIN ICH ★ KASSETTEN-MIXTAPE ★</marquee>
      </div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-3">Spieleabend</p>
          <h1 className="text-5xl font-black tracking-tighter mb-2">
            <span className="gradient-text">Spiele</span>
            <span className="text-white/20"> &amp; </span>
            <span className="gradient-text-cool">Voting</span>
          </h1>
          <p className="text-white/40 text-sm">Für das Treffen am 12./13. Juni 2026</p>
        </div>

        {/* Tab bar — app icons style */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none -mx-1 px-1">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all hover:scale-105"
                style={{
                  background: active ? 'linear-gradient(135deg,rgba(236,72,153,0.25),rgba(124,58,237,0.25))' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? 'rgba(236,72,153,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  minWidth: 72,
                }}>
                <span className="text-xl">{t.icon}</span>
                <span className="text-[10px] font-semibold whitespace-nowrap" style={{ color: active ? '#f9a8d4' : 'rgba(241,245,249,0.4)' }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active game header */}
        <div className="mb-6 flex items-center gap-3">
          {currentTab && <span className="text-3xl">{currentTab.icon}</span>}
          <div>
            <h2 className="text-xl font-bold text-white">{t.h}</h2>
            <p className="text-sm text-white/40">{t.sub}</p>
          </div>
        </div>

        {/* Game content */}
        <div className="animate-fade-in">
          {tab === 'bingo'        && <BingoGame />}
          {tab === 'voting'       && <VotingSection />}
          {tab === 'quiz'         && <WerBinIchQuiz />}
          {tab === 'superlatives' && <SuperlativesVoting />}
          {tab === 'dm'           && <DmPreisSpiel />}
          {tab === 'duda'         && <DudaSpruchGenerator />}
          {tab === 'flip'         && <FlipCardsGame />}
          {tab === 'mixtape'      && <KassettenMixtape />}
          {tab === 'snake'        && <NokiaSnake />}
          {tab === 'lehrer'       && <LehrerQuiz />}
        </div>
      </div>
    </main>
  );
}
