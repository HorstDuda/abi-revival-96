'use client';

import { useState, useMemo } from 'react';
import { alumni } from '@/app/data/alumni';

type Person = (typeof alumni)[0];

function getInitials(name: string) {
  return name.split(',').map((p) => p.trim()[0]).join('');
}

function PersonCard({ person, index }: { person: Person; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const initials = getInitials(person.name);
  const displayName = person.name.split(', ').reverse().join(' ');

  return (
    <div
      className="flip-card cursor-pointer"
      style={{
        height: '200px',
        animationDelay: `${index * 0.04}s`,
      }}
      onClick={() => setFlipped((f) => !f)}
      title={flipped ? 'Zurückdrehen' : 'Mehr Info'}
    >
      <div className={`flip-card-inner rounded-2xl${flipped ? ' flipped' : ''}`}>
        {/* FRONT */}
        <div
          className="flip-card-front rounded-2xl flex flex-col items-center justify-center p-4 text-center transition-all"
          style={{
            background: person.verified
              ? 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(251,113,133,0.08))'
              : person.missing
              ? 'rgba(255,255,255,0.02)'
              : 'rgba(255,255,255,0.04)',
            border: person.verified
              ? '1px solid rgba(245,158,11,0.3)'
              : person.missing
              ? '1px solid rgba(255,255,255,0.04)'
              : '1px solid rgba(255,255,255,0.08)',
            boxShadow: person.verified
              ? '0 0 30px rgba(245,158,11,0.15), inset 0 0 30px rgba(245,158,11,0.03)'
              : 'none',
            opacity: person.missing ? 0.45 : 1,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.1rem',
              marginBottom: '0.75rem',
              flexShrink: 0,
              background: person.verified
                ? 'linear-gradient(135deg, #F59E0B, #FB7185)'
                : 'rgba(255,255,255,0.08)',
              color: person.verified ? '#080808' : 'rgba(241,240,239,0.35)',
              boxShadow: person.verified ? '0 4px 20px rgba(245,158,11,0.4)' : 'none',
            }}
          >
            {person.verified ? initials : '?'}
          </div>

          {/* Name */}
          <p style={{ fontWeight: '600', fontSize: '0.85rem', lineHeight: 1.3, color: '#F1F0EF' }}>
            {displayName}
          </p>
          {person.geburtsname && (
            <p style={{ fontSize: '0.7rem', color: 'rgba(241,240,239,0.3)', marginTop: '2px' }}>
              geb. {person.geburtsname}
            </p>
          )}

          {/* Status badge */}
          {person.verified && (
            <div style={{ marginTop: '8px', fontSize: '0.65rem', color: '#F59E0B', background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '100px', border: '1px solid rgba(245,158,11,0.2)' }}>
              ✓ Verifiziert
            </div>
          )}
          {person.missing && (
            <div style={{ marginTop: '8px', fontSize: '0.65rem', color: 'rgba(241,240,239,0.3)' }}>
              🔍 Unbekannt
            </div>
          )}
        </div>

        {/* BACK */}
        <div
          className="flip-card-back rounded-2xl p-4"
          style={{
            background: person.verified
              ? 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(251,113,133,0.1))'
              : 'rgba(255,255,255,0.06)',
            border: person.verified
              ? '1px solid rgba(245,158,11,0.4)'
              : '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p style={{ fontWeight: '700', fontSize: '0.85rem', color: '#F1F0EF', marginBottom: '8px' }}>
            {displayName}
          </p>
          {person.verified ? (
            <div style={{ fontSize: '0.78rem', lineHeight: 1.6 }}>
              {person.beruf && <p style={{ color: 'rgba(241,240,239,0.8)' }}>💼 {person.beruf}</p>}
              {person.ort && <p style={{ color: 'rgba(241,240,239,0.6)' }}>📍 {person.ort}</p>}
              {person.charakteristik && (
                <p style={{ color: 'rgba(241,240,239,0.45)', fontStyle: 'italic', marginTop: '6px', fontSize: '0.72rem', lineHeight: 1.4 }}>
                  &ldquo;{person.charakteristik}&rdquo;
                </p>
              )}
            </div>
          ) : (
            <div>
              <p style={{ color: 'rgba(241,240,239,0.35)', fontSize: '0.78rem', marginBottom: '10px' }}>
                {person.missing ? 'Noch nicht gefunden.' : 'Profil noch nicht beansprucht.'}
              </p>
              {!person.missing && (
                <a
                  href={`/claim?name=${encodeURIComponent(person.name)}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    background: 'linear-gradient(135deg, #F59E0B, #FB7185)',
                    color: '#080808',
                    borderRadius: '100px',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                  }}
                >
                  Profil beanspruchen →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const FILTERS = ['Alle', 'Verifiziert', 'Unbekannt'] as const;
type Filter = (typeof FILTERS)[number];

export default function PersonenPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('Alle');

  const claimed  = alumni.filter((a) => a.claimed).length;
  const missing  = alumni.filter((a) => a.missing).length;
  const reached  = alumni.filter((a) => !a.missing).length;
  const verified = alumni.filter((a) => a.verified).length;

  const filtered = useMemo(() => {
    let list = alumni;
    if (filter === 'Verifiziert') list = list.filter((a) => a.verified);
    else if (filter === 'Unbekannt') list = list.filter((a) => a.missing);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.geburtsname?.toLowerCase().includes(q) ?? false) ||
          (a.beruf?.toLowerCase().includes(q) ?? false) ||
          (a.ort?.toLowerCase().includes(q) ?? false),
      );
    }
    // Verified first, then by name
    return [...list].sort((a, b) => {
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;
      if (a.missing && !b.missing) return 1;
      if (!a.missing && b.missing) return -1;
      return a.name.localeCompare(b.name, 'de');
    });
  }, [query, filter]);

  return (
    <main className="mesh-bg min-h-screen py-16 px-6">
      {/* ─── RETRO CONTENT ─── */}
      <div className="retro-show text-center mb-8">
        <h1>DIE STUFE</h1>
        <p>Gymnasium Marienstatt · Abi 1996</p>
        <div className="retro-construction">🚧 DATENBANK WIRD GELADEN... 🚧</div>
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* ─── HEADER ─── */}
        <div className="text-center mb-12 retro-hide">
          <p style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Gymnasium Marienstatt · Abi 1996
          </p>
          <h1
            className="font-black mb-8"
            style={{ fontSize: 'clamp(3rem,8vw,6rem)', background: 'linear-gradient(135deg, #F59E0B, #FB7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            Die Stufe
          </h1>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center mb-10">
            {[
              { value: reached,  label: 'Erreicht',    color: '#F1F0EF' },
              { value: verified, label: 'Verifiziert', color: '#F59E0B' },
              { value: claimed,  label: 'Claimed',     color: '#34D399' },
              { value: missing,  label: 'Vermisst',    color: '#FB7185' },
            ].map(({ value, label, color }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '900', color }}>{value}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(241,240,239,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(241,240,239,0.3)' }}>🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, Beruf, Ort..."
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  color: '#F1F0EF',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(245,158,11,0.4)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
              />
            </div>

            {/* Filter pills */}
            <div className="flex gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '100px',
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: filter === f ? 'linear-gradient(135deg, #F59E0B, #FB7185)' : 'rgba(255,255,255,0.06)',
                    color: filter === f ? '#080808' : 'rgba(241,240,239,0.6)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RESULT COUNT ─── */}
        {(query || filter !== 'Alle') && (
          <p className="retro-hide text-center mb-6" style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem' }}>
            {filtered.length} {filtered.length === 1 ? 'Person' : 'Personen'} gefunden
          </p>
        )}

        {/* ─── CARDS GRID ─── */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))' }}
        >
          {filtered.map((person, i) => (
            <PersonCard key={person.id} person={person} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 retro-hide">
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
            <p style={{ color: 'rgba(241,240,239,0.3)' }}>Keine Treffer für &ldquo;{query}&rdquo;</p>
          </div>
        )}

        {/* ─── RETRO GRID ─── */}
        <div className="retro-show">
          <h2>Alle Stufenmitglieder</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
            {alumni.map((a) => (
              <li key={a.id}>
                {a.name.split(', ').reverse().join(' ')}
                {a.verified && ' ✓'}
                {a.missing && ' 🔍'}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 retro-hide">
          <p style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Dein Name ist dabei? Beanspruche dein Profil.
          </p>
          <a
            href="/claim"
            style={{
              display: 'inline-block',
              padding: '0.85rem 2.5rem',
              background: 'linear-gradient(135deg, #F59E0B, #FB7185)',
              color: '#080808',
              borderRadius: '100px',
              fontWeight: '700',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            Profil beanspruchen →
          </a>
        </div>
      </div>
    </main>
  );
}
