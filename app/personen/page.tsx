'use client';

import { useState, useMemo } from 'react';
import { alumni } from '@/app/data/alumni';

type Alumni = (typeof alumni)[0];

function AlumniFlipCard({
  person,
  isFlipped,
  onFlip,
}: {
  person: Alumni;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const displayName = person.name.split(', ').reverse().join(' ');
  const initials = person.name
    .split(', ')
    .map((p) => p.trim()[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="flip-container cursor-pointer"
      style={{ perspective: '1100px', height: '190px' }}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onFlip()}
      aria-pressed={isFlipped}
    >
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* ── FRONT ── */}
        <div
          className="flip-front flex flex-col items-center justify-center p-4 rounded-xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: person.verified
              ? 'linear-gradient(135deg, rgba(236,72,153,0.18), rgba(124,58,237,0.18))'
              : person.missing
              ? 'rgba(255,255,255,0.02)'
              : 'rgba(255,255,255,0.05)',
            border: person.verified
              ? '1px solid rgba(236,72,153,0.35)'
              : person.missing
              ? '1px solid rgba(255,255,255,0.04)'
              : '1px solid rgba(255,255,255,0.08)',
            opacity: person.missing ? 0.55 : 1,
          }}
        >
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black mb-3 flex-shrink-0"
            style={{
              background: person.verified
                ? 'linear-gradient(135deg, #ec4899, #7c3aed)'
                : person.missing
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(255,255,255,0.08)',
              color: person.verified ? '#fff' : 'rgba(255,255,255,0.4)',
            }}
          >
            {person.missing ? '?' : initials}
          </div>

          {/* Name */}
          <p className="text-sm font-semibold text-center text-white leading-tight">
            {displayName}
          </p>
          {person.geburtsname && (
            <p className="text-[10px] text-white/30 mt-0.5">geb. {person.geburtsname}</p>
          )}

          {/* Status badge */}
          <div className="mt-2 flex flex-col items-center gap-1">
            {person.verified && (
              <span className="text-[10px] font-bold text-pink-400 tracking-wide">✓ VERIFIZIERT</span>
            )}
            {person.missing && (
              <span className="text-[10px] text-yellow-500/70">🔍 Gesucht</span>
            )}
            {!person.verified && !person.missing && (
              <span className="text-[10px] text-white/20 mt-1">Tippen für Details</span>
            )}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-back flex flex-col justify-center p-4 rounded-xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: person.verified
              ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.25))'
              : 'rgba(255,255,255,0.06)',
            border: person.verified
              ? '1px solid rgba(236,72,153,0.4)'
              : '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p className="font-bold text-sm text-white mb-2 leading-tight">{displayName}</p>

          {person.beruf && (
            <p className="text-xs text-white/70 leading-snug mb-1">{person.beruf}</p>
          )}
          {person.ort && (
            <p className="text-xs text-white/45">📍 {person.ort}</p>
          )}
          {person.charakteristik && (
            <p className="text-[10px] text-white/30 italic mt-2 leading-snug line-clamp-2">
              &ldquo;{person.charakteristik}&rdquo;
            </p>
          )}
          {person.missing && (
            <p className="text-xs text-yellow-500/70 mt-1">Noch nicht erreicht</p>
          )}

          {!person.verified && !person.missing && (
            <a
              href={`/claim?name=${encodeURIComponent(person.name)}`}
              onClick={(e) => e.stopPropagation()}
              className="mt-3 block text-center text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all hover:scale-105"
              style={{
                background: 'rgba(236,72,153,0.2)',
                border: '1px solid rgba(236,72,153,0.4)',
                color: '#f9a8d4',
              }}
            >
              Beanspruchen →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function StatPill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div
      className="flex flex-col items-center px-5 py-3 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <span className="text-2xl font-black" style={{ color }}>{value}</span>
      <span className="text-xs text-white/40 mt-0.5 tracking-wide">{label}</span>
    </div>
  );
}

export default function PersonenPage() {
  const [search, setSearch] = useState('');
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const total = alumni.length;
  const verified = alumni.filter((a) => a.verified).length;
  const missing = alumni.filter((a) => a.missing).length;
  const reached = total - missing;

  const filtered = useMemo(() => {
    if (!search.trim()) return alumni;
    const q = search.toLowerCase();
    return alumni.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        (a.beruf && a.beruf.toLowerCase().includes(q)) ||
        (a.ort && a.ort.toLowerCase().includes(q))
    );
  }, [search]);

  const filteredVerified = filtered.filter((a) => a.verified);
  const filteredOthers = filtered.filter((a) => !a.verified && !a.missing);
  const filteredMissing = filtered.filter((a) => a.missing);

  const handleFlip = (id: number) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen relative py-12">
      {/* Orb */}
      <div
        className="orb orb-pink animate-glow"
        style={{ width: 500, height: 500, top: '-10%', right: '-5%', opacity: 0.5 }}
      />

      {/* Retro marquee */}
      <div className="retro-marquee bg-black text-yellow-300 py-1 text-sm font-bold">
        <marquee>★ UNSER JAHRGANG ★ GYMNASIUM MARIENSTATT ABI 1996 ★ KLASSE VON 1996 ★</marquee>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-3">Jahrgangsbuch</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-3">
            <span className="gradient-text">Die Stufe</span>
          </h1>
          <p className="text-white/40 text-sm">Gymnasium Marienstatt · Abi 1996</p>

          {/* Stats */}
          <div className="flex gap-3 justify-center mt-6 flex-wrap">
            <StatPill value={total} label="Gesamt" color="rgba(241,245,249,0.7)" />
            <StatPill value={reached} label="Erreicht" color="#818cf8" />
            <StatPill value={verified} label="Verifiziert" color="#ec4899" />
            <StatPill value={missing} label="Gesucht" color="#f59e0b" />
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/30 flex-shrink-0">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setFlippedId(null); }}
              placeholder="Suche nach Name, Beruf, Ort..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-white/30 hover:text-white/60 transition-colors">
                ×
              </button>
            )}
          </div>
        </div>

        {/* Results count when searching */}
        {search && (
          <p className="text-center text-white/30 text-sm mb-6">
            {filtered.length} Treffer für &ldquo;{search}&rdquo;
          </p>
        )}

        {/* Verified profiles */}
        {filteredVerified.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-bold gradient-text">Verifizierte Profile</h2>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(236,72,153,0.15)', color: '#f9a8d4' }}
              >
                {filteredVerified.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredVerified.map((a) => (
                <AlumniFlipCard
                  key={a.id}
                  person={a}
                  isFlipped={flippedId === a.id}
                  onFlip={() => handleFlip(a.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Unclaimed profiles */}
        {filteredOthers.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-semibold text-white/50">Alle Stufenmitglieder</h2>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(241,245,249,0.4)' }}
              >
                {filteredOthers.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filteredOthers.map((a) => (
                <AlumniFlipCard
                  key={a.id}
                  person={a}
                  isFlipped={flippedId === a.id}
                  onFlip={() => handleFlip(a.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Missing */}
        {filteredMissing.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-semibold text-amber-500/70">Noch nicht erreicht</h2>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(245,158,11,0.12)', color: 'rgba(245,158,11,0.7)' }}
              >
                {filteredMissing.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredMissing.map((a) => (
                <AlumniFlipCard
                  key={a.id}
                  person={a}
                  isFlipped={flippedId === a.id}
                  onFlip={() => handleFlip(a.id)}
                />
              ))}
            </div>
            <p className="text-white/25 text-sm mt-4">
              Kennst du jemanden aus dieser Liste? Kontaktiere Markus Böer über die WhatsApp-Gruppe.
            </p>
          </section>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-semibold">Keine Treffer</p>
            <p className="text-sm mt-1">Versuche einen anderen Suchbegriff</p>
          </div>
        )}
      </div>
    </main>
  );
}
