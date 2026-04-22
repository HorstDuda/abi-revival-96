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

const pad = (n: number) => String(n).padStart(2, '0');

const FEATURES = [
  {
    href: '/personen',
    icon: '👥',
    title: 'Die Stufe',
    desc: '103 Gesichter. Wer ist wo gelandet? Was ist aus uns geworden?',
    cta: 'Erkunden',
    color: '#1B4332',
  },
  {
    href: '/galerie',
    icon: '📸',
    title: 'Galerie',
    desc: 'Abizeitung 1996, Fotos damals & heute — alles auf einen Blick.',
    cta: 'Ansehen',
    color: '#E84060',
  },
  {
    href: '/spiele',
    icon: '🎮',
    title: 'Spiele & Quiz',
    desc: 'Bingo, Lehrer-Quiz, Nokia Snake, DM-Preisrätsel für den Abend.',
    cta: 'Spielen',
    color: '#1B4332',
  },
  {
    href: '/timeline',
    icon: '⏳',
    title: 'Timeline',
    desc: 'Von der Einschulung 1990 bis zum Homecoming 2026 — unsere Geschichte.',
    cta: 'Entdecken',
    color: '#E84060',
  },
  {
    href: '/retro',
    icon: '📼',
    title: 'Zeitreise 1996',
    desc: 'Als das Internet jung war. Wayback Machine, DM-Preise, 90er-Fakten.',
    cta: 'Zurückreisen',
    color: '#1B4332',
  },
  {
    href: '/claim',
    icon: '✋',
    title: 'Profil sichern',
    desc: 'Trag dich ein. Beruf, Wohnort, Foto — zeig wer du heute bist.',
    cta: 'Jetzt sichern',
    color: '#E84060',
  },
];

export default function Home() {
  const cd = useCountdown(new Date('2026-06-12T18:00:00'));

  return (
    <main className="min-h-screen bg-[#f8f9fa]">

      {/* ── HERO: full-bleed photo with overlay ── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '88vh' }}>
        <Image
          src="/grafiken/hero-marienstatt-1996-vs-2026.png"
          alt="Gymnasium Marienstatt — 1996 und 2026"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(27,67,50,0.75) 100%)',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 text-center anim-fadeIn">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-8 border border-white/30"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.9)' }}
          >
            Gymnasium Marienstatt · Abi 1996
          </div>

          {/* Title */}
          <h1
            className="font-black text-white tracking-tighter leading-none mb-4"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 9rem)', textShadow: '0 4px 32px rgba(0,0,0,0.4)' }}
          >
            A(B)I <span style={{ color: '#E84060' }}>REVIVAL</span>
          </h1>

          {/* Date + location */}
          <p className="text-xl md:text-2xl font-semibold text-white/95 mb-3">
            12. &amp; 13. Juni 2026 · Grillhütte Schmidthahn
          </p>

          {/* Tagline */}
          <p className="text-base md:text-lg text-white/70 italic mb-10">
            &ldquo;Knowledge WAS King!!&rdquo; — 30 Jahre nach dem Abitur
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/claim"
              className="px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:scale-[1.03] hover:brightness-110"
              style={{ background: '#E84060', boxShadow: '0 4px 24px rgba(232,64,96,0.45)' }}
            >
              Profil beanspruchen →
            </Link>
            <Link
              href="/personen"
              className="px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:bg-white/20 border border-white/35"
              style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.1)' }}
            >
              Die Stufe erkunden
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 anim-scroll" style={{ transform: 'translateX(-50%)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="bg-white py-12 border-b border-black/[0.06]">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#9ca3af] mb-8">
            Noch bis zum Wiedersehen
          </p>
          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {[
              { v: pad(cd.days),    l: 'Tage' },
              { v: pad(cd.hours),   l: 'Stunden' },
              { v: pad(cd.minutes), l: 'Minuten' },
              { v: pad(cd.seconds), l: 'Sekunden' },
            ].map(({ v, l }) => (
              <div key={l}>
                <div
                  className="text-4xl md:text-5xl font-black tabular-nums leading-none mb-1"
                  style={{ color: '#1B4332' }}
                >
                  {v}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-[#9ca3af]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNSER MOTTO ── */}
      <section className="py-20 bg-white border-b border-black/[0.06]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#E84060' }}>
                Unser Motto
              </p>
              <h2 className="font-black text-3xl md:text-4xl text-[#111827] leading-tight mb-5">
                Knowledge<br />WAS King!!
              </h2>
              <p className="text-[#6b7280] leading-relaxed mb-5">
                Das offizielle Shirt der Stufe 1996. Der Stüssy King — damals das Symbol unserer Generation. 30 Jahre später kehrt er zurück.
              </p>
              <p className="text-[#6b7280] leading-relaxed mb-8">
                Wer zum Reunion kommt, bekommt das Shirt. Meld dich jetzt an und sichere deinen Platz.
              </p>
              <Link
                href="/claim"
                className="inline-block px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
                style={{ background: '#E84060' }}
              >
                Dabei sein →
              </Link>
            </div>
            <div className="flex justify-center">
              <div
                className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
                  width: '320px',
                  height: '380px',
                  boxShadow: '0 24px 64px rgba(27,67,50,0.25)',
                }}
              >
                <Image
                  src="/king.svg"
                  alt="Stüssy King — Abi 1996 Motto Shirt"
                  width={220}
                  height={320}
                  className="relative z-10 drop-shadow-xl"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 py-3 text-center"
                  style={{ background: '#E84060' }}
                >
                  <span className="text-white text-xs font-black tracking-[0.2em] uppercase">
                    Abi &apos;96 · Marienstatt
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-black text-3xl md:text-4xl text-[#111827] mb-3">
              Was euch erwartet
            </h2>
            <p className="text-[#6b7280] text-base max-w-md mx-auto">
              30 Jahre in Zahlen, Fotos und Geschichten — alles auf dieser Seite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="bg-white rounded-2xl p-6 border border-black/[0.07] card-hover group flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 flex-shrink-0"
                  style={{ background: `${f.color}10` }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-[#111827] text-lg mb-2 group-hover:text-[#1B4332] transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-5 flex-1">
                  {f.desc}
                </p>
                <span
                  className="text-sm font-semibold flex items-center gap-1 transition-all group-hover:gap-2"
                  style={{ color: f.color }}
                >
                  {f.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-14" style={{ background: '#1B4332' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
            {[
              { n: '103', l: 'Absolventen' },
              { n: '30',  l: 'Jahre her' },
              { n: '2',   l: 'Tage Reunion' },
              { n: '∞',   l: 'Geschichten' },
            ].map(({ n, l }) => (
              <div key={l} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-1">{n}</div>
                <div className="text-xs uppercase tracking-widest text-white/50">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT: photo + text ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/grafiken/marienstatt-monastery-school.png"
                alt="Gymnasium Marienstatt"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#1B4332] mb-4">
                30 Jahre später
              </p>
              <h2 className="font-black text-3xl md:text-4xl text-[#111827] leading-tight mb-5">
                Von Marienstatt<br />in die Welt.
              </h2>
              <p className="text-[#6b7280] leading-relaxed mb-5">
                Kloster, Internat, Abitur 1996. 103 von uns haben dort sechs Jahre ihres Lebens verbracht — jetzt kommen wir zurück, um zu sehen was aus uns geworden ist.
              </p>
              <p className="text-[#6b7280] leading-relaxed mb-8">
                Grillhütte Schmidthahn, 12. &amp; 13. Juni 2026. Beanspruche dein Profil und lass die Stufe wissen: Wer bist du 2026?
              </p>
              <Link
                href="/claim"
                className="inline-block px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
                style={{ background: '#1B4332' }}
              >
                Dabei sein →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-[#f8f9fa] border-t border-black/[0.06]">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2 className="font-black text-3xl md:text-4xl text-[#111827] mb-4">
            Noch nicht dabei?
          </h2>
          <p className="text-[#6b7280] mb-8 leading-relaxed">
            Sichere deinen Platz in der Stufen-Datenbank. Dauert 60 Sekunden.
          </p>
          <Link
            href="/claim"
            className="inline-block px-10 py-4 rounded-xl font-black text-lg text-white transition-all hover:scale-[1.02] hover:brightness-105 anim-glow"
            style={{ background: '#E84060' }}
          >
            Profil beanspruchen →
          </Link>
          <p className="mt-4 text-xs text-[#9ca3af]">
            Kein Spam · Nur ein Magic Link
          </p>
        </div>
      </section>

      {/* Retro visitor counter — hidden in modern mode */}
      <div className="visitor-counter py-4 text-center">
        <p style={{ fontFamily: 'Times New Roman, serif', color: '#000080' }}>
          Sie sind Besucher Nr.{' '}
          <span className="blink font-bold" style={{ fontFamily: 'Courier New, monospace' }}>000847</span>
        </p>
        <p className="blink mt-1" style={{ fontFamily: 'Times New Roman, serif', color: '#000080', fontSize: '13px' }}>
          ★ Best viewed in Netscape Navigator 3.0 at 800×600 ★
        </p>
      </div>
    </main>
  );
}
