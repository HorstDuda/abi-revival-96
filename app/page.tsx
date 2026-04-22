'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setT({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setT({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

const CARDS = [
  { href: '/personen', icon: '👥', title: 'PERSONEN', sub: 'Wer, was, wo' },
  { href: '/spiele',   icon: '🎮', title: 'SPIELE',   sub: 'Bingo · Quiz · Voting' },
  { href: '/galerie',  icon: '📸', title: 'GALERIE',  sub: 'Damals & Heute' },
  { href: '/retro',    icon: '📼', title: '1996',     sub: '90er Zeitreise' },
  { href: '/timeline', icon: '⏳', title: 'TIMELINE', sub: '1990 → 2026' },
  { href: '/claim',    icon: '✋', title: 'PROFIL',   sub: 'Deinen Platz sichern' },
];

export default function Home() {
  const cd = useCountdown(new Date('2026-06-12T18:00:00'));
  const p  = (n: number) => String(n).padStart(2, '0');

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a1f0a 0%, #0a0a0a 60%, #0f0008 100%)' }}
    >
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width:  `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              left:   `${(i * 8.33) % 100}%`,
              bottom: '-10px',
              background: i % 2 === 0 ? '#E84060' : '#2D6A4F',
              opacity: 0.4,
              animation: `particle-float ${7 + i * 1.3}s linear ${i * 0.7}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Retro marquee */}
      <div className="retro-marquee">
        <div className="ticker-text font-bold py-2 px-4">
          ★★★ WILLKOMMEN AUF DER ABI WELT &apos;96 HOMEPAGE ★★★ KNOWLEDGE WAS KING ★★★ GYMNASIUM MARIENSTATT ★★★ 30 JAHRE REUNION ★★★ BEST CLASS EVER ★★★
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Hero */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-12">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <p
              className="text-xs font-black tracking-[0.35em] uppercase mb-4"
              style={{ color: '#2D6A4F' }}
            >
              Gymnasium Marienstatt · Homecoming
            </p>
            <h1
              className="font-black leading-none tracking-tighter mb-2"
              style={{
                fontSize: 'clamp(4.5rem, 16vw, 12rem)',
                color: '#E84060',
                textShadow: '4px 4px 0px #000, 7px 7px 0px rgba(45,106,79,0.35)',
              }}
            >
              A(B)I
            </h1>
            <h2
              className="font-black leading-none tracking-tight text-white mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
                textShadow: '3px 3px 0px rgba(0,0,0,0.8)',
              }}
            >
              REVIVAL
            </h2>

            <div className="mb-8 space-y-1">
              <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <s>1996: &quot;Knowledge is King!!&quot;</s>
              </p>
              <p className="font-mono font-black text-lg" style={{ color: '#E84060' }}>
                2026: &quot;Knowledge WAS King!!&quot;
              </p>
            </div>

            <div className="flex gap-8 justify-center lg:justify-start">
              {[{ n: '103', l: 'Absolventen' }, { n: '30', l: 'Jahre' }, { n: '1', l: 'Homecoming' }].map(({ n, l }) => (
                <div key={l} className="text-center">
                  <div className="text-3xl font-black" style={{ color: '#E84060' }}>{n}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* King mascot */}
          <div className="flex-shrink-0 relative">
            <div
              className="w-56 h-56 lg:w-80 lg:h-80 anim-float"
              style={{
                backgroundImage: 'url(/branding/front-preview.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'drop-shadow(0 0 50px rgba(232,64,96,0.45))',
              }}
            />
            <div
              className="absolute -inset-6 rounded-full -z-10"
              style={{ background: 'radial-gradient(circle, rgba(232,64,96,0.12) 0%, transparent 70%)' }}
            />
          </div>
        </div>

        {/* Countdown */}
        <div
          className="glass rounded-2xl p-6 max-w-2xl mx-auto mb-12 text-center"
          style={{ border: '1px solid rgba(232,64,96,0.25)', boxShadow: '0 0 40px rgba(232,64,96,0.1)' }}
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Bis zum Homecoming · 12. Juni 2026 · Grillhütte Schmidthahn
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[{ v: p(cd.days), l: 'Tage' }, { v: p(cd.hours), l: 'Std' }, { v: p(cd.minutes), l: 'Min' }, { v: p(cd.seconds), l: 'Sek' }].map(({ v, l }) => (
              <div key={l} className="glass rounded-xl p-3">
                <div className="text-4xl font-black tabular-nums" style={{ color: '#E84060' }}>{v}</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="glass rounded-2xl p-6 flex flex-col gap-2 transition-all duration-300 hover:scale-[1.03] group"
              style={{ border: '1px solid rgba(45,106,79,0.2)' }}
            >
              <span className="text-3xl">{card.icon}</span>
              <span
                className="font-black text-lg tracking-wide text-white transition-colors group-hover:text-[#E84060]"
              >{card.title}</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{card.sub}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/claim"
            className="inline-block px-10 py-4 font-black text-xl text-white rounded-2xl transition-all hover:scale-105 anim-glow"
            style={{
              background: 'linear-gradient(135deg, #E84060, #c02040)',
              boxShadow: '0 8px 32px rgba(232,64,96,0.4)',
            }}
          >
            Dein Profil beanspruchen →
          </Link>
          <p className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Zeig der Stufe, was aus dir geworden ist
          </p>
        </div>

        {/* Retro visitor counter */}
        <div className="visitor-counter mt-8 text-center">
          <p style={{ fontFamily: 'Comic Sans MS', color: '#ffff00' }}>
            Sie sind Besucher Nr.{' '}
            <span className="blink" style={{ fontFamily: 'Courier New', color: '#00ff00' }}>000847</span>
          </p>
          <p className="blink" style={{ fontFamily: 'Comic Sans MS', color: '#ff00ff', fontSize: '12px' }}>
            ⭐ Best viewed in Netscape Navigator 3.0 at 800×600 ⭐
          </p>
        </div>
      </div>
    </main>
  );
}
