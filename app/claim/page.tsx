'use client';

import { useState } from 'react';
import { alumni } from '@/app/data/alumni';

export default function ClaimPage() {
  const [step, setStep]           = useState(1);
  const [selected, setSelected]   = useState('');
  const [email, setEmail]         = useState('');
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
      <main className="min-h-screen bg-[#f8f9fa] flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="font-black text-4xl mb-4 text-[#2D6A4F]">Fast geschafft!</h1>
          <p className="text-[#111827] mb-2">
            Danke, <strong style={{ color: '#E84060' }}>{selected.split(', ').reverse().join(' ')}</strong>!
          </p>
          <p className="text-[#6b7280] mb-8">
            Du bekommst bald einen Magic Link an{' '}
            <strong style={{ color: '#E84060' }}>{email}</strong>.
          </p>
          <div className="glass rounded-2xl p-6 text-left mb-6">
            <h3 className="font-bold text-[#111827] text-base mb-4">Was passiert als nächstes?</h3>
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
                <p className="text-sm text-[#374151]">{t}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setSubmitted(false); setSelected(''); setEmail(''); setStep(1); }}
            className="text-sm text-[#9ca3af] hover:text-[#6b7280] transition-colors"
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
    <main className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="container mx-auto px-4 max-w-lg">

        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="font-black mb-2 tracking-tight text-[#111827]"
            style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}
          >
            Dein <span style={{ color: '#2D6A4F' }}>Profil</span>
          </h1>
          <p className="text-[#6b7280]">Beanspruche deinen Platz in der Stufe</p>
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
                      ? { background: '#2D6A4F', color: 'white' }
                      : step === s.n
                      ? { background: '#E84060', color: 'white', boxShadow: '0 4px 14px rgba(232,64,96,0.35)' }
                      : { background: '#f3f4f6', color: '#9ca3af', border: '2px solid rgba(0,0,0,0.06)' }
                  }
                >
                  {step > s.n ? '✓' : s.n}
                </div>
                <span
                  className="text-xs mt-1 hidden sm:block"
                  style={{ color: step === s.n ? '#E84060' : '#9ca3af' }}
                >{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="w-16 h-0.5 mx-2 mb-4"
                  style={{ background: step > s.n ? '#2D6A4F' : 'rgba(0,0,0,0.08)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="glass rounded-2xl p-5 mb-8">
          <h3 className="font-semibold mb-1 text-[#2D6A4F]">Was ist das?</h3>
          <p className="text-sm leading-relaxed text-[#6b7280]">
            Beanspruche dein Profil in der Stufen-Datenbank. Füge Beruf, Wohnort und ein aktuelles Foto hinzu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 1: Name */}
          <div className={step !== 1 ? 'opacity-50 pointer-events-none' : ''}>
            <label className="block text-sm font-semibold mb-2 text-[#374151]">1. Dein Name</label>
            <select
              value={selected}
              onChange={(e) => { setSelected(e.target.value); if (e.target.value) setStep(2); }}
              className="w-full rounded-xl px-5 py-4 text-[#111827] outline-none appearance-none bg-white border"
              style={{ borderColor: step === 1 ? '#E84060' : 'rgba(0,0,0,0.08)' }}
            >
              <option value="">-- Name auswählen --</option>
              {available.map((a) => (
                <option key={a.id} value={a.name}>
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
              <label className="block text-sm font-semibold mb-2 text-[#374151]">2. Deine E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (e.target.value.includes('@')) setStep(3); }}
                required
                placeholder="deine@email.de"
                className="w-full rounded-xl px-5 py-4 text-[#111827] outline-none bg-white border"
                style={{ borderColor: step === 2 ? '#E84060' : 'rgba(0,0,0,0.08)' }}
              />
              <p className="text-xs mt-1 text-[#9ca3af]">
                Nur für den Magic Link · kein Spam
              </p>
            </div>
          )}

          {/* Step 3: Confirm */}
          {selected && email && (
            <div className="glass rounded-2xl p-5 border-[#E84060]/25" style={{ borderColor: 'rgba(232,64,96,0.2)' }}>
              <h3 className="font-bold text-[#111827] mb-3">3. Bestätigen</h3>
              <p className="text-sm mb-1 text-[#6b7280]">
                Name: <strong className="text-[#111827]">{selected.split(', ').reverse().join(' ')}</strong>
              </p>
              <p className="text-sm mb-5 text-[#6b7280]">
                E-Mail: <strong style={{ color: '#E84060' }}>{email}</strong>
              </p>
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-black text-lg text-white transition-all hover:opacity-90"
                style={{ background: '#E84060', boxShadow: '0 4px 20px rgba(232,64,96,0.3)' }}
              >
                Magic Link anfordern →
              </button>
            </div>
          )}
        </form>

        <p className="text-center text-xs mt-8 text-[#9ca3af]">
          Name fehlt? → Markus Böer · WhatsApp 0151-58564701
        </p>
      </div>
    </main>
  );
}
