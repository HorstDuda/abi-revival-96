'use client';

import { useState } from 'react';
import { alumni } from '@/app/data/alumni';

const availableAlumni = alumni
  .filter((a) => !a.verified)
  .sort((a, b) => a.name.localeCompare(b.name, 'de'));

const STEPS = [
  { n: 1, label: 'Wer bist du?' },
  { n: 2, label: 'Kontakt' },
  { n: 3, label: 'Bestätigen' },
];

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex items-center flex-1 last:flex-none">
          {/* Dot */}
          <div
            className="step-dot flex-shrink-0"
            style={{
              background:
                s.n < step
                  ? 'linear-gradient(135deg,#ec4899,#7c3aed)'
                  : s.n === step
                  ? 'rgba(236,72,153,0.25)'
                  : 'rgba(255,255,255,0.07)',
              border: `2px solid ${s.n <= step ? '#ec4899' : 'rgba(255,255,255,0.15)'}`,
              color: s.n < step ? '#fff' : s.n === step ? '#f9a8d4' : 'rgba(255,255,255,0.3)',
            }}
          >
            {s.n < step ? '✓' : s.n}
          </div>

          {/* Line (not after last) */}
          {i < STEPS.length - 1 && (
            <div
              className="step-line"
              style={{
                background:
                  s.n < step
                    ? 'linear-gradient(90deg,#ec4899,#7c3aed)'
                    : 'rgba(255,255,255,0.08)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function ClaimPage() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedAlumni = alumni.find((a) => a.name === selected);

  const handleSubmit = () => {
    if (!selected || !email) return;
    setSubmitted(true);
  };

  // ── SUCCESS SCREEN ──
  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center py-12 relative">
        <div className="orb orb-pink animate-glow" style={{ width: 400, height: 400, top: '-10%', left: '-5%' }} />
        <div className="orb orb-violet animate-glow delay-300" style={{ width: 350, height: 350, bottom: '5%', right: '-5%' }} />

        <div className="relative z-10 text-center max-w-md mx-auto px-4 animate-fade-in-up">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
            style={{ background: 'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(16,185,129,0.1))', border: '1px solid rgba(16,185,129,0.4)' }}
          >
            🎉
          </div>
          <h1 className="text-4xl font-black mb-4" style={{ color: '#6ee7b7' }}>Fast geschafft!</h1>
          <p className="text-white/70 mb-2">
            Danke, <strong className="text-white">{selected.split(', ').reverse().join(' ')}</strong>!
          </p>
          <p className="text-white/50 mb-8">
            Wir schicken dir einen Magic Link an{' '}
            <strong className="text-pink-400">{email}</strong>.
          </p>

          <div
            className="text-left rounded-2xl p-6 space-y-3 mb-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <h3 className="font-bold text-base">Was passiert als nächstes?</h3>
            {[
              'Magic Link per E-Mail erhalten',
              'Profil ausfüllen (Beruf, Wohnort, Foto)',
              'Verifizierung durch Admin',
              'Profil erscheint in der Stufen-Übersicht',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 text-sm text-white/60">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(236,72,153,0.2)', color: '#f9a8d4' }}
                >{i + 1}</span>
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={() => { setSubmitted(false); setSelected(''); setEmail(''); setStep(1); }}
            className="text-white/30 hover:text-white/60 text-sm transition-colors"
          >
            Zurück zum Formular
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 relative">
      <div className="orb orb-violet animate-glow" style={{ width: 450, height: 450, top: '-5%', right: '-5%' }} />

      {/* Retro marquee */}
      <div className="retro-marquee bg-yellow-300 text-black py-1 text-sm font-bold">
        <marquee>★ CLAIM DEIN PROFIL ★ GYMNASIUM MARIENSTATT ABI 1996 ★ JETZT REGISTRIEREN ★</marquee>
      </div>

      <div className="container mx-auto px-4 max-w-lg relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-3">Profil-Erstellung</p>
          <h1 className="text-5xl font-black tracking-tighter mb-2">
            <span className="gradient-text">Dein Profil</span>
          </h1>
          <p className="text-white/40 text-sm">Beanspruche deinen Platz in der Stufe</p>
        </div>

        {/* Step indicator */}
        <StepIndicator step={step} />

        {/* Step labels */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest uppercase text-white/25 mb-1">Schritt {step} von {STEPS.length}</p>
          <h2 className="text-xl font-bold text-white">{STEPS[step - 1].label}</h2>
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            {/* Info card */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}
            >
              <h3 className="font-bold text-sm text-indigo-300 mb-1">Was ist das?</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                Die Stufen-Datenbank zeigt alle Mitglieder des Abi-Jahrgangs 1996.
                Mit deinem Profil teilst du deinen aktuellen Beruf, Wohnort und Foto mit der Stufe.
              </p>
            </div>

            {/* Name selection */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Dein Name aus dem Jahrgang
              </label>
              <div className="relative">
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  required
                  className="w-full text-white outline-none appearance-none cursor-pointer pr-8"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '0.875rem',
                    padding: '0.875rem 1rem',
                    fontSize: '0.875rem',
                  }}
                >
                  <option value="" style={{ background: '#070b14' }}>— Name wählen —</option>
                  {availableAlumni.map((a) => (
                    <option key={a.id} value={a.name} style={{ background: '#070b14' }}>
                      {a.name.split(', ').reverse().join(' ')}
                      {a.geburtsname ? ` (geb. ${a.geburtsname})` : ''}
                      {a.missing ? ' 🔍' : ''}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">▾</div>
              </div>
            </div>

            {/* Selected person preview */}
            {selected && (
              <div
                className="rounded-xl p-4 flex items-center gap-4 animate-fade-in"
                style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: '#fff' }}
                >
                  {selected.split(', ').map((p) => p[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-sm">{selected.split(', ').reverse().join(' ')}</p>
                  <p className="text-xs text-white/40">Abi 1996 · Gymnasium Marienstatt</p>
                </div>
                <span className="ml-auto text-green-400 text-sm">✓</span>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!selected}
              className="w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30"
              style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: '#fff' }}
            >
              Weiter →
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Deine E-Mail-Adresse
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && email && setStep(3)}
                required
                placeholder="deine@email.de"
                className="w-full text-white placeholder-white/20 outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '0.875rem',
                  padding: '0.875rem 1rem',
                  fontSize: '0.875rem',
                }}
              />
              <p className="text-xs text-white/25 mt-2">
                Nur für den Magic Link — keine Newsletter, kein Spam.
              </p>
            </div>

            {/* Privacy note */}
            <div
              className="rounded-xl p-4 text-sm text-white/45 leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              🔒 Deine E-Mail wird ausschließlich für die Profil-Verifizierung verwendet und nicht an Dritte weitergegeben.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(241,245,249,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                ← Zurück
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!email}
                className="py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30"
                style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: '#fff' }}
              >
                Weiter →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <p className="text-white/50 text-sm mb-2">Bitte prüfe deine Angaben:</p>

            {/* Review card */}
            <div
              className="rounded-2xl p-5 space-y-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[
                { label: 'Name', value: selected.split(', ').reverse().join(' '), icon: '👤' },
                { label: 'E-Mail', value: email, icon: '📧' },
                { label: 'Aktion', value: 'Magic Link erhalten → Profil ausfüllen', icon: '✨' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex gap-3 items-start">
                  <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-xs text-white/35 mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Already verified warning */}
            {selectedAlumni?.verified && (
              <div
                className="rounded-xl p-4 text-sm"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}
              >
                Dieses Profil ist bereits verifiziert. Falls du Änderungen möchtest, melde dich per E-Mail.
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setStep(2)}
                className="py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(241,245,249,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                ← Zurück
              </button>
              <button
                onClick={handleSubmit}
                className="py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: 'linear-gradient(135deg,#ec4899,#7c3aed)',
                  color: '#fff',
                  boxShadow: '0 8px 24px rgba(236,72,153,0.3)',
                }}
              >
                Magic Link anfordern ✓
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-white/20 text-xs mt-8">
          Dein Name fehlt? Schreib an Markus Böer (0151-58564701) oder über die WhatsApp-Gruppe.
        </p>
      </div>
    </main>
  );
}
