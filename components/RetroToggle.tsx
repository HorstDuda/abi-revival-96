'use client';

import { useState, useEffect } from 'react';

export default function RetroToggle() {
  const [retro, setRetro] = useState(false);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('retro-mode') === 'true';
    setRetro(saved);
    if (saved) document.documentElement.classList.add('retro');
  }, []);

  const toggle = () => {
    setSwitching(true);
    setTimeout(() => {
      const next = !retro;
      setRetro(next);
      localStorage.setItem('retro-mode', String(next));
      document.documentElement.classList.toggle('retro', next);
      setSwitching(false);
    }, 480);
  };

  return (
    <>
      {switching && (
        <div
          className="fixed inset-0 z-[99998] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.8'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            animation: 'tv-static 0.5s ease-in-out',
          }}
        />
      )}
      <button
        onClick={toggle}
        disabled={switching}
        className="fixed bottom-5 right-5 z-[9999] px-5 py-3 rounded-xl font-black text-base transition-all hover:scale-105 active:scale-95 shadow-2xl"
        style={retro
          ? { background: '#00ff00', color: '#000080', border: '4px ridge #ffff00', fontFamily: '"Comic Sans MS", cursive', boxShadow: '0 0 20px #00ff00, 4px 4px 0 #ffff00' }
          : { background: 'linear-gradient(135deg, #E84060, #c02040)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 32px rgba(232,64,96,0.4)' }
        }
        title="90s / Modern Mode umschalten"
      >
        {switching ? '📡 ...' : retro ? '💻 Zurück in 2026' : '📺 Zeitreise!'}
      </button>
    </>
  );
}
