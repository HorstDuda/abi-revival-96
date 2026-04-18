import Image from 'next/image';
import CountdownTimer from '@/components/CountdownTimer';
import EasterEggs from '@/components/EasterEggs';

const NAV_CARDS = [
  { href: '/personen', icon: '👥', label: 'Die Stufe',   desc: '103 Absolventen · Wer, was, wo', color: '#F59E0B' },
  { href: '/spiele',   icon: '🎮', label: 'Spiele',      desc: 'Bingo, Quiz, Nokia Snake', color: '#FB7185' },
  { href: '/galerie',  icon: '📸', label: 'Galerie',     desc: 'Abizeitung · Damals & Heute', color: '#818CF8' },
  { href: '/retro',    icon: '📼', label: '1996',        desc: '90er Zeitreise · Fakten', color: '#34D399' },
];

const QUOTES = [
  { quote: '"Von Genialität bis zum Wahnsinn ist es nur ein kleiner Schritt."', person: 'Über Sönke Bartling' },
  { quote: '"200 cm Unsinn, aber im richtigen Moment."', person: 'Gerthold über Bartling' },
  { quote: '"Gell, wir sind Freunde!"', person: 'Jochen Fritz' },
  { quote: '"Dudist — von Genialität und Wahnsinn."', person: 'Abizeitung 1996' },
];

const TITLE = 'ABI REVIVAL';

export default function Home() {
  return (
    <main className="mesh-bg min-h-screen">
      <EasterEggs />

      {/* ─────────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-6"
        style={{ paddingTop: '80px' }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '10%', left: '5%',
            width: 'clamp(200px, 30vw, 500px)',
            height: 'clamp(200px, 30vw, 500px)',
            background: 'radial-gradient(circle, rgba(245,158,11,0.15), transparent 70%)',
            filter: 'blur(40px)',
            animation: 'floatY 7s ease-in-out infinite',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '10%', right: '5%',
            width: 'clamp(200px, 35vw, 550px)',
            height: 'clamp(200px, 35vw, 550px)',
            background: 'radial-gradient(circle, rgba(251,113,133,0.10), transparent 70%)',
            filter: 'blur(50px)',
            animation: 'floatY 9s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: '30%', right: '15%',
            width: 'clamp(150px, 20vw, 350px)',
            height: 'clamp(150px, 20vw, 350px)',
            background: 'radial-gradient(circle, rgba(129,140,248,0.10), transparent 70%)',
            filter: 'blur(40px)',
            animation: 'floatY 5s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />

        {/* RETRO: ASCII art */}
        <pre className="retro-ascii">
{`  █████╗ ██████╗ ██╗    ██╗ █████╗ ██╗     ████████╗
 ██╔══██╗██╔══██╗██║    ██║██╔══██╗██║        ██╔══╝
 ███████║██████╔╝██║    ██║███████║██║        ██║
 ██╔══██║██╔══██╗██║    ██║██╔══██║██║        ██║
 ██║  ██║██████╔╝██║    ██║██║  ██║███████╗   ██║
 ╚═╝  ╚═╝╚═════╝ ╚═╝    ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝`}
        </pre>

        {/* RETRO: under construction */}
        <div className="retro-construction">
          🚧 UNDER CONSTRUCTION — Komm bald wieder! 🚧
        </div>

        {/* MODERN: Hero content */}
        <div className="retro-hide text-center z-10 max-w-5xl mx-auto">
          <p
            className="anim-fade-up"
            style={{
              color: 'rgba(245,158,11,0.7)',
              fontSize: '0.78rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              animationDelay: '0.1s',
            }}
          >
            Gymnasium Marienstatt · 30 Jahre Reunion
          </p>

          <h1
            className="font-black leading-none tracking-tighter mb-8"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
            aria-label={TITLE}
          >
            {TITLE.split('').map((char, i) => (
              <span
                key={i}
                className="letter-anim"
                style={{
                  animationDelay: `${0.3 + i * 0.04}s`,
                  ...(char === ' ' ? { display: 'inline' } : {}),
                  background: 'linear-gradient(135deg, #F59E0B 0%, #FB7185 50%, #818CF8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p
            className="anim-fade-up"
            style={{
              fontSize: 'clamp(1rem,2.5vw,1.4rem)',
              color: 'rgba(241,240,239,0.5)',
              marginBottom: '3rem',
              fontWeight: '300',
              letterSpacing: '0.05em',
              animationDelay: '0.8s',
            }}
          >
            12./13. Juni 2026 · Grillhütte Schmidthahn
          </p>

          {/* Countdown */}
          <CountdownTimer />

          <p
            className="anim-fade-up mt-6"
            style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.1em', animationDelay: '1s' }}
          >
            30 Jahre — und es fühlt sich an wie gestern
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 retro-hide"
          style={{ transform: 'translateX(-50%)', animation: 'floatY 2s ease-in-out infinite' }}
        >
          <div style={{ width: '24px', height: '40px', border: '2px solid rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
            <div style={{ width: '4px', height: '8px', background: 'rgba(245,158,11,0.6)', borderRadius: '2px', animation: 'floatY 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          STATS BAR
      ───────────────────────────────────────────────── */}
      <section
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0' }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center retro-hide">
            {[
              { value: '103', label: 'Absolventen', sub: 'Abi 1996' },
              { value: '30',  label: 'Jahre',       sub: 'ein verdammt langer Weg' },
              { value: '1',   label: 'Treffen',     sub: 'das zählt' },
            ].map(({ value, label, sub }) => (
              <div key={label}>
                <div
                  className="font-black tabular-nums"
                  style={{ fontSize: 'clamp(3rem,8vw,6rem)', lineHeight: 1, background: 'linear-gradient(135deg, #F59E0B, #FB7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  {value}
                </div>
                <div style={{ color: '#F1F0EF', fontWeight: '600', fontSize: '1rem', marginTop: '0.5rem' }}>{label}</div>
                <div style={{ color: 'rgba(241,240,239,0.35)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Retro stats */}
          <div className="retro-show text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            <p>103 Schüler · 30 Jahre · 1 LEGENDÄRES TREFFEN!!!</p>
            <span className="blink">★ JETZT ANMELDEN ★</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          HERO IMAGE
      ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 retro-hide">
        <div className="container mx-auto max-w-4xl">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ aspectRatio: '16/9', boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)' }}
          >
            <Image
              src="/grafiken/hero-marienstatt-1996-vs-2026.png"
              alt="1996 vs 2026 — Marienstatt"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem' }}>
              <p style={{ color: 'rgba(245,158,11,0.8)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Damals & Heute
              </p>
              <p style={{ color: '#F1F0EF', fontWeight: '700', fontSize: 'clamp(1rem,2.5vw,1.5rem)' }}>
                Gymnasium Marienstatt · Abitur 1996
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          NAV CARDS
      ───────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <p
            className="retro-hide text-center mb-12"
            style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            Entdecken
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NAV_CARDS.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group relative rounded-2xl p-6 transition-all duration-300 retro-hide"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  textDecoration: 'none',
                  color: '#F1F0EF',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = `rgba(${card.color === '#F59E0B' ? '245,158,11' : card.color === '#FB7185' ? '251,113,133' : card.color === '#818CF8' ? '129,140,248' : '52,211,153'},0.08)`;
                  el.style.border = `1px solid ${card.color}30`;
                  el.style.transform = 'translateY(-4px) scale(1.02)';
                  el.style.boxShadow = `0 20px 60px ${card.color}20`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(255,255,255,0.03)';
                  el.style.border = '1px solid rgba(255,255,255,0.07)';
                  el.style.transform = '';
                  el.style.boxShadow = '';
                }}
              >
                {/* Gradient dot */}
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: card.color, marginBottom: '1rem', boxShadow: `0 0 12px ${card.color}80` }} />
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.icon}</div>
                <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>{card.label}</div>
                <div style={{ color: 'rgba(241,240,239,0.4)', fontSize: '0.78rem', lineHeight: '1.4' }}>{card.desc}</div>
                <div
                  style={{ position: 'absolute', bottom: '1rem', right: '1rem', color: card.color, opacity: 0, transition: 'opacity 0.2s', fontSize: '1.1rem' }}
                  className="group-hover:opacity-100"
                >
                  →
                </div>
              </a>
            ))}
          </div>

          {/* Retro nav links */}
          <div className="retro-show grid grid-cols-2 gap-4 mt-4">
            {NAV_CARDS.map((card) => (
              <a key={card.href} href={card.href} style={{ display: 'block', padding: '12px', textAlign: 'center', fontSize: '1.1rem' }}>
                {card.icon} {card.label}
                <span className="retro-neu">NEU!</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          QUOTES FROM ABIZEITUNG
      ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 retro-hide">
        <div className="container mx-auto max-w-3xl text-center">
          <p style={{ color: 'rgba(241,240,239,0.25)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '3rem' }}>
            Perlen der Abizeitung 1996
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {QUOTES.map(({ quote, person }, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 text-left"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ color: 'rgba(245,158,11,0.5)', fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>"</div>
                <p style={{ color: 'rgba(241,240,239,0.8)', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {quote.replace(/^"/, '').replace(/"$/, '')}
                </p>
                <p style={{ color: 'rgba(245,158,11,0.6)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>— {person}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          CTA
      ───────────────────────────────────────────────── */}
      <section className="py-28 px-6 text-center">
        <div className="retro-hide">
          <p style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Bist du dabei?
          </p>
          <a
            href="/claim"
            className="inline-block font-black text-xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #FB7185)',
              color: '#080808',
              padding: '1.2rem 3rem',
              borderRadius: '100px',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 0 60px rgba(245,158,11,0.4), 0 0 120px rgba(251,113,133,0.2)',
              animation: 'pulseGlow 3s ease-in-out infinite',
            }}
          >
            Dein Profil beanspruchen →
          </a>
          <p style={{ marginTop: '1.5rem', color: 'rgba(241,240,239,0.2)', fontSize: '0.8rem' }}>
            Kostenlos · Kein Passwort · Magic Link per E-Mail
          </p>
        </div>

        {/* Retro CTA */}
        <div className="retro-show">
          <p><span className="blink">★★★</span> JETZT PROFIL BEANSPRUCHEN! <span className="blink">★★★</span></p>
          <a href="/claim" style={{ fontSize: '1.3rem', display: 'block', marginTop: '12px' }}>
            HIER KLICKEN FÜR DEIN PROFIL!!!
          </a>
        </div>
      </section>
    </main>
  );
}
