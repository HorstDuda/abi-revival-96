import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
            ABI WELT
          </h1>
          <p className="text-2xl text-slate-300">30 Jahre Edition</p>
          <p className="text-lg text-slate-400 mt-2">Gymnasium Marienstatt · Abi 1996</p>
          <p className="mt-4 text-pink-400">Treffen: 12./13. Juni 2026</p>
        </div>
        <div className="relative aspect-square max-w-2xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <Image src="/grafiken/hero-marienstatt-1996-vs-2026.png" alt="Hero" fill className="object-cover" sizes="(max-width: 672px) 100vw, 672px" priority />
        </div>
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <a href="/personen" className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/50 transition">
            <h3 className="text-xl font-bold mb-2">👥 Personen</h3>
            <p className="text-sm text-slate-400">Wer, was, wo</p>
          </a>
          <a href="/spiele" className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/50 transition">
            <h3 className="text-xl font-bold mb-2">🎮 Spiele</h3>
            <p className="text-sm text-slate-400">Bingo, Quiz, Voting</p>
          </a>
          <a href="/galerie" className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/50 transition">
            <h3 className="text-xl font-bold mb-2">📸 Galerie</h3>
            <p className="text-sm text-slate-400">Damals vs. Heute</p>
          </a>
          <a href="/retro" className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/50 transition">
            <h3 className="text-xl font-bold mb-2">📼 1996</h3>
            <p className="text-sm text-slate-400">90er Zeitreise</p>
          </a>
        </nav>
        <div className="text-center mt-16">
          <a href="/claim" className="inline-block px-8 py-4 bg-pink-600 hover:bg-pink-500 rounded-lg font-bold text-lg transition">
            Dein Profil beanspruchen →
          </a>
        </div>
      </div>
    </main>
  );
}
