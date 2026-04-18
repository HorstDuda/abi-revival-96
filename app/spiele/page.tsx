'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { quizPersons } from '@/app/data/alumni';

/* ── Shared style helpers ──────────────────────────────── */
const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  padding: '1.5rem',
} as const;

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '0.65rem 0.9rem',
  color: '#F1F0EF',
  fontSize: '0.88rem',
  outline: 'none',
} as const;

const btnPrimary = {
  background: 'linear-gradient(135deg, #F59E0B, #FB7185)',
  color: '#080808',
  border: 'none',
  borderRadius: '100px',
  padding: '0.6rem 1.4rem',
  fontWeight: '700',
  fontSize: '0.85rem',
  cursor: 'pointer',
} as const;

const btnGhost = {
  background: 'rgba(255,255,255,0.07)',
  color: 'rgba(241,240,239,0.7)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '100px',
  padding: '0.55rem 1.2rem',
  fontWeight: '600',
  fontSize: '0.82rem',
  cursor: 'pointer',
} as const;

/* ============================================================ BINGO */
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
  'Jemand schläft ein','"Bis 2056!"','Heulen beim Klassenfotos',
];

function BingoGame() {
  const [marked, setMarked] = useState<Set<number>>(new Set([10]));
  const [bingo, setBingo] = useState(false);

  const toggle = (i: number) => {
    if (i === 10) return;
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      // Check bingo
      for (let r=0;r<5;r++) if ([0,1,2,3,4].every(c=>next.has(r*5+c))) { setBingo(true); return next; }
      for (let c=0;c<5;c++) if ([0,1,2,3,4].every(r=>next.has(r*5+c))) { setBingo(true); return next; }
      if ([0,6,12,18,24].every(i=>next.has(i))) { setBingo(true); return next; }
      if ([4,8,12,16,20].every(i=>next.has(i))) { setBingo(true); return next; }
      setBingo(false);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {bingo && (
        <div style={{ background: 'linear-gradient(135deg, #F59E0B, #FB7185)', color: '#080808', fontWeight: '900', fontSize: '1.5rem', textAlign: 'center', padding: '0.75rem', borderRadius: '12px', animation: 'bounceIn 0.4s ease-out' }}>
          🎉 BINGO! 🎉
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px' }}>
        {BINGO_SQUARES.map((sq, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            style={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.62rem',
              fontWeight: '500',
              padding: '4px',
              borderRadius: '8px',
              lineHeight: 1.25,
              textAlign: 'center',
              border: 'none',
              cursor: i === 10 ? 'default' : 'pointer',
              transition: 'all 0.15s',
              background: marked.has(i)
                ? i === 10 ? 'linear-gradient(135deg, #F59E0B, #FB7185)' : 'rgba(245,158,11,0.3)'
                : 'rgba(255,255,255,0.05)',
              color: marked.has(i)
                ? i === 10 ? '#080808' : '#F59E0B'
                : 'rgba(241,240,239,0.7)',
              border: marked.has(i) ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.07)',
            } as React.CSSProperties}
          >
            {sq}
          </button>
        ))}
      </div>
      <button onClick={() => { setMarked(new Set([10])); setBingo(false); }} style={btnGhost}>
        Neustart
      </button>
    </div>
  );
}

/* ============================================================ GUT/SCHLECHT */
const VOTE_CATEGORIES = [
  { id: 'gut',     label: 'Gut gealtert wie...',     image: '/grafiken/gut-gealtert-wine.png',    emoji: '🍷' },
  { id: 'schlecht',label: 'Schlecht gealtert wie...', image: '/grafiken/schlecht-gealtert-cheese.png', emoji: '🧀' },
];
const CANDIDATES = ['Bartling, Sönke','Esser, Sebastian','Böer, Thomas','Styra, Darius','Fritz, Jochen','Hehl, Boris','Baldus, Markus','Giehl, Stephan'];

function VotingSection() {
  const [votes, setVotes] = useState<Record<string, string>>({});
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {VOTE_CATEGORIES.map((cat) => (
        <div key={cat.id} style={card}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ position: 'relative', width: 64, height: 64, borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
              <Image src={cat.image} alt={cat.label} fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <h4 style={{ fontWeight: '700', color: '#F1F0EF', marginBottom: '2px' }}>{cat.emoji} {cat.label}</h4>
              <p style={{ fontSize: '0.78rem', color: 'rgba(241,240,239,0.4)' }}>Voting beim Treffen aktiv</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {CANDIDATES.map((c) => (
              <button key={c} onClick={() => setVotes((v) => ({ ...v, [cat.id]: c }))}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: votes[cat.id] === c ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                  color: votes[cat.id] === c ? '#F59E0B' : 'rgba(241,240,239,0.7)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: votes[cat.id] === c ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.07)',
                } as React.CSSProperties}
              >
                {votes[cat.id] === c ? '✓ ' : ''}{c.split(', ').reverse().join(' ')}
              </button>
            ))}
          </div>
          {votes[cat.id] && (
            <p style={{ marginTop: '10px', fontSize: '0.82rem', color: '#34D399' }}>
              Dein Vote: {votes[cat.id].split(', ').reverse().join(' ')}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================ WER BIN ICH */
function WerBinIchQuiz() {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [clueIndex, setClueIndex] = useState(0);
  const [score, setScore] = useState(0);
  const person = quizPersons[current];

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '0.78rem', color: 'rgba(241,240,239,0.4)' }}>Frage {current+1} / {quizPersons.length}</span>
        <span style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: '700' }}>Score: {score}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {person.clues.slice(0, clueIndex+1).map((clue, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '0.78rem', flexShrink: 0 }}>#{i+1}</span>
            <p style={{ color: 'rgba(241,240,239,0.85)', fontSize: '0.9rem' }}>{clue}</p>
          </div>
        ))}
      </div>
      {!revealed ? (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {clueIndex < person.clues.length - 1 && (
            <button onClick={() => setClueIndex(i => i+1)} style={btnGhost}>Noch ein Hinweis…</button>
          )}
          <button onClick={() => setRevealed(true)} style={btnPrimary}>Auflösen!</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '12px', padding: '1rem' }}>
            <p style={{ color: '#34D399', fontWeight: '700', fontSize: '1.1rem' }}>{person.answer.split(', ').reverse().join(' ')}</p>
          </div>
          <button onClick={() => { setRevealed(false); setClueIndex(0); setCurrent(c => (c+1) % quizPersons.length); setScore(s => s+1); }} style={btnGhost}>
            Nächste Person →
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================ SUPERLATIVE */
const SUPERLATIVES = [
  { id: 'success', label: 'Erfolgreichste Karriere', emoji: '🏆' },
  { id: 'changed', label: 'Am meisten verändert', emoji: '🦋' },
  { id: 'unchanged', label: 'Am wenigsten verändert', emoji: '🧊' },
  { id: 'traveler', label: 'Weitest gereist', emoji: '✈️' },
  { id: 'funny', label: 'Lustigste Abizeitung-Geschichte', emoji: '😂' },
  { id: 'surprise', label: 'Größte Überraschung', emoji: '🎊' },
];

function SuperlativesVoting() {
  const [votes, setVotes] = useState<Record<string, string>>({});
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {SUPERLATIVES.map((sup) => (
        <div key={sup.id} style={card}>
          <h4 style={{ fontWeight: '700', marginBottom: '0.6rem', color: '#F1F0EF' }}>{sup.emoji} {sup.label}</h4>
          <input type="text" placeholder="Name eingeben…" value={votes[sup.id] || ''}
            onChange={(e) => setVotes(v => ({ ...v, [sup.id]: e.target.value }))}
            style={inputStyle} />
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <button style={btnPrimary}>Votes abschicken (coming soon)</button>
      </div>
    </div>
  );
}

/* ============================================================ DM PREISE */
const DM_ITEMS = [
  { item: 'Big Mac', price: '4,90 DM', hint: "McDonald's" },
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
  const correct = parseFloat(current.price.replace(',', '.').replace(' DM', ''));
  const guessNum = parseFloat(guess.replace(',', '.'));
  const hit = !isNaN(guessNum) && Math.abs(guessNum - correct) <= 0.5;

  if (done) return (
    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>💰</div>
      <p style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '0.5rem' }}>{score} / {DM_ITEMS.length}</p>
      <p style={{ color: 'rgba(241,240,239,0.5)', marginBottom: '1.5rem' }}>
        {score >= 8 ? 'Echter 90er-Kenner! 🏆' : score >= 5 ? 'Nicht schlecht! 👍' : 'Die DM ist schon lange her... 😅'}
      </p>
      <button onClick={() => { setIdx(0); setGuess(''); setRevealed(false); setScore(0); setDone(false); }} style={btnPrimary}>
        Nochmal spielen
      </button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(241,240,239,0.4)' }}>
        <span>Frage {idx+1} / {DM_ITEMS.length}</span>
        <span style={{ color: '#F59E0B', fontWeight: '700' }}>Score: {score}</span>
      </div>
      <div style={{ ...card, textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', color: 'rgba(241,240,239,0.35)', marginBottom: '0.4rem' }}>{current.hint}</p>
        <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>{current.item}</h3>
        <p style={{ fontSize: '0.82rem', color: 'rgba(241,240,239,0.4)', marginBottom: '1.25rem' }}>Was hat das 1996 in DM gekostet?</p>
        {!revealed ? (
          <div style={{ display: 'flex', gap: '8px', maxWidth: '240px', margin: '0 auto' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input type="text" placeholder="z.B. 4,90" value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && guess && setRevealed(true)}
                style={{ ...inputStyle, paddingRight: '2.5rem' }} />
              <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(241,240,239,0.4)', fontSize: '0.82rem', fontWeight: '700' }}>DM</span>
            </div>
            <button onClick={() => setRevealed(true)} disabled={!guess}
              style={{ ...btnPrimary, padding: '0.6rem 1rem', opacity: guess ? 1 : 0.3 }}>→</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ borderRadius: '12px', padding: '1rem', background: hit ? 'rgba(52,211,153,0.1)' : 'rgba(251,113,133,0.1)', border: `1px solid ${hit ? 'rgba(52,211,153,0.3)' : 'rgba(251,113,133,0.3)'}` }}>
              <p style={{ fontSize: '1.75rem', fontWeight: '900' }}>{current.price}</p>
              {guess && <p style={{ fontSize: '0.82rem', color: hit ? '#34D399' : '#FB7185', marginTop: '4px' }}>
                Deine Schätzung: {guess} DM {hit ? '✓ Treffer!' : '✗'}
              </p>}
            </div>
            <button onClick={() => { if (hit) setScore(s=>s+1); if (idx>=DM_ITEMS.length-1) setDone(true); else { setIdx(i=>i+1); setGuess(''); setRevealed(false); }}} style={btnGhost}>
              Nächstes →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================ DUDA SPRÜCHE */
const DUDA_QUOTES = [
  { quote: '"Von Genialität bis zum Wahnsinn ist es nur ein kleiner Schritt."', person: 'Über Sönke Bartling' },
  { quote: '"200 cm Unsinn, aber im richtigen Moment."', person: 'Gerthold über Bartling' },
  { quote: '"Also in Australien war das ganz anders..."', person: 'Sebastian Esser, obligatorisch' },
  { quote: '"Ihr müßt mir nicht zuhöhren!"', person: 'Jochen Fritz zum Publikum' },
  { quote: '"Old Mac Jochen has a farm — E-I-E-I-O!"', person: 'Jochen Fritz, Alleinunterhalter' },
  { quote: '"Gell, wir sind Freunde!"', person: 'Jochen Fritz' },
  { quote: '"Das Bartling-Syndrom: Wenn Chaos auf Genie trifft."', person: 'Abizeitung 1996' },
  { quote: '"Die Farbe seiner Winterjacke tut einem in den Augen weh."', person: 'Über Sebastian Esser' },
  { quote: '"Redet wie eine Schnecke läuft."', person: 'Über Sebastian Esser' },
  { quote: '"Er ließ die (Meer-)Sau raus."', person: 'Über Jochen Fritz' },
  { quote: '"ob blond ob schwarz ob rot ob braun — Jochen Fritz liebt alle Fraun"', person: 'Abizeitung 1996' },
  { quote: '"Zentrum des Chaos"', person: 'Über Sönke Bartling' },
  { quote: '"Dudist — von Genialität und Wahnsinn."', person: 'Abizeitung 1996' },
];

function DudaSpruchGenerator() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * DUDA_QUOTES.length));
  const [animating, setAnimating] = useState(false);

  const next = () => {
    setAnimating(true);
    setTimeout(() => { setIdx(Math.floor(Math.random() * DUDA_QUOTES.length)); setAnimating(false); }, 200);
  };
  const q = DUDA_QUOTES[idx];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        ...card,
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(129,140,248,0.08), rgba(251,113,133,0.06))',
        border: '1px solid rgba(129,140,248,0.2)',
        opacity: animating ? 0 : 1,
        transition: 'opacity 0.2s',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
        <blockquote style={{ fontSize: '1.1rem', fontWeight: '600', fontStyle: 'italic', color: '#F1F0EF', lineHeight: 1.6, marginBottom: '1rem' }}>
          {q.quote}
        </blockquote>
        <p style={{ fontSize: '0.82rem', color: 'rgba(129,140,248,0.8)' }}>— {q.person}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={next} style={{ ...btnPrimary, padding: '0.75rem 2rem', fontSize: '0.92rem' }}>🎲 Neuer Spruch</button>
        <p style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'rgba(241,240,239,0.25)' }}>{idx+1} / {DUDA_QUOTES.length} Perlen</p>
      </div>
    </div>
  );
}

/* ============================================================ FLIP CARDS */
const FLIP_CARDS = [
  { then: '56k Modem — 30 Sek. einwählen', now: '1 Gbit/s Glasfaser — sofort', emoji: '🌐' },
  { then: 'Floppy Disk: 1,44 MB', now: 'MicroSD: 1 TB (700.000× mehr)', emoji: '💾' },
  { then: 'Nokia 1610 — Snake, kein Foto', now: 'iPhone 17 — KI, 4K-Video, AR', emoji: '📱' },
  { then: 'Videothek: VHS ausleihen', now: 'Netflix — alles sofort', emoji: '🎬' },
  { then: 'Straßenkarte falten', now: 'Google Maps spricht mit dir', emoji: '🗺️' },
  { then: 'Brief: 3 Tage warten', now: 'WhatsApp — 2 Minuten', emoji: '✉️' },
  { then: 'Fotoentwicklung: 2 Wochen', now: 'Foto fertig in 0,1 Sek.', emoji: '📸' },
  { then: 'Hausaufgabe: Bibliothek', now: 'Claude / ChatGPT: 3 Sekunden', emoji: '🤖' },
];

function FlipCards() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setFlipped(prev => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; });

  return (
    <div>
      <p style={{ fontSize: '0.78rem', color: 'rgba(241,240,239,0.35)', marginBottom: '1rem' }}>Tippe zum Umdrehen — 1996 vs. 2026</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '8px' }}>
        {FLIP_CARDS.map((fc, i) => (
          <button key={i} onClick={() => toggle(i)}
            style={{
              padding: '1rem',
              borderRadius: '12px',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: flipped.has(i) ? 'rgba(129,140,248,0.12)' : 'rgba(255,255,255,0.05)',
              borderWidth: '1px', borderStyle: 'solid',
              borderColor: flipped.has(i) ? 'rgba(129,140,248,0.3)' : 'rgba(255,255,255,0.08)',
            } as React.CSSProperties}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{fc.emoji}</span>
              <div>
                {!flipped.has(i) ? (
                  <>
                    <p style={{ fontSize: '0.65rem', color: '#F59E0B', fontWeight: '700', marginBottom: '3px' }}>1996</p>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(241,240,239,0.8)' }}>{fc.then}</p>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(241,240,239,0.25)', marginTop: '4px' }}>→ Umdrehen für 2026</p>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: '0.65rem', color: '#818CF8', fontWeight: '700', marginBottom: '3px' }}>2026</p>
                    <p style={{ fontSize: '0.82rem', color: '#F1F0EF' }}>{fc.now}</p>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(241,240,239,0.25)', marginTop: '4px' }}>← Zurück zu 1996</p>
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

/* ============================================================ MIXTAPE */
const PRESET_SONGS = [
  { artist: 'Alanis Morissette', title: 'Ironic' },
  { artist: 'Oasis', title: 'Wonderwall' },
  { artist: 'Coolio', title: "Gangsta's Paradise" },
  { artist: 'Los Del Rio', title: 'Macarena' },
  { artist: 'Spice Girls', title: 'Wannabe' },
];

function KassettenMixtape() {
  const [songs, setSongs] = useState(PRESET_SONGS);
  const [input, setInput] = useState({ artist: '', title: '' });

  const addSong = () => {
    if (!input.artist || !input.title) return;
    setSongs(prev => [...prev, input]);
    setInput({ artist: '', title: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ ...card, background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '2.5rem' }}>📼</span>
          <div>
            <p style={{ fontWeight: '800', fontSize: '1rem' }}>Marienstatt Reunion Mix 2026</p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(241,240,239,0.4)' }}>{songs.length} Tracks · Side A</p>
          </div>
        </div>
        {/* Reel visual */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#080808', border: '2px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>▶</div>
          <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#080808', border: '2px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>▶</div>
        </div>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {songs.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.82rem' }}>
              <span style={{ color: 'rgba(241,240,239,0.3)', width: '1.25rem', flexShrink: 0 }}>{i+1}.</span>
              <span style={{ color: '#F1F0EF', fontWeight: '600' }}>{s.title}</span>
              <span style={{ color: 'rgba(241,240,239,0.3)' }}>— {s.artist}</span>
            </li>
          ))}
        </ol>
      </div>
      <div style={card}>
        <p style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.75rem', color: 'rgba(241,240,239,0.7)' }}>Deinen Song hinzufügen</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
          <input type="text" placeholder="Interpret" value={input.artist}
            onChange={e => setInput(v => ({ ...v, artist: e.target.value }))} style={inputStyle} />
          <input type="text" placeholder="Titel" value={input.title}
            onChange={e => setInput(v => ({ ...v, title: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && addSong()} style={inputStyle} />
        </div>
        <button onClick={addSong} disabled={!input.artist || !input.title}
          style={{ ...btnPrimary, width: '100%', padding: '0.6rem', opacity: (input.artist && input.title) ? 1 : 0.3 }}>
          + Auf die Kassette
        </button>
      </div>
    </div>
  );
}

/* ============================================================ NOKIA SNAKE */
const CELL=16, COLS=20, ROWS=15;
type Pt=[number,number]; type Dir='UP'|'DOWN'|'LEFT'|'RIGHT';

function NokiaSnake() {
  const [snake, setSnake] = useState<Pt[]>([[10,7],[9,7],[8,7]]);
  const [food, setFood] = useState<Pt>([15,7]);
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const dirRef=useRef<Dir>('RIGHT');
  const snakeRef=useRef<Pt[]>([[10,7],[9,7],[8,7]]);
  const foodRef=useRef<Pt>([15,7]);

  const newFood = useCallback((s:Pt[]):Pt => {
    let f:Pt;
    do { f=[Math.floor(Math.random()*COLS),Math.floor(Math.random()*ROWS)]; }
    while(s.some(([x,y])=>x===f[0]&&y===f[1]));
    return f;
  },[]);

  const reset = useCallback(()=>{
    const s:Pt[]=[[10,7],[9,7],[8,7]], f:Pt=[15,7];
    snakeRef.current=s; foodRef.current=f; dirRef.current='RIGHT';
    setSnake(s); setFood(f); setDead(false); setScore(0); setRunning(false);
  },[]);

  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{
      const map:Record<string,Dir>={ArrowUp:'UP',ArrowDown:'DOWN',ArrowLeft:'LEFT',ArrowRight:'RIGHT',w:'UP',s:'DOWN',a:'LEFT',d:'RIGHT'};
      const opp:Record<Dir,Dir>={UP:'DOWN',DOWN:'UP',LEFT:'RIGHT',RIGHT:'LEFT'};
      if(map[e.key]&&map[e.key]!==opp[dirRef.current]){dirRef.current=map[e.key];e.preventDefault();}
    };
    window.addEventListener('keydown',h);
    return ()=>window.removeEventListener('keydown',h);
  },[]);

  useEffect(()=>{
    if(!running)return;
    const tick=setInterval(()=>{
      const s=snakeRef.current;
      const [hx,hy]=s[0];
      const dm:Record<Dir,[number,number]>={UP:[0,-1],DOWN:[0,1],LEFT:[-1,0],RIGHT:[1,0]};
      const [dx,dy]=dm[dirRef.current];
      const [nx,ny]=[hx+dx,hy+dy];
      if(nx<0||nx>=COLS||ny<0||ny>=ROWS||s.some(([x,y])=>x===nx&&y===ny)){
        clearInterval(tick); setRunning(false); setDead(true);
        setHighscore(h=>Math.max(h,(snakeRef.current.length-3)*10));
        return;
      }
      const [fx,fy]=foodRef.current;
      const ate=nx===fx&&ny===fy;
      const ns:Pt[]=[[nx,ny],...s.slice(0,ate?s.length:s.length-1)];
      snakeRef.current=ns;
      if(ate){const nf=newFood(ns);foodRef.current=nf;setFood(nf);setScore(sc=>sc+10);}
      setSnake([...ns]);
    },130);
    return ()=>clearInterval(tick);
  },[running,newFood]);

  const start=()=>{if(dead)reset();setRunning(true);}
  const swipe=(d:Dir)=>{const opp:Record<Dir,Dir>={UP:'DOWN',DOWN:'UP',LEFT:'RIGHT',RIGHT:'LEFT'};if(d!==opp[dirRef.current])dirRef.current=d;}

  return (
    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem' }}>
      <div style={{ display:'flex',gap:'2rem',fontSize:'0.82rem',color:'rgba(241,240,239,0.5)' }}>
        <span>Score: <strong style={{color:'#F1F0EF'}}>{score}</strong></span>
        <span>Best: <strong style={{color:'#F59E0B'}}>{highscore}</strong></span>
      </div>
      <div style={{ position:'relative',width:COLS*CELL,height:ROWS*CELL,background:'#001100',borderRadius:'8px',border:'2px solid rgba(52,211,153,0.3)',overflow:'hidden' }}>
        <div style={{ position:'absolute',left:food[0]*CELL+2,top:food[1]*CELL+2,width:CELL-4,height:CELL-4,borderRadius:'50%',background:'#FB7185' }} />
        {snake.map(([x,y],i)=>(
          <div key={`${x}-${y}-${i}`} style={{ position:'absolute',left:x*CELL+1,top:y*CELL+1,width:CELL-2,height:CELL-2,borderRadius:'2px',background:i===0?'#34D399':'#22c55e' }} />
        ))}
        {!running&&(
          <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.75)' }}>
            {dead&&<><p style={{color:'#FB7185',fontWeight:'900',fontSize:'1.1rem',marginBottom:'4px'}}>GAME OVER</p><p style={{color:'rgba(241,240,239,0.6)',fontSize:'0.82rem',marginBottom:'10px'}}>Score: {score}</p></>}
            {!dead&&<p style={{color:'#34D399',fontWeight:'900',fontSize:'1rem',marginBottom:'10px'}}>NOKIA SNAKE</p>}
            <button onClick={start} style={btnPrimary}>{dead?'Nochmal':'Start'}</button>
          </div>
        )}
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(3,2.5rem)',gap:'4px' }}>
        <div/><button onClick={()=>swipe('UP')} style={{...btnGhost,padding:'8px',fontSize:'0.9rem'}}>▲</button><div/>
        <button onClick={()=>swipe('LEFT')} style={{...btnGhost,padding:'8px',fontSize:'0.9rem'}}>◄</button>
        <button onClick={()=>running?setRunning(false):start()} style={{...btnGhost,padding:'8px',fontSize:'0.65rem',color:'rgba(241,240,239,0.35)'}}>⏸</button>
        <button onClick={()=>swipe('RIGHT')} style={{...btnGhost,padding:'8px',fontSize:'0.9rem'}}>►</button>
        <div/><button onClick={()=>swipe('DOWN')} style={{...btnGhost,padding:'8px',fontSize:'0.9rem'}}>▼</button><div/>
      </div>
      <p style={{fontSize:'0.7rem',color:'rgba(241,240,239,0.25)'}}>Tastatur: WASD oder Pfeiltasten</p>
    </div>
  );
}

/* ============================================================ LEHRER QUIZ */
const LEHRER_QUOTES = [
  { quote: '"Das ist in Ihrer Laufbahn hier das Dümmste, was ich je gehört habe."', options: ['Fritzinger (Bio)','Gerthold (Deutsch)','Schönberger (Mathe)','Albert (Deutsch)'], answer: 'Gerthold (Deutsch)', context: 'Klassiker bei Aufsatz-Besprechungen' },
  { quote: '"Setzen Sie sich hin und denken Sie nach. Wenn Ihnen etwas einfällt, melden Sie sich."', options: ['Schönberger (Mathe)','Fritzinger (Bio)','Heß (Sport)','Gerthold (Deutsch)'], answer: 'Schönberger (Mathe)', context: 'Mathe-Stunde, Tafel-Aufgabe' },
  { quote: '"In meinem Unterricht wird nicht geflüstert — laut geredet oder gar nicht."', options: ['Albert (Deutsch)','Fritzinger (Bio)','Schwärzel (Kunst)','Heß (Sport)'], answer: 'Fritzinger (Bio)', context: 'Bio-LK, 1. Stunde nach den Ferien' },
  { quote: '"Wenn das Ihr Ernst ist, besorge ich Ihnen einen Therapieplatz."', options: ['Gerthold (Deutsch)','Albert (Deutsch)','Schönberger (Mathe)','Fritzinger (Bio)'], answer: 'Albert (Deutsch)', context: 'Gedicht-Interpretation ging schief' },
  { quote: '"Ich gebe Ihnen die Note, und Sie sind froh, dass ich Ihnen die Note gebe."', options: ['Schönberger (Mathe)','Gerthold (Deutsch)','Fritzinger (Bio)','Heß (Sport)'], answer: 'Schönberger (Mathe)', context: 'Klausurrückgabe' },
];

function LehrerQuiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string|null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = LEHRER_QUOTES[idx];

  const handleSelect=(opt:string)=>{
    if(selected)return;
    setSelected(opt);
    if(opt===q.answer)setScore(s=>s+1);
  };

  const handleNext=()=>{
    if(idx>=LEHRER_QUOTES.length-1){setDone(true);return;}
    setIdx(i=>i+1); setSelected(null);
  };

  if(done)return(
    <div style={{textAlign:'center',padding:'3rem 0'}}>
      <div style={{fontSize:'3.5rem',marginBottom:'1rem'}}>🎓</div>
      <p style={{fontSize:'1.75rem',fontWeight:'900',marginBottom:'0.5rem'}}>{score} / {LEHRER_QUOTES.length}</p>
      <p style={{color:'rgba(241,240,239,0.5)',marginBottom:'1.5rem'}}>{score===LEHRER_QUOTES.length?'Du hast aufgepasst! 🏆':score>=3?'Gute Erinnerungen! 👍':'Die Lehrer waren doch austauschbar... 😅'}</p>
      <button onClick={()=>{setIdx(0);setSelected(null);setScore(0);setDone(false);}} style={btnPrimary}>Nochmal</button>
    </div>
  );

  return(
    <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.78rem',color:'rgba(241,240,239,0.4)'}}>
        <span>Zitat {idx+1} / {LEHRER_QUOTES.length}</span>
        <span style={{color:'#F59E0B',fontWeight:'700'}}>Score: {score}</span>
      </div>
      <div style={card}>
        <blockquote style={{fontSize:'1rem',fontWeight:'600',fontStyle:'italic',lineHeight:1.6,color:'#F1F0EF',borderLeft:'3px solid rgba(245,158,11,0.5)',paddingLeft:'1rem',marginBottom:'1.25rem'}}>
          {q.quote}
        </blockquote>
        <p style={{fontSize:'0.78rem',color:'rgba(241,240,239,0.4)',marginBottom:'0.75rem',fontWeight:'600'}}>Wer hat das gesagt?</p>
        <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
          {q.options.map(opt=>{
            let bg='rgba(255,255,255,0.05)', border='rgba(255,255,255,0.08)', color='rgba(241,240,239,0.7)';
            if(selected){
              if(opt===q.answer){bg='rgba(52,211,153,0.15)';border='rgba(52,211,153,0.4)';color='#34D399';}
              else if(opt===selected){bg='rgba(251,113,133,0.15)';border='rgba(251,113,133,0.4)';color='#FB7185';}
              else{bg='rgba(255,255,255,0.02)';color='rgba(241,240,239,0.3)';}
            }
            return(
              <button key={opt} onClick={()=>handleSelect(opt)}
                style={{padding:'10px 14px',borderRadius:'10px',textAlign:'left',fontSize:'0.85rem',fontWeight:'600',border:'none',cursor:selected?'default':'pointer',transition:'all 0.15s',background:bg,borderWidth:'1px',borderStyle:'solid',borderColor:border,color} as React.CSSProperties}>
                {opt}
              </button>
            );
          })}
        </div>
        {selected&&(
          <div style={{marginTop:'1rem',display:'flex',flexDirection:'column',gap:'8px'}}>
            <p style={{fontSize:'0.72rem',color:'rgba(241,240,239,0.35)',fontStyle:'italic'}}>Kontext: {q.context}</p>
            <button onClick={handleNext} style={btnGhost}>Nächstes Zitat →</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================ MAIN PAGE */
const TABS = [
  { id: 'bingo',       label: '🎯 Bingo',       desc: 'Tippe wenn es passiert' },
  { id: 'voting',      label: '🍷 Gut/Schlecht', desc: 'Wie alter Wein' },
  { id: 'quiz',        label: '🕵️ Wer bin ich?', desc: 'Rate die Person' },
  { id: 'superlatives',label: '🏆 Superlative',  desc: 'Nominiere!' },
  { id: 'dm',          label: '💰 DM-Preise',    desc: 'Was hat das 1996 gekostet?' },
  { id: 'duda',        label: '📖 Duda-Sprüche', desc: 'Perlen der Abizeitung' },
  { id: 'flip',        label: '🔄 1996 vs 2026', desc: 'Vergleiche die Zeiten' },
  { id: 'mixtape',     label: '📼 Mixtape',      desc: 'Die Playlist des Jahrgangs' },
  { id: 'snake',       label: '🐍 Nokia Snake',  desc: 'Classic Game' },
  { id: 'lehrer',      label: '🎓 Lehrer-Quiz',  desc: 'Wer hat das gesagt?' },
];

const TITLES: Record<string, { h: string; sub: string }> = {
  bingo:        { h: 'Reunion Bingo',               sub: 'Reihe, Spalte oder Diagonale = BINGO!' },
  voting:       { h: 'Gut / Schlecht gealtert',     sub: 'Wie guter Wein oder reifer Käse?' },
  quiz:         { h: 'Wer bin ich?',                sub: 'Erraten aus Hinweisen der Abizeitung.' },
  superlatives: { h: 'Superlative 2026',            sub: 'Nominiere für die Jahrgangssuperlative.' },
  dm:           { h: 'Was kostete das in DM?',      sub: '±50 Pfennig gilt als Treffer!' },
  duda:         { h: 'Duda-Spruch-Generator',       sub: 'Perlen aus der Abizeitung 1996.' },
  flip:         { h: '1996 vs. 2026',               sub: 'Tippe um von damals nach heute zu springen.' },
  mixtape:      { h: 'Kassetten-Mixtape',           sub: 'Füge deinen 90er-Song hinzu.' },
  snake:        { h: 'Nokia Snake',                 sub: 'WASD / Pfeiltasten oder Touch.' },
  lehrer:       { h: "Wer hat's gesagt? Lehrer-Ed.", sub: 'Erkennst du noch deine Lehrer?' },
};

export default function SpielePage() {
  const [tab, setTab] = useState('bingo');
  const t = TITLES[tab];

  return (
    <main className="mesh-bg min-h-screen py-16 px-6">
      {/* RETRO HEADER */}
      <div className="retro-show text-center mb-8">
        <h1>SPIELE &amp; VOTING</h1>
        <p>Für das Treffen am 12./13. Juni 2026</p>
        <span className="blink">★ VIEL SPAß! ★</span>
      </div>

      <div className="container mx-auto max-w-2xl">
        {/* MODERN HEADER */}
        <div className="text-center mb-12 retro-hide">
          <p style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Für das Treffen · 12./13. Juni 2026
          </p>
          <h1 className="font-black" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)', background: 'linear-gradient(135deg, #F59E0B, #FB7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
            Spiele &amp; Voting
          </h1>

          {/* Tab strip */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none', justifyContent: 'flex-start' }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '100px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                  background: tab === t.id ? 'linear-gradient(135deg, #F59E0B, #FB7185)' : 'rgba(255,255,255,0.06)',
                  color: tab === t.id ? '#080808' : 'rgba(241,240,239,0.6)',
                  boxShadow: tab === t.id ? '0 4px 20px rgba(245,158,11,0.3)' : 'none',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab header */}
        <div className="retro-hide" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: '700', fontSize: '1.4rem', marginBottom: '4px', color: '#F1F0EF' }}>{t.h}</h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(241,240,239,0.4)' }}>{t.sub}</p>
        </div>

        {/* Game content */}
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

        {/* RETRO game links */}
        <div className="retro-show" style={{ marginTop: '16px' }}>
          <h2>Spiele wählen:</h2>
          {TABS.map((t) => (
            <p key={t.id}><a href="#" onClick={() => setTab(t.id)}>[{t.label}]</a></p>
          ))}
        </div>
      </div>
    </main>
  );
}
