import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import RetroToggle from '@/components/RetroToggle';
import CountdownBanner from '@/components/CountdownBanner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ABI\'96 — Marienstatt 30 Jahre',
  description: '30 Jahre Reunion · Gymnasium Marienstatt · Abi 1996 · 12./13. Juni 2026',
};

const NAV_LINKS = [
  { href: '/personen', label: 'Personen' },
  { href: '/spiele', label: 'Spiele' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/retro', label: '1996' },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ background: '#070b14' }}>

        {/* ── NAVBAR ── */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: 'rgba(7,11,20,0.8)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center h-14 gap-1">

              {/* Brand */}
              <Link
                href="/"
                data-brand
                className="flex-shrink-0 font-black text-xl mr-4 gradient-text tracking-tighter"
              >
                ABI&apos;96
              </Link>

              {/* Divider */}
              <span className="flex-shrink-0 mr-3 h-4 w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

              {/* Links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                  style={{ color: 'rgba(241,245,249,0.5)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#f1f5f9';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(241,245,249,0.5)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Spacer */}
              <div className="flex-1" />

              {/* CTA */}
              <Link
                href="/claim"
                className="flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
                  boxShadow: '0 4px 16px rgba(236,72,153,0.3)',
                }}
              >
                Claim Profil
              </Link>
            </div>
          </div>
        </header>

        {/* ── COUNTDOWN BANNER ── */}
        <CountdownBanner />

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1">
          {children}
        </div>

        {/* ── RETRO TOGGLE ── */}
        <RetroToggle />

        {/* ── FOOTER ── */}
        <footer
          className="py-8"
          style={{
            background: 'rgba(7,11,20,0.9)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <p className="font-bold gradient-text text-lg mb-1">ABI&apos;96</p>
            <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(241,245,249,0.2)' }}>
              Gymnasium Marienstatt · Abi 1996 · 30-Jahre-Reunion
            </p>
            <p className="text-xs mt-2" style={{ color: 'rgba(241,245,249,0.12)' }}>
              Organisiert von Markus Böer · Kontakt über WhatsApp-Gruppe
            </p>

            {/* Retro visitor counter (only shows in retro mode) */}
            <div className="retro-marquee mt-4 text-center" style={{ color: '#ff69b4', fontFamily: 'Comic Sans MS', fontSize: 14 }}>
              <span className="blink">★</span> You are visitor #{Math.floor(Math.random() * 9000) + 1000} <span className="blink">★</span>
              <br />
              <span style={{ fontSize: 11 }}>Best viewed in Internet Explorer 4.0 · Resolution 800×600</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
