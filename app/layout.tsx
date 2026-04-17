import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import RetroToggle from "@/components/RetroToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABI WELT — Marienstatt 1996",
  description: "30 Jahre Reunion · Gymnasium Marienstatt · Abi 1996 · Treffen 12./13. Juni 2026",
};

const NAV_LINKS = [
  { href: "/", label: "🏠 Home" },
  { href: "/personen", label: "👥 Personen" },
  { href: "/spiele", label: "🎮 Spiele" },
  { href: "/galerie", label: "📸 Galerie" },
  { href: "/retro", label: "📼 1996" },
  { href: "/claim", label: "✋ Profil" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-900">
        {/* Navigation */}
        <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-14 gap-1 overflow-x-auto scrollbar-none">
              {/* Brand */}
              <Link
                href="/"
                className="flex-shrink-0 font-black text-lg bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent mr-3"
              >
                ABI&apos;96
              </Link>

              {/* Divider */}
              <span className="text-slate-700 flex-shrink-0 mr-3">|</span>

              {/* Nav links */}
              {NAV_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}

              {/* Spacer + CTA */}
              <div className="flex-1" />
              <Link
                href="/claim"
                className="flex-shrink-0 px-4 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-bold transition whitespace-nowrap"
              >
                Claim Profil
              </Link>
            </div>
          </div>
        </nav>

        {/* Countdown banner */}
        <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-b border-pink-900/30 py-2 text-center">
          <p className="text-sm text-pink-300">
            <span className="font-bold">12./13. Juni 2026</span>
            <span className="text-slate-400 mx-2">·</span>
            Grillhütte Schmidthahn
            <span className="text-slate-400 mx-2">·</span>
            <span className="text-slate-400">30 Jahre Abi Marienstatt</span>
          </p>
        </div>

        {/* Page content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Global retro toggle — fixed bottom-right on every page */}
        <RetroToggle />

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-slate-600 text-sm">
              Gymnasium Marienstatt · Abi 1996 · 30-Jahre-Reunion
            </p>
            <p className="text-slate-700 text-xs mt-1">
              Organisiert von Markus Böer · Kontakt über WhatsApp-Gruppe
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
