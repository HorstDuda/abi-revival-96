'use client';

import { useState } from 'react';
import Link from 'next/link';
import { alumni } from '@/app/data/alumni';

type Filter = 'all' | 'verified' | 'unclaimed' | 'missing';

function AlumniCard({ person }: { person: (typeof alumni)[0] }) {
  const [writing, setWriting] = useState(false);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const displayName = person.name.split(', ').reverse().join(' ');
  const firstName   = displayName.split(' ')[0];
  const initials    = person.name
    .split(/[,\s]+/)
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');

  const borderColor = person.verified
    ? 'rgba(45,106,79,0.6)'
    : person.missing
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(45,106,79,0.15)';

  const bgColor = person.verified
    ? 'rgba(10,30,15,0.8)'
    : person.missing
    ? 'rgba(0,0,0,0.25)'
    : 'rgba(8,18,8,0.6)';

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-2 transition-all hover:scale-[1.02] backdrop-blur-sm"
      style={{
        border: `1px solid ${borderColor}`,
        background: bgColor,
        opacity: person.missing ? 0.65 : 1,
        boxShadow: person.verified ? '0 0 20px rgba(45,106,79,0.25)' : undefined,
      }}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-lg font-black flex-shrink-0"
        style={
          person.verified
            ? { background: 'linear-gradient(135deg, #2D6A4F, #52b788)', color: 'white' }
            : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }
        }
      >
        {person.verified ? initials : '👤'}
      </div>

      {/* Name */}
      <p className="text-sm font-bold text-center text-white leading-tight">
        {displayName}
        {person.geburtsname && (
          <span className="block text-xs font-normal" style={{ color: 'rgba(255,255,255,0.35)' }}>
            geb. {person.geburtsname}
          </span>
        )}
      </p>

      {person.verified ? (
        <div className="space-y-1 text-center">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full inline-block"
            style={{ background: 'rgba(45,106,79,0.3)', color: '#52b788' }}
          >✓ Verifiziert</span>
          {person.beruf && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{person.beruf}</p>}
          {person.ort   && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>📍 {person.ort}</p>}
          {person.charakteristik && (
            <p className="text-xs italic leading-tight" style={{ color: 'rgba(255,255,255,0.35)' }}>
              &ldquo;{person.charakteristik}&rdquo;
            </p>
          )}
        </div>
      ) : (
        <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.28)' }}>
          {person.missing ? '🔍 Nicht erreicht' : 'Profil nicht beansprucht'}
        </p>
      )}

      {/* Write about */}
      {!person.missing && (
        <div className="mt-auto">
          {submitted ? (
            <p className="text-xs text-center font-bold" style={{ color: '#52b788' }}>✓ Danke!</p>
          ) : writing ? (
            <div className="space-y-1.5">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Was fällt dir zu ${firstName} ein?`}
                className="w-full text-xs rounded-xl px-2 py-1.5 resize-none outline-none"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(232,64,96,0.3)',
                  color: 'white',
                  minHeight: '60px',
                }}
              />
              <div className="flex gap-1">
                <button
                  onClick={() => { if (text.trim()) setSubmitted(true); }}
                  className="flex-1 text-xs py-1 rounded-lg font-bold"
                  style={{ background: '#E84060', color: 'white' }}
                >Senden</button>
                <button
                  onClick={() => { setWriting(false); setText(''); }}
                  className="flex-1 text-xs py-1 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                >✕</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setWriting(true)}
              className="w-full text-xs py-1.5 rounded-xl transition-all"
              style={{
                background: 'rgba(232,64,96,0.12)',
                color: '#E84060',
                border: '1px solid rgba(232,64,96,0.25)',
              }}
            >
              ✍️ Über {firstName} schreiben
            </button>
          )}
        </div>
      )}

      {/* Claim */}
      {!person.verified && !person.missing && !writing && (
        <Link
          href={`/claim?name=${encodeURIComponent(person.name)}`}
          className="text-center text-xs py-1 rounded-xl transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          Beanspruchen →
        </Link>
      )}
    </div>
  );
}

export default function PersonenPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = alumni.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.name.toLowerCase().includes(q) ||
      (a.beruf ?? '').toLowerCase().includes(q) ||
      (a.ort   ?? '').toLowerCase().includes(q);
    const matchFilter =
      filter === 'all'      ? true :
      filter === 'verified' ? a.verified :
      filter === 'missing'  ? a.missing :
      filter === 'unclaimed'? !a.verified && !a.missing : true;
    return matchSearch && matchFilter;
  });

  const counts = {
    all:      alumni.length,
    verified: alumni.filter((a) => a.verified).length,
    missing:  alumni.filter((a) => a.missing).length,
    unclaimed:alumni.filter((a) => !a.verified && !a.missing).length,
  };

  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all',      label: `Alle (${counts.all})` },
    { key: 'verified', label: `✓ Verifiziert (${counts.verified})` },
    { key: 'unclaimed',label: `Offen (${counts.unclaimed})` },
    { key: 'missing',  label: `🔍 Vermisst (${counts.missing})` },
  ];

  return (
    <main className="min-h-screen py-12" style={{ background: 'linear-gradient(160deg, #0a1f0a 0%, #0a0a0a 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1
            className="font-black mb-2 tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#E84060', textShadow: '3px 3px 0px rgba(0,0,0,0.6)' }}
          >
            DIE STUFE
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)' }}>Gymnasium Marienstatt · Abi 1996 · 103 Absolventen</p>
        </div>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suchen nach Name, Beruf, Ort…"
            className="w-full rounded-2xl px-5 py-3 text-white outline-none transition-all"
            style={{ background: 'rgba(10,30,15,0.7)', border: '1px solid rgba(45,106,79,0.3)' }}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={
                filter === f.key
                  ? { background: '#E84060', color: 'white', boxShadow: '0 4px 15px rgba(232,64,96,0.4)' }
                  : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center py-16" style={{ color: 'rgba(255,255,255,0.35)' }}>Keine Personen gefunden.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((a) => <AlumniCard key={a.id} person={a} />)}
          </div>
        )}

        <p className="text-center mt-8 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Name fehlt? → Markus Böer · WhatsApp 0151-58564701
        </p>
      </div>
    </main>
  );
}
