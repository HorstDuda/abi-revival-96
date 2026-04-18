import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import RetroToggle from "@/components/RetroToggle";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABI REVIVAL — Marienstatt 1996",
  description: "30 Jahre Reunion · Gymnasium Marienstatt · Abi 1996 · Treffen 12./13. Juni 2026",
};

const NAV_LINKS = [
  { href: "/personen", label: "Personen" },
  { href: "/spiele",   label: "Spiele" },
  { href: "/galerie",  label: "Galerie" },
  { href: "/retro",    label: "1996" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: '#080808', color: '#F1F0EF' }}>

        {/* ─── RETRO MARQUEE (only visible in retro mode) ─── */}
        <div className="retro-marquee">
          <div className="retro-marquee-inner">
            ★★★ WILLKOMMEN AUF DER HOMEPAGE DES JAHRGANGS 1996 ★★★ GYMNASIUM MARIENSTATT ★★★
            30 JAHRE REUNION ★★★ 12./13. JUNI 2026 ★★★ BEST CLASS EVER ★★★
            BITTE JAVASCRIPT AKTIVIEREN ★★★ NETSCAPE NAVIGATOR 3.0 EMPFOHLEN ★★★
            BESUCHER ZÄHLER LÄUFT ★★★
          </div>
        </div>

        {/* ─── NAVIGATION ─── */}
        <nav
          className="sticky top-0 z-50 glass"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="container mx-auto px-5">
            <div className="flex items-center h-14 gap-1">

              {/* Brand */}
              <Link
                href="/"
                className="flex-shrink-0 font-black text-xl mr-4 tracking-tight text-gradient retro-hide"
              >
                ABI&apos;96
              </Link>

              {/* Retro brand */}
              <span className="retro-show flex-shrink-0 mr-4" style={{ fontFamily: 'Comic Sans MS, cursive', fontWeight: 'bold', fontSize: '1.1rem' }}>
                🌐 ABI 1996
              </span>

              <span className="text-white/10 flex-shrink-0 mr-4 retro-hide">|</span>

              {/* Nav links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-sm transition-all whitespace-nowrap retro-hide"
                  style={{ color: 'rgba(241,240,239,0.55)' }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#F1F0EF';
                    (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'rgba(241,240,239,0.55)';
                    (e.target as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Retro nav links */}
              <div className="retro-show retro-show-flex gap-2">
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} className="text-sm px-2">
                    [{link.label}]
                  </a>
                ))}
              </div>

              <div className="flex-1" />

              {/* CTA */}
              <Link
                href="/claim"
                className="flex-shrink-0 px-4 py-1.5 text-sm font-bold rounded-full transition-all retro-hide"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #FB7185)',
                  color: '#080808',
                }}
              >
                Profil beanspruchen
              </Link>

            </div>
          </div>
        </nav>

        {/* ─── PAGE CONTENT ─── */}
        <div className="flex-1">
          {children}
        </div>

        {/* ─── RETRO TOGGLE ─── */}
        <RetroToggle />

        {/* ─── FOOTER ─── */}
        <footer
          className="glass-strong"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 0' }}
        >
          <div className="container mx-auto px-5 text-center">
            <p className="retro-hide" style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.8rem' }}>
              Gymnasium Marienstatt · Abi 1996 · 30-Jahre-Reunion · Grillhütte Schmidthahn
            </p>
            <p className="retro-hide" style={{ color: 'rgba(241,240,239,0.15)', fontSize: '0.72rem', marginTop: '4px' }}>
              Organisiert von Markus Böer · Kontakt: 0151-58564701 · WhatsApp-Gruppe
            </p>
            {/* Retro footer */}
            <div className="retro-show">
              <p style={{ marginBottom: '8px' }}>★ Gymnasium Marienstatt · Abi 1996 · Klasse der Besten! ★</p>
              <div className="retro-counter">001337</div>
              <p style={{ marginTop: '8px', fontSize: '0.8rem' }}>Besucher seit 1996</p>
              <div className="retro-webring" style={{ marginTop: '12px' }}>
                ← Webring: Schulklassen 1996 →
              </div>
              <div className="retro-netscape">
                ⚠ Best viewed in Netscape Navigator 3.0 at 800×600 · IE 4.0 not supported
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
