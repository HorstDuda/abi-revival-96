import Image from 'next/image';

const FACTS_1996 = [
  { category: 'Musik 🎵', color: '#F59E0B', items: ['Alanis Morissette – Ironic', 'Macarena – Los Del Rio', 'Oasis – Wonderwall', "Coolio – Gangsta's Paradise", 'Spice Girls – Wannabe', 'Ace of Base in den Charts'] },
  { category: 'Film & TV 🎬', color: '#FB7185', items: ['Scream', 'Independence Day', 'Mission Impossible', 'Jerry Maguire', 'Big Brother noch nicht erfunden'] },
  { category: 'Technik 💾', color: '#818CF8', items: ['Windows 95 / NT 4.0', 'Internet Explorer 3.0', 'ICQ noch nicht erfunden', 'Nokia 1610 war modern', 'Floppy Disk: 1,44 MB', 'Erste Webseiten mit Gästebüchern'] },
  { category: 'Preise in DM 💰', color: '#34D399', items: ['Bier: 2,50 DM', 'Zigaretten (20er): 4,50 DM', 'Benzin: 1,35 DM/L', 'Kinokarte: 10 DM', "McDonald's: 2,50 DM", 'VHS-Kassette: ~30 DM'] },
  { category: 'Sport ⚽', color: '#F59E0B', items: ['Deutschland GEWINNT EM 96!', 'Boris Becker beendet Karriere', 'Steffi Graf – Wimbledon-Siegerin', 'Michael Schumacher WM-Titel'] },
  { category: 'Welt-Events 🌍', color: '#FB7185', items: ["Madonna's 'Evita'", 'Dolly das Schaf geklont', 'Euro 1996 in England', 'Spice Girls: "Wannabe"', 'Erste Klonversuche'] },
];

const TIMELINE = [
  { year: '1990', event: 'Einschulung (5. Klasse Marienstatt) · Wiedervereinigung Deutschlands' },
  { year: '1991', event: 'Golfkrieg · Sowjetunion löst sich auf · Nirvana – Nevermind' },
  { year: '1992', event: 'EG wird EU · Maastricht-Vertrag · Euro Disney eröffnet' },
  { year: '1993', event: '90er Boygroups auf dem Höhepunkt · Eurotunnel im Bau' },
  { year: '1994', event: 'Cobain stirbt · Forrest Gump · Windows 3.11 · Nelson Mandela Präsident' },
  { year: '1995', event: 'Windows 95 · Toy Story · Internet-Boom · eBay gegründet' },
  { year: '1996', event: 'ABITUR ★ · Spice Girls · Dolly das Schaf · EM-Sieg Deutschland' },
];

export default function RetroPage() {
  return (
    <main className="mesh-bg min-h-screen py-16 px-6">

      {/* ─── RETRO MARQUEE ─── */}
      <div className="retro-marquee">
        <div className="retro-marquee-inner">
          ★ ZEITREISE INS JAHR 1996 ★ ALS WIR MARIENSTATT VERLIESSEN ★
          56K MODEM ★ WINDOWS 95 ★ FLOPPY DISK ★ NOKIA 1610 ★
          EM-SIEG DEUTSCHLAND ★ SPICE GIRLS ★ DOLLY DAS SCHAF ★
        </div>
      </div>

      <div className="container mx-auto max-w-5xl">

        {/* ─── HEADER ─── */}
        <div className="text-center mb-20">
          <div className="retro-show mb-8">
            <div className="retro-construction">🚧 1996 ZEITMASCHINE — BITTE WARTEN 🚧</div>
          </div>

          <p
            className="retro-hide"
            style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1rem' }}
          >
            Marienstatt 1990–1996
          </p>
          <h1
            className="retro-hide font-black"
            style={{
              fontSize: 'clamp(3rem,10vw,7rem)',
              background: 'linear-gradient(135deg, #F59E0B 0%, #FB7185 50%, #818CF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            90er Zeitreise
          </h1>
          <p className="retro-hide" style={{ color: 'rgba(241,240,239,0.4)', fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
            1996 — als wir Marienstatt verließen. Was die Welt damals bewegte.
          </p>
          <p className="retro-hide" style={{ fontSize: '0.8rem', color: 'rgba(241,240,239,0.2)', fontStyle: 'italic' }}>
            Aktiviere unten rechts den 📺 90s Modus für das volle Geocities-Erlebnis.
          </p>

          <h1 className="retro-show">⏰ 90ER ZEITREISE ⏰</h1>
        </div>

        {/* ─── HERO IMAGE ─── */}
        <div
          className="relative retro-hide mb-20"
          style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '16/9', boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)' }}
        >
          <Image
            src="/grafiken/retro-90s-graduation.png"
            alt="Retro 90s Graduation"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
            <p style={{ color: 'rgba(245,158,11,0.8)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Damals</p>
            <p style={{ color: '#F1F0EF', fontWeight: '700', fontSize: 'clamp(1rem,2.5vw,1.5rem)' }}>Abitur 1996 · Gymnasium Marienstatt</p>
            <p style={{ color: 'rgba(241,240,239,0.5)', fontSize: '0.9rem' }}>30 Jahre ist es her — Zeit für eine Zeitreise</p>
          </div>
        </div>

        {/* ─── TIMELINE ─── */}
        <div className="mb-20 max-w-2xl mx-auto">
          <p className="retro-hide" style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Unsere Schuljahre
          </p>
          <h2 className="retro-show">Unsere Schuljahre:</h2>

          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* Timeline line */}
            <div
              className="retro-hide"
              style={{ position: 'absolute', left: '0', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, rgba(245,158,11,0.6), rgba(251,113,133,0.2))' }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {TIMELINE.map((entry, i) => (
                <div key={entry.year} style={{ position: 'relative' }}>
                  {/* Dot */}
                  <div
                    className="retro-hide"
                    style={{
                      position: 'absolute',
                      left: '-2.4rem',
                      top: '4px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: entry.year === '1996' ? 'linear-gradient(135deg, #F59E0B, #FB7185)' : 'rgba(255,255,255,0.2)',
                      border: entry.year === '1996' ? 'none' : '2px solid rgba(255,255,255,0.1)',
                      boxShadow: entry.year === '1996' ? '0 0 16px rgba(245,158,11,0.6)' : 'none',
                    }}
                  />

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontWeight: '900',
                        fontSize: entry.year === '1996' ? '1.2rem' : '0.92rem',
                        color: entry.year === '1996' ? '#F59E0B' : 'rgba(241,240,239,0.4)',
                        flexShrink: 0,
                        width: '3rem',
                        letterSpacing: '-0.02em',
                        fontFamily: 'var(--font-geist-mono)',
                      }}
                    >
                      {entry.year}
                    </span>
                    <p style={{ color: entry.year === '1996' ? '#F1F0EF' : 'rgba(241,240,239,0.65)', fontSize: '0.88rem', lineHeight: 1.5, paddingTop: '1px' }}>
                      {entry.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── TECH COMPARISON ─── */}
        <div className="mb-20 retro-hide">
          <div
            className="relative"
            style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '16/9', marginBottom: '1.25rem', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
          >
            <Image
              src="/grafiken/1996-internet-vs-2026-ai.png"
              alt="1996 Internet vs 2026 AI"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { year: '1996', color: '#F59E0B', items: ['💾 Floppy Disk (1,44 MB)', '🌐 56k Modem', '📱 Nokia ohne Kamera', '💻 Pentium 166 MHz', '📧 E-Mail war exotisch'] },
              { year: '2026', color: '#818CF8', items: ['☁️ Terabytes in der Cloud', '📡 5G / Glasfaser', '📱 Supercomputer in der Tasche', '🤖 KI-Assistenten überall', '🔗 Always-on, alles überall'] },
            ].map(({ year, color, items }) => (
              <div
                key={year}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.25rem' }}
              >
                <h3 style={{ fontWeight: '800', color, marginBottom: '0.75rem', fontSize: '1rem' }}>{year}</h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {items.map((item) => (
                    <li key={item} style={{ fontSize: '0.82rem', color: 'rgba(241,240,239,0.6)' }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FACTS GRID ─── */}
        <div className="mb-20">
          <p className="retro-hide" style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            1996 in Zahlen
          </p>
          <h2 className="retro-show">1996 in Fakten:</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {FACTS_1996.map((block) => (
              <div
                key={block.category}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${block.color}20`,
                  borderRadius: '16px',
                  padding: '1.25rem',
                }}
              >
                <h3 style={{ fontWeight: '700', fontSize: '0.9rem', color: block.color, marginBottom: '0.75rem' }}>
                  {block.category}
                </h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {block.items.map((item) => (
                    <li key={item} style={{ fontSize: '0.8rem', color: 'rgba(241,240,239,0.55)', display: 'flex', gap: '6px' }}>
                      <span style={{ color: `${block.color}50` }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─── ZEITKAPSEL ─── */}
        <div className="text-center">
          <div
            className="relative retro-hide mx-auto mb-8"
            style={{ maxWidth: '400px', borderRadius: '20px', overflow: 'hidden', aspectRatio: '1', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}
          >
            <Image src="/grafiken/zeitkapsel.png" alt="Zeitkapsel" fill className="object-cover" sizes="400px" />
          </div>

          <h2
            className="retro-hide font-black mb-4"
            style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: '#F59E0B' }}
          >
            Die Zeitkapsel
          </h2>
          <h2 className="retro-show">⏳ DIE ZEITKAPSEL ⏳</h2>

          <p className="retro-hide" style={{ color: 'rgba(241,240,239,0.4)', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            Was würdest du deinem 18-jährigen Ich sagen? Schreib eine Nachricht für die nächsten 30 Jahre.
          </p>

          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <textarea
              placeholder="Liebe/r [Vorname], in 30 Jahren wirst du..."
              readOnly
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                color: 'rgba(241,240,239,0.5)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                minHeight: '120px',
                resize: 'none',
                outline: 'none',
                display: 'block',
                fontFamily: 'inherit',
                marginBottom: '0.75rem',
              }}
            />
            <button
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #FB7185)',
                color: '#080808',
                border: 'none',
                borderRadius: '100px',
                padding: '0.75rem 2rem',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Einschließen (coming soon)
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
