'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TARGET = new Date('2026-06-12T16:00:00+02:00');

function pad(n: number) {
  return String(n).padStart(2, '0');
}

const NAV_CARDS = [
  {
    href: '/personen',
    icon: '👥',
    label: 'Personen',
    sub: 'Wer, was, wo sind sie jetzt',
    gradient: 'from-pink-600/20 to-rose-600/20',
    glow: 'rgba(236,72,153,0.15)',
    border: 'rgba(236,72,153,0.3)',
  },
  {
    href: '/spiele',
    icon: '🎮',
    label: 'Spiele',
    sub: 'Bingo, Quiz, Nokia Snake',
    gradient: 'from-violet-600/20 to-indigo-600/20',
    glow: 'rgba(124,58,237,0.15)',
    border: 'rgba(124,58,237,0.3)',
  },
  {
    href: '/galerie',
    icon: '📸',
    label: 'Galerie',
    sub: 'Damals vs. Heute',
    gradient: 'from-cyan-600/20 to-blue-600/20',
    glow: 'rgba(6,182,212,0.15)',
    border: 'rgba(6,182,212,0.3)',
  },
  {
    href: '/retro',
    icon: '📼',
    label: '1996',
    sub: '90er Zeitreise',
    gradient: 'from-amber-600/20 to-orange-600/20',
    glow: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.3)',
  },
];

export default function Home() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">

      {/* Ambient background orbs */}
      <div className="orb orb-pink animate-glow" style={{ width: 600, height: 600, top: '-15%', left: '-10%' }} />
      <div className="orb orb-violet animate-glow delay-300" style={{ width: 500, height: 500, top: '20%', right: '-10%' }} />
      <div className="orb orb-indigo animate-glow delay-600" style={{ width: 400, height: 400, bottom: '10%', left: '30%' }} />

      {/* Retro marquee (only shows in retro mode) */}
      <div className="retro-marquee bg-yellow-400 text-black py-1 font-bold text-sm">
        <marquee scrollamount="6">
          ★ WILLKOMMEN AUF MEINER HOMEPAGE ★ ABI 1996 ★ 30 JAHRE REUNION ★ BEST CLASS EVER ★ GYMNASIUM MARIENSTATT ★ 12./13. JUNI 2026 ★ GRILLHÜTTE SCHMIDTHAHN ★
        </marquee>
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[92vh] px-4 text-center pb-8">

        {/* Eyebrow label */}
        <div
          className={`animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-8`}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(241,245,249,0.6)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          Gymnasium Marienstatt · 30 Jahre
        </div>

        {/* Main headline */}
        <h1
          className="animate-fade-in-up delay-100 text-[clamp(4rem,16vw,9rem)] font-black tracking-tighter leading-none mb-3"
        >
          <span className="gradient-text">ABI</span>
          <span style={{ color: 'rgba(241,245,249,0.15)' }}>&apos;</span>
          <span className="gradient-text-cool">96</span>
        </h1>

        <p className="animate-fade-in-up delay-200 text-[clamp(1.1rem,3vw,1.5rem)] font-semibold text-white/70 tracking-wide mb-2">
          Reunion · 12./13. Juni 2026
        </p>
        <p className="animate-fade-in-up delay-300 text-sm text-white/35 tracking-widest uppercase mb-12">
          Grillhütte Schmidthahn · Westerwald
        </p>

        {/* Countdown */}
        {mounted && (
          <div
            className="animate-fade-in-up delay-400 flex gap-3 sm:gap-5 mb-12"
            data-countdown
          >
            {[
              { v: time.d, label: 'Tage' },
              { v: time.h, label: 'Std' },
              { v: time.m, label: 'Min' },
              { v: time.s, label: 'Sek' },
            ].map(({ v, label }, i) => (
              <div
                key={label}
                className="glass flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
                style={{
                  background: i === 3 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)',
                }}
              >
                <span className="font-mono font-black text-xl sm:text-2xl leading-none text-white">
                  {i === 0 ? v : pad(v)}
                </span>
                <span className="text-[10px] text-white/35 uppercase tracking-widest mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row gap-3">
          <Link
            href="/claim"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
              boxShadow: '0 8px 32px rgba(236,72,153,0.35), 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            Profil beanspruchen
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/personen"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white/70 transition-all hover:text-white hover:scale-105 glass"
          >
            Alle Personen →
          </Link>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="relative z-10 px-4 max-w-3xl mx-auto mb-20">
        <div
          className="animate-scale-in delay-600 relative rounded-2xl overflow-hidden shadow-2xl"
          style={{ aspectRatio: '16/9', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' }}
        >
          <Image
            src="/grafiken/hero-marienstatt-1996-vs-2026.png"
            alt="Marienstatt 1996 vs 2026"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(7,11,20,0.7) 0%, transparent 50%)' }}
          />
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-white font-bold text-lg drop-shadow-lg">30 Jahre — wo sind wir jetzt?</p>
            <p className="text-white/60 text-sm">Marienstatt 1996 · Reunion 2026</p>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION CARDS ── */}
      <section className="relative z-10 px-4 max-w-4xl mx-auto mb-24">
        <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-white/30 mb-6">
          Entdecken
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {NAV_CARDS.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className={`animate-fade-in-up group relative p-5 rounded-2xl transition-all hover:scale-[1.03] hover:-translate-y-1 active:scale-95`}
              style={{
                animationDelay: `${0.2 + i * 0.08}s`,
                background: `linear-gradient(135deg, ${card.gradient.replace('from-', '').replace(' to-', ', ')})`,
                border: `1px solid ${card.border}`,
                boxShadow: `0 8px 32px ${card.glow}`,
              }}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-base text-white mb-1">{card.label}</h3>
              <p className="text-xs text-white/50 leading-snug">{card.sub}</p>
              <div className="absolute top-3 right-3 text-white/20 group-hover:text-white/50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FOOTER TEASER ── */}
      <section className="relative z-10 text-center pb-16 px-4">
        <p className="text-white/20 text-sm">
          <span className="font-mono text-white/10">Abi 1996</span>
          {' · '}
          Gymnasium Marienstatt
          {' · '}
          <span className="text-pink-500/60">30-Jahre-Reunion</span>
        </p>
      </section>
    </main>
  );
}
