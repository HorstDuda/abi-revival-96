import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import RetroToggle from "@/components/RetroToggle";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A(B)I REVIVAL — Gymnasium Marienstatt 1996",
  description: "30 Jahre Homecoming · Gymnasium Marienstatt · Abi 1996 · 12./13. Juni 2026",
};

const NAV = [
  { href: "/personen", label: "Personen" },
  { href: "/spiele",   label: "Spiele" },
  { href: "/galerie",  label: "Galerie" },
  { href: "/timeline", label: "Timeline" },
  { href: "/retro",    label: "1996" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: 'linear-gradient(160deg, #0a1f0a 0%, #0a0a0a 100%)' }}>

        {/* Navigation */}
        <nav
          className="sticky top-0 z-40 backdrop-blur-xl border-b"
          style={{ background: 'rgba(8,15,8,0.88)', borderColor: 'rgba(45,106,79,0.3)' }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center h-14 gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              <Link
                href="/"
                className="flex-shrink-0 font-black text-xl tracking-tight mr-4 transition-all hover:scale-105"
                style={{ color: '#E84060', textShadow: '2px 2px 0px rgba(0,0,0,0.6)' }}
              >
                A(B)I&nbsp;REVIVAL
              </Link>
              <span className="flex-shrink-0 mr-3" style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap hover:text-white hover:bg-white/5"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex-1" />
              <Link
                href="/claim"
                className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-black text-white transition-all hover:scale-105 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #E84060, #c02040)',
                  boxShadow: '0 4px 15px rgba(232,64,96,0.35)',
                }}
              >
                Profil Claim ✋
              </Link>
            </div>
          </div>
        </nav>

        {/* Retro marquee (only shown in retro mode via CSS) */}
        <div className="retro-marquee">
          <div className="ticker-text font-bold py-2 px-4">
            ★★★ WILLKOMMEN AUF DER ABI WELT &apos;96 HOMEPAGE ★★★ KNOWLEDGE WAS KING ★★★ GYMNASIUM MARIENSTATT ★★★ 30 JAHRE REUNION ★★★
          </div>
        </div>

        {/* Countdown banner */}
        <div
          className="py-2 text-center border-b"
          style={{ background: 'rgba(45,106,79,0.08)', borderColor: 'rgba(45,106,79,0.18)' }}
        >
          <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <span className="font-black" style={{ color: '#E84060' }}>12./13. Juni 2026</span>
            <span className="mx-2" style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            Grillhütte Schmidthahn
            <span className="mx-2" style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>30 Jahre Abi Marienstatt</span>
          </p>
        </div>

        <div className="flex-1">{children}</div>

        <RetroToggle />

        <footer
          className="border-t py-6"
          style={{ background: 'rgba(8,15,8,0.95)', borderColor: 'rgba(45,106,79,0.2)' }}
        >
          <div className="container mx-auto px-4 text-center">
            <p className="font-black text-sm" style={{ color: '#E84060' }}>A(B)I REVIVAL · Gymnasium Marienstatt · 1996</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Homecoming 12./13. Juni 2026 · Grillhütte Schmidthahn · Organisiert von Markus Böer
            </p>
            <p className="visitor-counter mt-2 blink" style={{ fontFamily: 'Comic Sans MS', color: '#00ffff', fontSize: '12px' }}>
              📧 Webmaster: webmaster@abiwelt96.de · Webring: ← ABI SITES →
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
