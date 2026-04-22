'use client';

import { useState } from 'react';

const EVENTS = [
  { year: 1990, label: 'Einschulung',          detail: '5. Klasse — Gymnasium Marienstatt',            cat: 'school',  icon: '🏫' },
  { year: 1990, label: 'Deutsche Einheit',      detail: '3. Oktober — Wiedervereinigung',               cat: 'world',   icon: '🇩🇪' },
  { year: 1991, label: 'Golfkrieg',             detail: 'Wir waren 11 Jahre alt',                      cat: 'world',   icon: '🌍' },
  { year: 1991, label: 'Sowjetunion fällt',     detail: 'Ende des Kalten Krieges',                     cat: 'world',   icon: '☭' },
  { year: 1992, label: 'EU entsteht',           detail: 'Maastricht-Vertrag unterzeichnet',            cat: 'world',   icon: '🇪🇺' },
  { year: 1993, label: 'Boygroups & Grunge',    detail: 'Take That vs. Nirvana — Kulturkampf',         cat: 'culture', icon: '🎸' },
  { year: 1994, label: 'Kurt Cobain',           detail: '5. April 1994',                               cat: 'culture', icon: '🎵' },
  { year: 1994, label: 'WM USA',                detail: 'Deutschland im Viertelfinale',                cat: 'culture', icon: '⚽' },
  { year: 1995, label: 'Windows 95',            detail: 'Start-Button & Internet-Boom beginnt',        cat: 'tech',    icon: '💻' },
  { year: 1995, label: 'Toy Story',             detail: 'Erster CGI-Film der Geschichte',              cat: 'culture', icon: '🎬' },
  { year: 1996, label: 'ABITUR !!',             detail: 'Gymnasium Marienstatt — wir sind FREI!',      cat: 'school',  icon: '🎓' },
  { year: 1996, label: 'EM-Sieg',               detail: 'Deutschland gewinnt Euro 96 in England',     cat: 'culture', icon: '🏆' },
  { year: 1996, label: 'Spice Girls',           detail: '"Wannabe" — Girl Power weltweit',             cat: 'culture', icon: '🎤' },
  { year: 1996, label: 'Dolly das Schaf',       detail: 'Erstes geklontes Säugetier',                  cat: 'tech',    icon: '🐑' },
  { year: 2001, label: '9/11',                  detail: 'Die Welt verändert sich',                     cat: 'world',   icon: '🌍' },
  { year: 2004, label: 'Facebook startet',      detail: 'Mark Zuckerberg in Harvard',                  cat: 'tech',    icon: '📘' },
  { year: 2007, label: 'iPhone',                detail: 'Steve Jobs — alles ändert sich',              cat: 'tech',    icon: '📱' },
  { year: 2008, label: 'Finanzkrise',           detail: 'Weltweite Rezession',                         cat: 'world',   icon: '📉' },
  { year: 2016, label: '20 Jahre Abi',          detail: '1. Reunion — erste Treffen',                  cat: 'reunion', icon: '🥂' },
  { year: 2020, label: 'COVID-19',              detail: 'Globale Pandemie — alles stoppt',             cat: 'world',   icon: '😷' },
  { year: 2022, label: 'ChatGPT',               detail: '"Knowledge WAS King" — KI übernimmt',        cat: 'tech',    icon: '🤖' },
  { year: 2026, label: 'HOMECOMING',            detail: 'Grillhütte Schmidthahn · 30 Jahre!',          cat: 'reunion', icon: '🔥' },
];

const CAT_COLORS: Record<string, string> = {
  school:  '#E84060',
  world:   '#2D6A4F',
  culture: '#f59e0b',
  tech:    '#06b6d4',
  reunion: '#E84060',
};

const CAT_LABELS: Record<string, string> = {
  all:     '🌐 Alle',
  school:  '🏫 Schule',
  world:   '🌍 Welt',
  culture: '🎸 Kultur',
  tech:    '💻 Technik',
  reunion: '🔥 Reunion',
};

export default function TimelinePage() {
  const [cat, setCat] = useState('all');

  const filtered = EVENTS.filter((e) => cat === 'all' || e.cat === cat);
  const years    = [...new Set(filtered.map((e) => e.year))].sort((a, b) => a - b);

  return (
    <main className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="font-black mb-2 tracking-tight text-[#111827]"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
          >
            <span style={{ color: '#2D6A4F' }}>Timeline</span>
          </h1>
          <p className="text-[#6b7280]">1990 → 2026 · Unsere Geschichte</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap justify-center mb-12">
          {Object.entries(CAT_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCat(key)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all border"
              style={
                cat === key
                  ? { background: '#2D6A4F', color: 'white', borderColor: '#2D6A4F' }
                  : { background: 'white', color: '#6b7280', borderColor: 'rgba(0,0,0,0.08)' }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#2D6A4F]/20" />

            {years.map((year) => {
              const yearEvents = filtered.filter((e) => e.year === year);
              const isKey = year === 1996 || year === 2026;
              return (
                <div key={year} className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center font-black z-10 flex-shrink-0 text-xs"
                      style={
                        isKey
                          ? { background: '#E84060', color: 'white', boxShadow: '0 4px 16px rgba(232,64,96,0.35)' }
                          : { background: 'white', color: '#374151', border: '2px solid rgba(45,106,79,0.2)' }
                      }
                    >
                      {year}
                    </div>
                  </div>

                  <div className="ml-20 space-y-2">
                    {yearEvents.map((ev, i) => (
                      <div
                        key={i}
                        className="glass rounded-xl p-4 flex items-start gap-3 transition-all hover:shadow-md"
                        style={{ borderLeft: `3px solid ${CAT_COLORS[ev.cat]}` }}
                      >
                        <span className="text-xl flex-shrink-0">{ev.icon}</span>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-[#111827]">{ev.label}</p>
                          <p className="text-xs text-[#6b7280]">{ev.detail}</p>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                          style={{ background: `${CAT_COLORS[ev.cat]}12`, color: CAT_COLORS[ev.cat] }}
                        >
                          {ev.cat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-lg mx-auto mt-12 text-center glass rounded-2xl p-6">
          <h3 className="font-bold text-[#111827] text-lg mb-2">Dein Meilenstein fehlt?</h3>
          <p className="text-sm text-[#6b7280] mb-4">
            Eigene Ereignisse kommen nach dem Profil-Claim
          </p>
          <a
            href="/claim"
            className="inline-block px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#E84060' }}
          >
            Profil beanspruchen →
          </a>
        </div>
      </div>
    </main>
  );
}
