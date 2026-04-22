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
      <body className="min-h-full flex flex-col bg-[#f8f9fa]">

        {/* Navigation */}
        <nav className="sticky top-0 z-40 bg-white border-b border-black/[0.07]">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-14 gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              <Link
                href="/"
                className="flex-shrink-0 font-black text-lg tracking-tight mr-4 transition-opacity hover:opacity-75"
                style={{ color: '#2D6A4F' }}
              >
                A(B)I&nbsp;REVIVAL
              </Link>
              <span className="flex-shrink-0 mr-3 text-black/15">|</span>
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-[#6b7280] hover:text-[#111827] hover:bg-black/[0.04]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex-1" />
              <Link
                href="/claim"
                className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: '#2D6A4F' }}
              >
                Profil sichern →
              </Link>
            </div>
          </div>
        </nav>

        {/* Retro marquee — only visible in retro mode via CSS */}
        <div className="retro-marquee">
          <div className="ticker-text font-bold py-2 px-4">
            ★★★ WILLKOMMEN AUF DER ABI WELT &apos;96 HOMEPAGE ★★★ KNOWLEDGE WAS KING ★★★ GYMNASIUM MARIENSTATT ★★★ 30 JAHRE REUNION ★★★ BEST VIEWED IN NETSCAPE NAVIGATOR 3.0 AT 800×600 ★★★
          </div>
        </div>

        {/* Event banner */}
        <div className="py-2 text-center border-b border-black/[0.06] bg-white">
          <p className="text-sm font-medium text-[#6b7280]">
            <span className="font-bold text-[#E84060]">12./13. Juni 2026</span>
            <span className="mx-2 text-black/20">·</span>
            Grillhütte Schmidthahn
            <span className="mx-2 text-black/20">·</span>
            30 Jahre Abi Marienstatt
          </p>
        </div>

        <div className="flex-1">{children}</div>

        <RetroToggle />

        <footer className="border-t border-black/[0.07] py-8 bg-white">
          <div className="container mx-auto px-4 text-center">
            <p className="font-black text-sm" style={{ color: '#2D6A4F' }}>A(B)I REVIVAL · Gymnasium Marienstatt · 1996</p>
            <p className="text-xs mt-1 text-[#9ca3af]">
              Homecoming 12./13. Juni 2026 · Grillhütte Schmidthahn · Organisiert von Markus Böer
            </p>
            <p className="visitor-counter mt-3 blink text-xs" style={{ fontFamily: 'Times New Roman, serif', color: '#000080' }}>
              Sie sind Besucher Nr. <span className="blink font-bold">000847</span> · Best viewed with Netscape Navigator 3.0
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
