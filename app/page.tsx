'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  { href: '/personen', icon: '👥', title: 'Personen',  sub: 'Wer, was, wo' },
  { href: '/spiele',   icon: '🎮', title: 'Spiele',    sub: 'Bingo · Quiz · Voting' },
  { href: '/galerie',  icon: '📸', title: 'Galerie',   sub: 'Damals & Heute' },
  { href: '/retro',    icon: '📼', title: '1996',      sub: '90er Zeitreise' },
  { href: '/timeline', icon: '⏳', title: 'Timeline',  sub: '1990 → 2026' },
  { href: '/claim',    icon: '✋', title: 'Profil',    sub: 'Deinen Platz sichern' },
];

const pad = (n: number) => String(n).padStart(2, '0');

export default function Home() {
  const cd = useCountdown(new Date('2026-06-12T18:00:00'));

  return (
    <main className="min-h-screen bg-[#f8f9fa]">

      {/* Hero */}
      <section className="bg-white border-b border-black/[0.06]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#2D6A4F] mb-6">
              Gymnasium Marienstatt · Homecoming 2026
            </p>

            <h1
              className="font-black leading-none tracking-tighter mb-3"
              style={{ fontSize: 'clamp(4rem, 14vw, 10rem)', color: '#111827' }}
            >
              A<span style={{ color: '#E84060' }}>(B)</span>I
            </h1>
            <h2
              className="font-black leading-none tracking-tight mb-10"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)', color: '#2D6A4F' }}
            >
              REVIVAL
            </h2>
          </div>

          {/* King figure — the visual anchor */}
          <div className="flex justify-center mb-10">
            <div className="relative anim-float">
              <Image
                src="/king.svg"
                alt="Stüssy King — Knowledge Was King"
                width={320}
                height={480}
                className="w-56 md:w-72 lg:w-80 drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mb-10">
            <p className="text-sm line-through text-[#9ca3af] mb-1 font-mono">
              &ldquo;Knowledge IS King!!&rdquo; — 1996
            </p>
            <p
              className="font-black text-2xl md:text-3xl tracking-tight"
              style={{ color: '#E84060' }}
            >
              &ldquo;Knowledge WAS King!!&rdquo; — 2026
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-10 justify-center">
            {[{ n: '103', l: 'Absolventen' }, { n: '30', l: 'Jahre' }, { n: '1', l: 'Homecoming' }].map(({ n, l }) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black" style={{ color: '#2D6A4F' }}>{n}</div>
                <div className="text-xs uppercase tracking-wider text-[#9ca3af] mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">

        {/* Countdown */}
        <div className="glass rounded-2xl p-6 max-w-xl mx-auto mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9ca3af] mb-5">
            Bis zum Homecoming · 12. Juni 2026 · Grillhütte Schmidthahn
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[{ v: pad(cd.days), l: 'Tage' }, { v: pad(cd.hours), l: 'Stunden' }, { v: pad(cd.minutes), l: 'Minuten' }, { v: pad(cd.seconds), l: 'Sekunden' }].map(({ v, l }) => (
              <div key={l} className="bg-[#f8f9fa] rounded-xl p-3 border border-black/[0.06]">
                <div className="text-3xl md:text-4xl font-black tabular-nums" style={{ color: '#E84060' }}>{v}</div>
                <div className="text-xs text-[#9ca3af] mt-0.5 uppercase tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="glass rounded-2xl p-5 flex flex-col gap-2 transition-all duration-200 hover:shadow-md hover:border-[#2D6A4F]/30 group"
            >
              <span className="text-3xl">{card.icon}</span>
              <span className="font-bold text-base text-[#111827] group-hover:text-[#2D6A4F] transition-colors">
                {card.title}
              </span>
              <span className="text-xs text-[#9ca3af]">{card.sub}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/claim"
            className="inline-block px-10 py-4 font-black text-lg text-white rounded-xl transition-all hover:opacity-90 hover:scale-[1.02] anim-glow"
            style={{ background: '#E84060' }}
          >
            Dein Profil beanspruchen →
          </Link>
          <p className="mt-3 text-xs text-[#9ca3af]">
            Zeig der Stufe, was aus dir geworden ist
          </p>
        </div>

        {/* Retro visitor counter — hidden in modern mode */}
        <div className="visitor-counter mt-8 text-center">
          <p style={{ fontFamily: 'Times New Roman, serif', color: '#000080' }}>
            Sie sind Besucher Nr.{' '}
            <span className="blink font-bold" style={{ fontFamily: 'Courier New, monospace', color: '#000080' }}>000847</span>
          </p>
          <p className="blink mt-1" style={{ fontFamily: 'Times New Roman, serif', color: '#000080', fontSize: '13px' }}>
            ★ Best viewed in Netscape Navigator 3.0 at 800×600 ★
          </p>
        </div>
      </div>
    </main>
  );
}
