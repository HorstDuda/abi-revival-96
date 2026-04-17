'use client';

import { useState } from 'react';
import { alumni } from '@/app/data/alumni';

export default function ClaimPage() {
  const [selected, setSelected] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !email) return;
    setSubmitted(true);
  };

  const availableAlumni = alumni
    .filter((a) => !a.verified)
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4 text-green-400">Fast geschafft!</h1>
          <p className="text-slate-300 mb-3">
            Danke, <strong className="text-white">{selected.split(', ').reverse().join(' ')}</strong>!
          </p>
          <p className="text-slate-400 mb-6">
            Wir schicken dir in Kürze einen Magic Link an{' '}
            <strong className="text-pink-400">{email}</strong>, mit dem du dein Profil vervollständigen kannst.
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-left space-y-3">
            <h3 className="font-bold text-lg">Was passiert als nächstes?</h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="flex gap-2">
                <span className="text-pink-400">1.</span>
                Magic Link per E-Mail erhalten
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400">2.</span>
                Profil ausfüllen (Beruf, Wohnort, Foto)
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400">3.</span>
                Verifizierung durch Admin
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400">4.</span>
                Profil erscheint in der Stufen-Übersicht
              </li>
            </ul>
          </div>
          <button
            onClick={() => { setSubmitted(false); setSelected(''); setEmail(''); }}
            className="mt-6 text-slate-500 hover:text-slate-300 text-sm transition"
          >
            Zurück zum Formular
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-12">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
            Dein Profil
          </h1>
          <p className="text-slate-400">Beanspruche deinen Platz in der Stufe</p>
        </div>

        {/* Info box */}
        <div className="bg-indigo-900/40 border border-indigo-600/40 rounded-xl p-5 mb-8">
          <h3 className="font-bold text-indigo-300 mb-2">Was ist das?</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Die Stufen-Datenbank zeigt alle Mitglieder des Abi-Jahrgangs 1996 von Gymnasium Marienstatt.
            Mit deinem Claim-Link kannst du dein eigenes Profil mit aktuellem Beruf, Wohnort und Foto
            befüllen und mit der Stufe teilen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Dein Name aus dem Jahrgang
            </label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 appearance-none cursor-pointer"
            >
              <option value="">-- Name wählen --</option>
              {availableAlumni.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name.split(', ').reverse().join(' ')}
                  {a.geburtsname ? ` (geb. ${a.geburtsname})` : ''}
                  {a.missing ? ' 🔍' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Deine E-Mail-Adresse
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="deine@email.de"
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-pink-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Nur für den Magic Link — keine Newsletter, kein Spam.
            </p>
          </div>

          {/* Already verified note */}
          {selected && alumni.find((a) => a.name === selected)?.verified && (
            <div className="bg-yellow-900/30 border border-yellow-600/40 rounded-xl p-4">
              <p className="text-yellow-400 text-sm font-medium">
                Dieses Profil ist bereits verifiziert. Falls du Änderungen möchtest, melde dich per E-Mail.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!selected || !email}
            className="w-full py-4 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl font-bold text-lg transition"
          >
            Magic Link anfordern →
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-8">
          Dein Name fehlt in der Liste? Schreib an Markus Böer (0151-58564701) oder über die WhatsApp-Gruppe.
        </p>
      </div>
    </main>
  );
}
