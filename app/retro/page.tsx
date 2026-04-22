'use client';

import { useState } from 'react';
import Image from 'next/image';

const WAYBACK = [
  { label: 'Hachenburg 1996',         url: 'https://web.archive.org/web/1996*/hachenburg.de',           icon: '🏰' },
  { label: 'Gymnasium Marienstatt',   url: 'https://web.archive.org/web/1996*/gymnasium-marienstatt.de', icon: '🏫' },
  { label: 'Westerwald 1996',         url: 'https://web.archive.org/web/1996*/westerwald.de',            icon: '🌲' },
  { label: 'Web.de 1997',             url: 'https://web.archive.org/web/1997*/web.de',                   icon: '📧' },
  { label: 'T-Online 1997',           url: 'https://web.archive.org/web/1997*/t-online.de',              icon: '📡' },
  { label: 'GeoCities 1996',          url: 'https://web.archive.org/web/1996*/geocities.com',            icon: '🌐' },
];

const DM_QUIZ = [
  { item: 'Bier (0,5l)',        dm: '2,50 DM', euro: '1,28 €' },
  { item: 'Kinokarte',          dm: '10 DM',   euro: '5,11 €' },
  { item: 'Zigaretten (20er)',  dm: '4,50 DM', euro: '2,30 €' },
  { item: 'Benzin (1L)',        dm: '1,35 DM', euro: '0,69 €' },
  { item: 'McDonald\'s Burger', dm: '2,50 DM', euro: '1,28 €' },
  { item: 'Schulbus-Monat',     dm: '45 DM',   euro: '23 €'   },
  { item: 'Kassette (90 Min)',  dm: '3,50 DM', euro: '1,79 €' },
  { item: 'CD (Neu)',           dm: '22 DM',   euro: '11,25 €'},
];

const FACTS = [
  { cat: '🎵 Musik',     items: ['Alanis Morissette – Ironic', 'Macarena – Los Del Rio', 'Spice Girls – Wannabe', 'Oasis – Wonderwall', 'Coolio – Gangsta\'s Paradise'] },
  { cat: '🎬 Film & TV', items: ['Scream', 'Independence Day', 'Mission Impossible', 'Jerry Maguire', 'Big Brother noch nicht erfunden'] },
  { cat: '💾 Technik',   items: ['Windows 95 / NT 4.0', 'Internet Explorer 3.0', '56k Modem', 'Nokia 1610', 'ICQ noch nicht da', 'GeoCities Homepages'] },
  { cat: '⚽ Sport',     items: ['Deutschland gewinnt EM 96!', 'Boris Becker beendet Karriere', 'Steffi Graf Wimbledon', 'Schumacher WM-Titel'] },
  { cat: '🌍 Welt',      items: ['Dolly das Schaf geklont', 'Euro 1996 in England', 'Erste Browser-Kriege', 'Madonnas Evita'] },
  { cat: '🏫 Marienstatt',items: ['Unser ABITUR!', '6 Jahre Internat', 'Abizeitung erscheint', 'Abistreich legendär', 'Letzte Unterrichtsstunde'] },
];

const TIMELINE = [
  { year: '1990', event: 'Einschulung — 5. Klasse Marienstatt', icon: '🏫' },
  { year: '1991', event: 'Golfkrieg · Sowjetunion löst sich auf', icon: '🌍' },
  { year: '1992', event: 'EU-Vertrag Maastricht · EG wird EU', icon: '🇪🇺' },
  { year: '1993', event: 'Boygroups & Grunge · Take That vs. Nirvana', icon: '🎸' },
  { year: '1994', event: 'Kurt Cobain · Forrest Gump · WM USA', icon: '🎵' },
  { year: '1995', event: 'Windows 95 · Toy Story · Internet-Boom', icon: '💻' },
  { year: '1996', event: 'ABITUR !! · Spice Girls · EM-Sieg · Dolly', icon: '🎓' },
  { year: '2026', event: 'HOMECOMING · 30 Jahre · Grillhütte Schmidthahn', icon: '🔥' },
];

export default function RetroPage() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  return (
    <main className="min-h-screen bg-[#f8f9fa] py-12">

      {/* Retro marquee */}
      <div className="retro-marquee">
        <div className="ticker-text font-bold py-2 px-4">
          ★ WILLKOMMEN AUF DER ABI WELT &apos;96 HOMEPAGE ★ BEST VIEWED IN NETSCAPE NAVIGATOR 3.0 ★ 800×600 ★ UNDER CONSTRUCTION ★ BEST CLASS EVER ★
        </div>
      </div>

      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="font-black mb-2 tracking-tighter text-[#111827]"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Zeitreise <span style={{ color: '#E84060' }}>1996</span>
          </h1>
          <p className="text-[#6b7280]">Als wir Marienstatt verließen — und das Internet noch jung war</p>
          <p className="text-xs mt-2 text-[#9ca3af]">
            Aktiviere den <strong style={{ color: '#E84060' }}>Zeitreise!</strong>-Button unten rechts für das volle Netscape-Navigator-Erlebnis
          </p>
        </div>

        {/* Hero image */}
        <div className="relative aspect-video max-w-2xl mx-auto mb-16 rounded-2xl overflow-hidden glass">
          <Image src="/grafiken/retro-90s-graduation.png" alt="Retro Graduation" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-bold text-xl">Abitur 1996 · Gymnasium Marienstatt</p>
            <p className="text-sm text-white/70">30 Jahre ist es her</p>
          </div>
        </div>

        {/* Wayback Machine */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-bold text-2xl mb-2 text-[#111827]">🕰 Wayback Machine</h2>
          <p className="text-sm text-[#6b7280] mb-6">Das Internet von 1996 — wie es wirklich aussah</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WAYBACK.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 flex items-center gap-3 transition-all hover:shadow-md group"
              >
                <span className="text-2xl">{l.icon}</span>
                <span className="font-medium text-sm text-[#374151] group-hover:text-[#2D6A4F] transition-colors">{l.label}</span>
                <span className="ml-auto text-xs text-[#9ca3af]">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="font-bold text-2xl mb-6 text-[#111827]">Unsere Schuljahre</h2>
          <div className="relative border-l-2 pl-6 space-y-5" style={{ borderColor: 'rgba(45,106,79,0.2)' }}>
            {TIMELINE.map((entry) => {
              const isKey = entry.year === '1996' || entry.year === '2026';
              return (
                <div key={entry.year} className="relative group">
                  <div
                    className="absolute -left-8 w-4 h-4 rounded-full border-2 top-1 transition-all group-hover:scale-125"
                    style={{ background: isKey ? '#E84060' : '#2D6A4F', borderColor: 'white', boxShadow: '0 0 0 2px currentColor' }}
                  />
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">{entry.icon}</span>
                    <div>
                      <span
                        className="font-black text-xl mr-2"
                        style={{ color: isKey ? '#E84060' : '#2D6A4F' }}
                      >{entry.year}</span>
                      <span className="text-sm text-[#374151]">{entry.event}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DM Quiz */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-bold text-2xl mb-2 text-[#111827]">💰 DM-Preisrätsel</h2>
          <p className="text-sm text-[#6b7280] mb-6">Was kostete was in 1996? Klick zum Aufdecken!</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DM_QUIZ.map((q) => (
              <button
                key={q.item}
                onClick={() => setRevealed((s) => ({ ...s, [q.item]: !s[q.item] }))}
                className="glass rounded-xl p-4 text-left transition-all hover:shadow-md"
                style={{ borderColor: revealed[q.item] ? 'rgba(232,64,96,0.3)' : 'rgba(0,0,0,0.07)' }}
              >
                <p className="text-sm font-semibold text-[#111827]">{q.item}</p>
                {revealed[q.item] ? (
                  <div className="mt-2">
                    <p className="text-xl font-black" style={{ color: '#E84060' }}>{q.dm}</p>
                    <p className="text-xs text-[#9ca3af]">≈ {q.euro} heute</p>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-[#9ca3af]">Tippen zum Aufdecken</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Facts grid */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="font-bold text-2xl mb-6 text-[#111827]">1996 in Fakten</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACTS.map((block) => (
              <div key={block.cat} className="glass rounded-2xl p-5">
                <h3 className="font-bold text-base mb-3" style={{ color: '#E84060' }}>{block.cat}</h3>
                <ul className="space-y-1.5">
                  {block.items.map((item) => (
                    <li key={item} className="text-sm flex gap-2 text-[#374151]">
                      <span style={{ color: '#2D6A4F' }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tech comparison */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-bold text-2xl mb-6 text-[#111827]">Technik: Damals vs. Heute</h2>
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 glass">
            <Image src="/grafiken/1996-internet-vs-2026-ai.png" alt="1996 vs 2026 Tech" fill className="object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-xl p-4">
              <h3 className="font-bold mb-3 text-[#2D6A4F]">1996</h3>
              {['💾 Floppy (1,44 MB)','🌐 56k Modem','📱 Nokia ohne Kamera','💻 Pentium 166 MHz','📧 E-Mail war exotisch'].map((i) => (
                <p key={i} className="text-xs mb-1 text-[#374151]">{i}</p>
              ))}
            </div>
            <div className="glass rounded-xl p-4">
              <h3 className="font-bold mb-3" style={{ color: '#E84060' }}>2026</h3>
              {['☁️ Terabytes in der Cloud','📡 5G / Glasfaser','📱 Supercomputer im Pocket','🤖 KI-Assistenten überall','⚡ Claude, ChatGPT, Gemini'].map((i) => (
                <p key={i} className="text-xs mb-1 text-[#374151]">{i}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Zeitkapsel */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden mb-6 glass">
            <Image src="/grafiken/zeitkapsel.png" alt="Zeitkapsel" fill className="object-cover" />
          </div>
          <h2 className="font-bold text-2xl mb-3 text-[#111827]">Die Zeitkapsel</h2>
          <p className="text-sm text-[#6b7280] mb-6">
            Was würdest du deinem 18-jährigen Ich sagen?
          </p>
          <textarea
            placeholder="Liebe/r [Vorname], in 30 Jahren wirst du…"
            className="w-full rounded-xl px-5 py-4 text-[#111827] resize-none outline-none bg-white border border-black/[0.08] focus:border-[#2D6A4F]/40 transition-colors"
            style={{ minHeight: '120px' }}
          />
          <button
            className="mt-4 px-8 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#E84060' }}
          >
            Einschließen (coming soon)
          </button>
        </div>
      </div>
    </main>
  );
}
