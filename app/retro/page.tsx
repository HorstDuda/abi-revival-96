import Image from 'next/image';

const FACTS_1996 = [
  { category: 'Musik 🎵', items: ['Alanis Morissette – Ironic', 'Macarena – Los Del Rio', 'Oasis – Wonderwall', 'Coolio – Gangsta\'s Paradise', 'Ace of Base in den Charts'] },
  { category: 'Film & TV 🎬', items: ['Scream', 'Independence Day', 'Mission Impossible', 'Jerry Maguire', 'Buffy gegen die Vampirschreck', 'Big Brother noch nicht erfunden'] },
  { category: 'Technik 💾', items: ['Windows 95 / NT 4.0', 'Internet Explorer 3.0', 'Erste Webseiten mit Gästebüchern', 'Handys hatten kein Display vorne', 'ICQ noch nicht da', 'Nokia 1610 war modern'] },
  { category: 'Preise in DM 💰', items: ['Bier: 2,50 DM', 'Zigaretten (20er): 4,50 DM', 'Benzin: 1,35 DM/L', 'Kinokarte: 10 DM', 'McDonald\'s Burger: 2,50 DM', 'VHS-Kassette (neu): 30 DM'] },
  { category: 'Sport ⚽', items: ['Deutschland scheidet bei EM 96 im Finale aus – nein: GEWINNT!', 'Boris Becker beendet Karriere', 'Steffi Graf Wimbledon-Siegerin', 'Michael Schumacher WM-Titel'] },
  { category: 'Welt-Events 🌍', items: ['Madonnas "Evita"', 'Erste Klonversuche', 'Dolly das Schaf geklont', 'Spice Girls: "Wannabe"', 'Euro 1996 in England'] },
];

const TIMELINE = [
  { year: '1990', event: 'Einschulung (5. Klasse Marienstatt)' },
  { year: '1991', event: 'Golfkrieg · Sowjetunion löst sich auf' },
  { year: '1992', event: 'EG wird EU · Maastricht-Vertrag' },
  { year: '1993', event: '90er Boygroups auf dem Höhepunkt' },
  { year: '1994', event: 'Nirvana, Cobain · Forrest Gump' },
  { year: '1995', event: 'Windows 95 · Toy Story · Internet-Boom' },
  { year: '1996', event: 'ABITUR · Spice Girls · Dolly das Schaf' },
];

export default function RetroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-12">
      {/* Retro marquee (only visible in retro mode) */}
      <div className="retro-marquee bg-yellow-400 text-black py-2 px-4 mb-6 font-bold overflow-hidden">
        <span className="inline-block whitespace-nowrap">
          ★ WILLKOMMEN AUF MEINER HOMEPAGE ★ Abi 1996 ★ 30 JAHRE REUNION ★ BEST CLASS EVER ★ GYMNASIUM MARIENSTATT ★
        </span>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            90ER ZEITREISE
          </h1>
          <p className="text-xl text-slate-300">1996 · Als wir Marienstatt verließen</p>
          <p className="text-slate-500 text-sm mt-2">
            Aktiviere den 💾 90s Modus (Button unten rechts) für das volle Geocities-Erlebnis
          </p>
        </div>

        {/* Hero image */}
        <div className="relative aspect-video max-w-2xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/grafiken/retro-90s-graduation.png"
            alt="Retro 90s Graduation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-bold text-lg">Abitur 1996 · Gymnasium Marienstatt</p>
            <p className="text-slate-300 text-sm">30 Jahre ist es her — Zeit für eine Zeitreise</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">Unsere Schuljahre</h2>
          <div className="relative border-l-2 border-slate-600 pl-6 space-y-6">
            {TIMELINE.map((entry) => (
              <div key={entry.year} className="relative">
                <div className="absolute -left-8 w-4 h-4 rounded-full bg-pink-500 border-2 border-slate-900 top-1" />
                <div className="flex gap-4 items-start">
                  <span className="text-pink-400 font-black text-lg w-12 flex-shrink-0">{entry.year}</span>
                  <p className="text-slate-300 pt-0.5">{entry.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech then vs now */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">Technik: Damals vs. Heute</h2>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/grafiken/1996-internet-vs-2026-ai.png"
              alt="1996 Internet vs 2026 AI"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <h3 className="font-bold text-yellow-400 mb-2">1996</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>💾 Floppy Disk (1,44 MB)</li>
                <li>🌐 56k Modem</li>
                <li>📱 Nokia ohne Kamera</li>
                <li>💻 Pentium 166 MHz</li>
                <li>📧 Eine E-Mail-Adresse war exotisch</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <h3 className="font-bold text-cyan-400 mb-2">2026</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>☁️ Terabytes in der Cloud</li>
                <li>📡 5G / Glasfaser</li>
                <li>📱 Supercomputer in der Tasche</li>
                <li>🤖 KI-Assistenten überall</li>
                <li>🔗 Blockchain für Wissenschaft</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Facts grid */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-orange-400">1996 in Zahlen &amp; Fakten</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACTS_1996.map((block) => (
              <div key={block.category} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 card-retro">
                <h3 className="font-bold text-lg mb-3 text-pink-400">{block.category}</h3>
                <ul className="space-y-1.5">
                  {block.items.map((item) => (
                    <li key={item} className="text-sm text-slate-300 flex gap-2">
                      <span className="text-slate-600">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Zeitkapsel */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl mb-6">
            <Image
              src="/grafiken/zeitkapsel.png"
              alt="Zeitkapsel"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-yellow-400">Die Zeitkapsel</h2>
          <p className="text-slate-400 mb-6">
            Was würdest du deinem 18-jährigen Ich sagen? Schreib eine Nachricht für die nächsten 30 Jahre.
          </p>
          <textarea
            placeholder="Liebe/r [Vorname], in 30 Jahren wirst du..."
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-pink-500 min-h-[120px] resize-none"
            readOnly
          />
          <button className="mt-3 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-bold transition">
            Einschließen (coming soon)
          </button>
        </div>
      </div>
    </main>
  );
}
