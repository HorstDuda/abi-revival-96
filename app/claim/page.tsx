'use client';

import { useState } from 'react';
import { alumni } from '@/app/data/alumni';

export default function ClaimPage() {
  const [step, setStep]         = useState(1);
  const [selected, setSelected] = useState('');
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);

  const available = alumni
    .filter((a) => !a.verified)
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main
        className="min-h-screen flex items-center justify-center py-12"
        style={{ background: 'linear-gradient(160deg, #0a1f0a 0%, #0a0a0a 100%)' }}
      >
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="font-black text-4xl mb-4" style={{ color: '#52b788' }}>Fast geschafft!</h1>
          <p className="text-white mb-2">
            Danke, <strong style={{ color: '#E84060' }}>{selected.split(', ').reverse().join(' ')}</strong>!
          </p>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Du bekommst bald einen Magic Link an{' '}
            <strong style={{ color: '#E84060' }}>{email}</strong>.
          </p>
          <div className="glass rounded-2xl p-6 text-left mb-6" style={{ border: '1px solid rgba(45,106,79,0.3)' }}>
            <h3 className="font-black text-white text-lg mb-4">Was passiert als nächstes?</h3>
            {[
              'Magic Link per E-Mail erhalten',
              'Profil ausfüllen (Beruf, Wohnort, Foto)',
              'Verifizierung durch Admin',
              'Du erscheinst in der Stufen-Übersicht',
            ].map((t, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                  style={{ background: '#E84060' }}
                >{i + 1}</span>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{t}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setSubmitted(false); setSelected(''); setEmail(''); setStep(1); }}
            className="text-sm transition-all"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >← Zurück zum Formular</button>
        </div>
      </main>
    );
  }

  const STEPS = [
    { n: 1, label: 'Name' },
    { n: 2, label: 'E-Mail' },
    { n: 3, label: 'Bestätigen' },
  ];

  return (
    <main className="min-h-screen py-12" style={{ background: 'linear-gradient(160deg, #0a1f0a 0%, #0a0a0a 100%)' }}>
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center mb-10">
          <h1
            className="font-black mb-2 tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: '#E84060', textShadow: '3px 3px 0px rgba(0,0,0,0.6)' }}
          >DEIN PROFIL</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)' }}>Beanspruche deinen Platz in der Stufe</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all"
                  style={
                    step > s.n
                      ? { background: '#52b788', color: 'white' }
                      : step === s.n
                      ? { background: '#E84060', color: 'white', boxShadow: '0 0 20px rgba(232,64,96,0.5)' }
                      : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }
                  }
                >
                  {step > s.n ? '✓' : s.n}
                </div>
                <span
                  className="text-xs mt-1 hidden sm:block"
                  style={{ color: step === s.n ? '#E84060' : 'rgba(255,255,255,0.35)' }}
                >{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="w-16 h-0.5 mx-2 mb-4"
                  style={{ background: step > s.n ? '#52b788' : 'rgba(255,255,255,0.1)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="glass rounded-2xl p-5 mb-8" style={{ border: '1px solid rgba(45,106,79,0.3)' }}>
          <h3 className="font-bold mb-1" style={{ color: '#52b788' }}>Was ist das?</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Beanspruche dein Profil in der Stufen-Datenbank. Füge Beruf, Wohnort und ein aktuelles Foto hinzu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 1: Name */}
          <div className={step !== 1 ? 'opacity-50 pointer-events-none' : ''}>
            <label className="block text-sm font-bold mb-2 text-white">1. Dein Name</label>
            <select
              value={selected}
              onChange={(e) => { setSelected(e.target.value); if (e.target.value) setStep(2); }}
              className="w-full rounded-2xl px-5 py-4 text-white outline-none appearance-none"
              style={{
                background: 'rgba(10,20,10,0.85)',
                border: step === 1 ? '1px solid #E84060' : '1px solid rgba(45,106,79,0.3)',
              }}
            >
              <option value="" style={{ background: '#0a1f0a' }}>-- Name auswählen --</option>
              {available.map((a) => (
                <option key={a.id} value={a.name} style={{ background: '#0a1f0a' }}>
                  {a.name.split(', ').reverse().join(' ')}
                  {a.geburtsname ? ` (geb. ${a.geburtsname})` : ''}
                  {a.missing ? ' 🔍' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Email */}
          {selected && (
            <div className={step < 2 ? 'opacity-50 pointer-events-none' : ''}>
              <label className="block text-sm font-bold mb-2 text-white">2. Deine E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (e.target.value.includes('@')) setStep(3); }}
                required
                placeholder="deine@email.de"
                className="w-full rounded-2xl px-5 py-4 text-white outline-none"
                style={{
                  background: 'rgba(10,20,10,0.85)',
                  border: step === 2 ? '1px solid #E84060' : '1px solid rgba(45,106,79,0.3)',
                }}
              />
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                Nur für den Magic Link · kein Spam
              </p>
            </div>
          )}

          {/* Step 3: Confirm */}
          {selected && email && (
            <div className="glass rounded-2xl p-5" style={{ border: '1px solid rgba(232,64,96,0.3)' }}>
              <h3 className="font-black text-white mb-3">3. Bestätigen</h3>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Name: <strong className="text-white">{selected.split(', ').reverse().join(' ')}</strong>
              </p>
              <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                E-Mail: <strong style={{ color: '#E84060' }}>{email}</strong>
              </p>
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #E84060, #c02040)',
                  boxShadow: '0 8px 32px rgba(232,64,96,0.4)',
                }}
              >
                Magic Link anfordern →
              </button>
            </div>
          )}
        </form>

        <p className="text-center text-xs mt-8" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Name fehlt? → Markus Böer · WhatsApp 0151-58564701
        </p>
      </div>
    </main>
  );
}
