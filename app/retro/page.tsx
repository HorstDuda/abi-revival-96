import Image from 'next/image';

const TIMELINE = [
  {
    year: '1990',
    title: 'Der Anfang',
    event: 'Einschulung — Klasse 5 am Gymnasium Marienstatt',
    world: 'Deutsche Wiedervereinigung · Helmut Kohl',
    color: '#818cf8',
  },
  {
    year: '1991',
    title: 'Unsicherheit',
    event: 'Erster Jahrgang nach der Wende — neue Zeiten',
    world: 'Golfkrieg · Sowjetunion löst sich auf',
    color: '#a78bfa',
  },
  {
    year: '1992',
    title: 'Europa wächst',
    event: 'Mittelstufe — erste Freundschaften fürs Leben',
    world: 'EG wird EU · Maastricht-Vertrag',
    color: '#c084fc',
  },
  {
    year: '1993',
    title: 'Boyband-Ära',
    event: 'Grunge vs. Eurodance — Kassetten-Tausch im Schulbus',
    world: 'Take That · East 17 · Nirvana',
    color: '#f472b6',
  },
  {
    year: '1994',
    title: 'Grunge & Trauer',
    event: 'Musik prägt uns — die 90er auf ihrem Höhepunkt',
    world: 'Cobain · Forrest Gump · Pulp Fiction',
    color: '#fb7185',
  },
  {
    year: '1995',
    title: 'Die digitale Wende',
    event: 'Oberstufe beginnt — erster E-Mail-Account',
    world: 'Windows 95 · Toy Story · Oasis Wonderwall',
    color: '#f97316',
  },
  {
    year: '1996',
    title: 'ABITUR ✓',
    event: 'Wir verlassen Marienstatt — und die Welt liegt vor uns',
    world: 'Spice Girls · Dolly das Schaf · EM-Sieg in England',
    color: '#f59e0b',
  },
];

const FACTS_1996 = [
  {
    category: 'Musik',
    emoji: '🎵',
    items: ['Alanis Morissette – Ironic', 'Macarena – Los Del Rio', 'Oasis – Wonderwall', "Coolio – Gangsta's Paradise", 'Spice Girls – Wannabe', 'Ace of Base in den Charts'],
    color: '#818cf8',
  },
  {
    category: 'Film & TV',
    emoji: '🎬',
    items: ['Scream', 'Independence Day', 'Mission Impossible', 'Jerry Maguire', 'Buffy gegen die Vampirschreck', 'Big Brother noch nicht erfunden'],
    color: '#ec4899',
  },
  {
    category: 'Technik',
    emoji: '💾',
    items: ['Windows 95 / NT 4.0', 'Internet Explorer 3.0', 'Erste Webseiten mit Gästebüchern', 'Handys hatten kein Display vorne', 'ICQ noch nicht da', 'Nokia 1610 war modern'],
    color: '#22d3ee',
  },
  {
    category: 'Preise in DM',
    emoji: '💰',
    items: ["Bier: 2,50 DM", 'Zigaretten: 4,50 DM', 'Benzin: 1,35 DM/L', 'Kinokarte: 10 DM', "McDonald's: 2,50 DM", 'VHS-Kassette: 30 DM'],
    color: '#f59e0b',
  },
  {
    category: 'Sport',
    emoji: '⚽',
    items: ['Deutschland gewinnt EM 1996!', 'Boris Becker beendet Karriere', 'Steffi Graf Wimbledon', 'Michael Schumacher WM-Titel', 'Oliver Kahn — Titan', 'Matthäus sagt Tschüss'],
    color: '#10b981',
  },
  {
    category: 'Welt-Events',
    emoji: '🌍',
    items: ["Madonnas \"Evita\"", 'Dolly das Schaf geklont', 'Euro 1996 in England', 'Yeltsin gewinnt in Russland', 'Tupac erschossen', 'Tschernobyl — 10 Jahre danach'],
    color: '#f97316',
  },
];

export default function RetroPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Ambient orbs */}
      <div className="orb animate-glow" style={{width:500,height:500,top:'-10%',left:'-10%',background:'radial-gradient(circle,rgba(245,158,11,0.2),transparent 70%)'}} />
      <div className="orb animate-glow delay-400" style={{width:400,height:400,bottom:'10%',right:'-5%',background:'radial-gradient(circle,rgba(236,72,153,0.15),transparent 70%)'}} />

      {/* Retro marquee */}
      <div className="retro-marquee bg-yellow-400 text-black py-1 font-bold text-sm">
        <marquee scrollamount="5">
          ★ WILLKOMMEN AUF MEINER HOMEPAGE ★ ABI 1996 ★ GYMNASIUM MARIENSTATT ★ BEST CLASS EVER ★
          WIR SIND DIE GRÖSSTEN ★ UNTER CONSTRUCTION ★ PLEASE WAIT LOADING... ★
        </marquee>
      </div>

      <div className="relative z-10">

        {/* ── HEADER ── */}
        <section className="px-4 pt-16 pb-12 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-4">Zeitmaschine</p>
          <h1 className="text-[clamp(3rem,12vw,7rem)] font-black tracking-tighter mb-4">
            <span className="gradient-text-gold">90er</span>
            <span className="text-white/20"> </span>
            <span className="gradient-text-cool">Zeitreise</span>
          </h1>
          <p className="text-lg text-white/60">1996 · Als wir Marienstatt verließen</p>
          <p className="text-sm text-white/25 mt-2">
            Aktiviere den 💾 90s Modus (Button unten rechts) für das volle Geocities-Erlebnis
          </p>
        </section>

        {/* ── HERO IMAGE ── */}
        <section className="px-4 max-w-3xl mx-auto mb-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{aspectRatio:'16/9',boxShadow:'0 40px 80px rgba(0,0,0,0.5)'}}>
            <Image src="/grafiken/retro-90s-graduation.png" alt="Retro 90s Graduation" fill className="object-cover" />
            <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(7,11,20,0.8) 0%, transparent 60%)'}} />
            <div className="absolute bottom-5 left-6 right-6">
              <p className="text-white font-black text-xl drop-shadow-lg">Abitur 1996 · Gymnasium Marienstatt</p>
              <p className="text-white/60 text-sm mt-1">30 Jahre ist es her — Zeit für eine Zeitreise</p>
            </div>
          </div>
        </section>

        {/* ── HORIZONTAL TIMELINE ── */}
        <section className="mb-20">
          <div className="px-4 mb-8">
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-2">Unsere Schuljahre</p>
            <h2 className="text-3xl font-black gradient-text-gold">Die Reise 1990 – 1996</h2>
          </div>

          {/* Horizontal scroll container */}
          <div className="timeline-track px-6" style={{paddingBottom:'1.5rem'}}>
            {/* Left spacer */}
            <div className="flex-shrink-0 w-4" />

            {TIMELINE.map((entry, i) => (
              <div
                key={entry.year}
                className="timeline-item relative flex-shrink-0"
                style={{width: 'clamp(240px, 30vw, 320px)', paddingRight:'1.5rem'}}
              >
                {/* Connector line */}
                {i < TIMELINE.length - 1 && (
                  <div
                    className="absolute top-8 left-full -translate-x-0 h-px z-0"
                    style={{width:'1.5rem', background:`linear-gradient(90deg,${entry.color}44,${TIMELINE[i+1].color}44)`}}
                  />
                )}

                <div
                  className="relative rounded-2xl p-5 h-full transition-all hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${entry.color}12, ${entry.color}06)`,
                    border: `1px solid ${entry.color}30`,
                    boxShadow: `0 8px 32px ${entry.color}10`,
                  }}
                >
                  {/* Year badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-widest mb-3"
                    style={{ background: `${entry.color}20`, color: entry.color }}
                  >
                    {entry.year}
                    {entry.year === '1996' && <span className="animate-pulse">★</span>}
                  </div>

                  <h3 className="font-bold text-base text-white mb-1">{entry.title}</h3>
                  <p className="text-sm text-white/65 leading-snug mb-3">{entry.event}</p>
                  <p className="text-xs text-white/30 leading-snug italic">{entry.world}</p>
                </div>
              </div>
            ))}

            {/* Right spacer */}
            <div className="flex-shrink-0 w-4" />
          </div>

          {/* Scroll hint */}
          <p className="text-center text-white/20 text-xs mt-3">← Scrollen →</p>
        </section>

        {/* ── TECH THEN VS NOW ── */}
        <section className="px-4 max-w-4xl mx-auto mb-20">
          <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-2">Der Wandel</p>
          <h2 className="text-3xl font-black mb-8 gradient-text-cool">Technik: Damals vs. Heute</h2>
          <div className="relative rounded-2xl overflow-hidden mb-6 shadow-2xl" style={{aspectRatio:'16/9'}}>
            <Image src="/grafiken/1996-internet-vs-2026-ai.png" alt="1996 Internet vs 2026 AI" fill className="object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { year: '1996', color: '#f59e0b', items: ['💾 Floppy Disk (1,44 MB)', '🌐 56k Modem', '📱 Nokia ohne Kamera', '💻 Pentium 166 MHz', '📧 E-Mail war exotisch'] },
              { year: '2026', color: '#22d3ee', items: ['☁️ Terabytes in der Cloud', '📡 5G / Glasfaser', '📱 Supercomputer in der Tasche', '🤖 KI-Assistenten überall', '🔗 Blockchain & DeSci'] },
            ].map(({ year, color, items }) => (
              <div
                key={year}
                className="rounded-xl p-5"
                style={{ background: `${color}0d`, border: `1px solid ${color}25` }}
              >
                <h3 className="font-black text-sm tracking-widest mb-3" style={{ color }}>{year}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="text-xs text-white/60">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 1996 FACTS GRID ── */}
        <section className="px-4 max-w-5xl mx-auto mb-20">
          <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-2">Das Jahr</p>
          <h2 className="text-3xl font-black mb-8 gradient-text">1996 in Zahlen &amp; Fakten</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACTS_1996.map((block) => (
              <div
                key={block.category}
                className="card-retro rounded-2xl p-5 transition-all hover:scale-[1.02]"
                style={{
                  background: `${block.color}0d`,
                  border: `1px solid ${block.color}25`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{block.emoji}</span>
                  <h3 className="font-bold text-base" style={{ color: block.color }}>{block.category}</h3>
                </div>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="text-sm text-white/55 flex gap-2">
                      <span style={{ color: `${block.color}60` }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── ZEITKAPSEL ── */}
        <section className="px-4 max-w-2xl mx-auto pb-20 text-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 mx-auto" style={{aspectRatio:'1/1',maxWidth:300}}>
            <Image src="/grafiken/zeitkapsel.png" alt="Zeitkapsel" fill className="object-cover" />
            <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(7,11,20,0.6),transparent)'}} />
          </div>

          <h2 className="text-3xl font-black mb-3 gradient-text-gold">Die Zeitkapsel</h2>
          <p className="text-white/45 mb-6 leading-relaxed">
            Was würdest du deinem 18-jährigen Ich sagen?<br />
            Schreib eine Nachricht für die nächsten 30 Jahre.
          </p>
          <textarea
            placeholder="Liebe/r [Vorname], in 30 Jahren wirst du..."
            readOnly
            className="w-full min-h-[120px] resize-none text-white/60 placeholder-white/20 text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
            }}
          />
          <button
            className="mt-4 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', color: '#000' }}
          >
            Einschließen (coming soon)
          </button>
        </section>
      </div>
    </main>
  );
}
