'use client';

import { useState, useEffect } from 'react';
import { alumni } from '@/app/data/alumni';

const STEPS = ['Identität', 'Verifizierung', 'Fertig!'] as const;

function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '2.5rem' }}>
      {STEPS.map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.88rem',
                transition: 'all 0.3s',
                background: i < current
                  ? 'linear-gradient(135deg, #F59E0B, #FB7185)'
                  : i === current
                  ? 'rgba(245,158,11,0.15)'
                  : 'rgba(255,255,255,0.05)',
                color: i < current
                  ? '#080808'
                  : i === current
                  ? '#F59E0B'
                  : 'rgba(241,240,239,0.3)',
                border: i === current ? '2px solid rgba(245,158,11,0.5)' : '2px solid transparent',
                boxShadow: i === current ? '0 0 20px rgba(245,158,11,0.3)' : 'none',
              }}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: '0.65rem', color: i === current ? 'rgba(245,158,11,0.8)' : 'rgba(241,240,239,0.25)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ width: '60px', height: '1px', margin: '0 4px', marginBottom: '1.5rem', background: i < current ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.08)', transition: 'background 0.3s' }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      duration: `${1.5 + Math.random() * 1.5}s`,
      color: ['#F59E0B', '#FB7185', '#818CF8', '#34D399', '#FCD34D'][Math.floor(Math.random() * 5)],
      size: `${6 + Math.random() * 8}px`,
    }))
  );

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99, overflow: 'hidden' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: '-10px',
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function ClaimPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const availableAlumni = alumni
    .filter((a) => !a.verified)
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));

  const filtered = query.trim()
    ? availableAlumni.filter((a) =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        (a.geburtsname?.toLowerCase().includes(query.toLowerCase()) ?? false)
      )
    : availableAlumni;

  const selectedPerson = alumni.find((a) => a.name === selected);
  const displayName = selected ? selected.split(', ').reverse().join(' ') : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !email) return;
    setStep(2);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '0.75rem 1rem',
    color: '#F1F0EF',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  } as const;

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '2rem',
  } as const;

  // ─── Step 2: Success ───
  if (step === 2) {
    return (
      <main className="mesh-bg min-h-screen py-20 px-6 flex items-center justify-center">
        {showConfetti && <Confetti />}
        <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'bounceIn 0.6s ease-out both' }}>🎉</div>
          <h1
            className="font-black"
            style={{ fontSize: 'clamp(2rem,6vw,3.5rem)', background: 'linear-gradient(135deg, #34D399, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}
          >
            Fast geschafft!
          </h1>
          <p style={{ color: 'rgba(241,240,239,0.8)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
            Danke, <strong style={{ color: '#F1F0EF' }}>{displayName}</strong>!
          </p>
          <p style={{ color: 'rgba(241,240,239,0.5)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Wir schicken dir in Kürze einen Magic Link an{' '}
            <strong style={{ color: '#F59E0B' }}>{email}</strong>.
          </p>

          <div style={{ ...cardStyle, textAlign: 'left', marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '1rem' }}>Was passiert als nächstes?</h3>
            {[
              'Magic Link per E-Mail erhalten',
              'Profil ausfüllen (Beruf, Wohnort, Foto)',
              'Verifizierung durch Admin',
              'Profil erscheint in der Stufen-Übersicht',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #FB7185)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: '#080808', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <p style={{ color: 'rgba(241,240,239,0.65)', fontSize: '0.88rem', paddingTop: '2px' }}>{step}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setStep(0); setSelected(''); setQuery(''); setEmail(''); }}
            style={{ color: 'rgba(241,240,239,0.35)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Zurück zum Formular
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mesh-bg min-h-screen py-16 px-6">
      {/* RETRO HEADER */}
      <div className="retro-show text-center mb-8">
        <h1>PROFIL BEANSPRUCHEN</h1>
        <p>Melde dich an für den Jahrgang 1996!</p>
        <span className="blink">★ JETZT REGISTRIEREN! ★</span>
      </div>

      <div className="container mx-auto max-w-md">
        {/* MODERN HEADER */}
        <div className="text-center mb-10 retro-hide">
          <p style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Gymnasium Marienstatt · Abi 1996
          </p>
          <h1
            className="font-black mb-3"
            style={{ fontSize: 'clamp(2.5rem,7vw,4.5rem)', background: 'linear-gradient(135deg, #F59E0B, #FB7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            Dein Profil
          </h1>
          <p style={{ color: 'rgba(241,240,239,0.4)', fontSize: '0.92rem' }}>
            Beanspruche deinen Platz in der Stufe
          </p>
        </div>

        {/* Step Indicator */}
        <div className="retro-hide">
          <StepIndicator current={step} />
        </div>

        {/* Step 0: Find yourself */}
        {step === 0 && (
          <div style={cardStyle} className="retro-hide">
            <h2 style={{ fontWeight: '700', fontSize: '1.15rem', marginBottom: '0.4rem' }}>Finde deinen Namen</h2>
            <p style={{ color: 'rgba(241,240,239,0.4)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              Suche nach deinem Namen in der Stufen-Datenbank.
            </p>

            {/* Search input */}
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(''); }}
              placeholder="Deinen Namen tippen..."
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              autoComplete="off"
            />

            {/* Results list */}
            {query && (
              <div style={{ marginTop: '8px', maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {filtered.length === 0 ? (
                  <p style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.82rem', padding: '0.75rem', textAlign: 'center' }}>
                    Kein Treffer — Name nicht in der Liste?
                  </p>
                ) : filtered.map((a) => {
                  const name = a.name.split(', ').reverse().join(' ') + (a.geburtsname ? ` (geb. ${a.geburtsname})` : '');
                  const isSelected = selected === a.name;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setSelected(a.name)}
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: '10px',
                        textAlign: 'left',
                        fontSize: '0.88rem',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        background: isSelected ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                        color: isSelected ? '#F59E0B' : 'rgba(241,240,239,0.75)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: isSelected ? 'rgba(245,158,11,0.4)' : 'transparent',
                        fontWeight: isSelected ? '700' : '500',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      } as React.CSSProperties}
                    >
                      {name}
                      {a.missing && <span style={{ fontSize: '0.7rem', color: 'rgba(241,240,239,0.3)' }}>🔍</span>}
                      {isSelected && <span style={{ fontSize: '0.8rem' }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {selectedPerson?.verified && (
              <div style={{ marginTop: '1rem', background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.3)', borderRadius: '12px', padding: '0.85rem' }}>
                <p style={{ color: '#FB7185', fontSize: '0.82rem' }}>
                  Dieses Profil ist bereits verifiziert. Für Änderungen: Markus Böer kontaktieren.
                </p>
              </div>
            )}

            <button
              onClick={() => setStep(1)}
              disabled={!selected || !!selectedPerson?.verified}
              style={{
                marginTop: '1.25rem',
                width: '100%',
                padding: '0.85rem',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.95rem',
                border: 'none',
                cursor: (selected && !selectedPerson?.verified) ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                background: (selected && !selectedPerson?.verified) ? 'linear-gradient(135deg, #F59E0B, #FB7185)' : 'rgba(255,255,255,0.05)',
                color: (selected && !selectedPerson?.verified) ? '#080808' : 'rgba(241,240,239,0.25)',
              } as React.CSSProperties}
            >
              Weiter →
            </button>
          </div>
        )}

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleSubmit} style={cardStyle} className="retro-hide">
            {/* Selected person summary */}
            <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', padding: '0.85rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.72rem', color: 'rgba(245,158,11,0.6)', marginBottom: '2px' }}>Ausgewählt</p>
                <p style={{ fontWeight: '700', color: '#F1F0EF' }}>{displayName}</p>
              </div>
              <button type="button" onClick={() => { setStep(0); setSelected(''); setQuery(''); }}
                style={{ background: 'none', border: 'none', color: 'rgba(241,240,239,0.4)', cursor: 'pointer', fontSize: '0.78rem' }}>
                Ändern
              </button>
            </div>

            <h2 style={{ fontWeight: '700', fontSize: '1.15rem', marginBottom: '0.4rem' }}>E-Mail-Adresse</h2>
            <p style={{ color: 'rgba(241,240,239,0.4)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              Wir senden dir einen Magic Link — kein Passwort nötig.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="deine@email.de"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(245,158,11,0.5)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
            <p style={{ marginTop: '6px', fontSize: '0.72rem', color: 'rgba(241,240,239,0.25)' }}>
              Keine Newsletter · Kein Spam · Nur für den Magic Link
            </p>

            <div style={{ display: 'flex', gap: '8px', marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setStep(0)}
                style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', fontWeight: '600', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(241,240,239,0.5)', cursor: 'pointer' }}
              >
                ← Zurück
              </button>
              <button
                type="submit"
                disabled={!email}
                style={{
                  flex: 2,
                  padding: '0.85rem',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: email ? 'pointer' : 'not-allowed',
                  background: email ? 'linear-gradient(135deg, #F59E0B, #FB7185)' : 'rgba(255,255,255,0.05)',
                  color: email ? '#080808' : 'rgba(241,240,239,0.25)',
                  transition: 'all 0.2s',
                } as React.CSSProperties}
              >
                Magic Link anfordern →
              </button>
            </div>
          </form>
        )}

        {/* RETRO FORM */}
        <div className="retro-show">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Dein Name:</label>
              <select value={selected} onChange={(e) => setSelected(e.target.value)} required style={{ width: '100%', padding: '8px' }}>
                <option value="">-- Name wählen --</option>
                {availableAlumni.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name.split(', ').reverse().join(' ')}{a.geburtsname ? ` (geb. ${a.geburtsname})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Deine E-Mail:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="deine@email.de" style={{ width: '100%', padding: '8px' }} />
            </div>
            <button type="submit" disabled={!selected || !email} style={{ padding: '10px 20px', fontWeight: 'bold' }}>
              MAGIC LINK ANFORDERN !!!
            </button>
          </form>
        </div>

        {/* Info box */}
        <div
          className="retro-hide"
          style={{ marginTop: '1.5rem', background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.15)', borderRadius: '14px', padding: '1.1rem' }}
        >
          <p style={{ fontSize: '0.78rem', color: 'rgba(241,240,239,0.4)', lineHeight: 1.6 }}>
            <strong style={{ color: 'rgba(129,140,248,0.8)' }}>Was ist das?</strong><br />
            Die Stufen-Datenbank zeigt alle Mitglieder des Abi-Jahrgangs 1996. Mit dem Claim-Link
            kannst du dein Profil mit aktuellem Beruf, Wohnort und Foto befüllen.
          </p>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(241,240,239,0.2)', fontSize: '0.72rem', marginTop: '1.5rem' }}>
          Name fehlt? → Markus Böer (0151-58564701) oder WhatsApp-Gruppe
        </p>
      </div>
    </main>
  );
}
