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

  return (
    <div
      className="bg-white rounded-2xl p-4 flex flex-col gap-2 transition-all hover:shadow-md border"
      style={{
        borderColor: person.verified ? 'rgba(45,106,79,0.25)' : person.missing ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.07)',
        opacity: person.missing ? 0.65 : 1,
      }}
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-base font-black flex-shrink-0"
        style={
          person.verified
            ? { background: 'linear-gradient(135deg, #2D6A4F, #52b788)', color: 'white' }
            : { background: '#f3f4f6', color: '#9ca3af' }
        }
      >
        {person.verified ? initials : '👤'}
      </div>

      {/* Name */}
      <p className="text-sm font-bold text-center text-[#111827] leading-tight">
        {displayName}
        {person.geburtsname && (
          <span className="block text-xs font-normal text-[#9ca3af]">
            geb. {person.geburtsname}
          </span>
        )}
      </p>

      {person.verified ? (
        <div className="space-y-1 text-center">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block bg-[#f0fdf4] text-[#2D6A4F] border border-[#2D6A4F]/20">
            ✓ Verifiziert
          </span>
          {person.beruf && <p className="text-xs text-[#374151]">{person.beruf}</p>}
          {person.ort   && <p className="text-xs text-[#9ca3af]">📍 {person.ort}</p>}
          {person.charakteristik && (
            <p className="text-xs italic leading-tight text-[#9ca3af]">
              &ldquo;{person.charakteristik}&rdquo;
            </p>
          )}
        </div>
      ) : (
        <p className="text-xs text-center text-[#9ca3af]">
          {person.missing ? '🔍 Nicht erreicht' : 'Profil nicht beansprucht'}
        </p>
      )}

      {/* Write about */}
      {!person.missing && (
        <div className="mt-auto">
          {submitted ? (
            <p className="text-xs text-center font-bold text-[#2D6A4F]">✓ Danke!</p>
          ) : writing ? (
            <div className="space-y-1.5">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Was fällt dir zu ${firstName} ein?`}
                className="w-full text-xs rounded-lg px-2 py-1.5 resize-none outline-none border border-black/10 bg-[#f8f9fa] text-[#111827]"
                style={{ minHeight: '56px' }}
              />
              <div className="flex gap-1">
                <button
                  onClick={() => { if (text.trim()) setSubmitted(true); }}
                  className="flex-1 text-xs py-1 rounded-lg font-bold text-white"
                  style={{ background: '#E84060' }}
                >Senden</button>
                <button
                  onClick={() => { setWriting(false); setText(''); }}
                  className="flex-1 text-xs py-1 rounded-lg text-[#6b7280] bg-[#f3f4f6]"
                >✕</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setWriting(true)}
              className="w-full text-xs py-1.5 rounded-lg transition-all border text-[#E84060] border-[#E84060]/25 hover:bg-[#E84060]/5"
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
          className="text-center text-xs py-1 rounded-lg border border-black/[0.07] text-[#9ca3af] hover:text-[#2D6A4F] hover:border-[#2D6A4F]/30 transition-colors"
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
    <main className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="font-black mb-2 tracking-tight text-[#111827]"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
          >
            Die <span style={{ color: '#2D6A4F' }}>Stufe</span>
          </h1>
          <p className="text-[#6b7280]">Gymnasium Marienstatt · Abi 1996 · 103 Absolventen</p>
        </div>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suchen nach Name, Beruf, Ort…"
            className="w-full rounded-xl px-5 py-3 text-[#111827] outline-none bg-white border border-black/[0.08] focus:border-[#2D6A4F]/40 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all border"
              style={
                filter === f.key
                  ? { background: '#2D6A4F', color: 'white', borderColor: '#2D6A4F' }
                  : { background: 'white', color: '#6b7280', borderColor: 'rgba(0,0,0,0.08)' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center py-16 text-[#9ca3af]">Keine Personen gefunden.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((a) => <AlumniCard key={a.id} person={a} />)}
          </div>
        )}

        <p className="text-center mt-8 text-xs text-[#9ca3af]">
          Name fehlt? → Markus Böer · WhatsApp 0151-58564701
        </p>
      </div>
    </main>
  );
}
