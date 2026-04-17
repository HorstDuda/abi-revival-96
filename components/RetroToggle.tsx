'use client';

import { useState, useEffect } from 'react';

export default function RetroToggle() {
  const [retro, setRetro] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('retro-mode') === 'true';
    setRetro(saved);
    if (saved) document.documentElement.classList.add('retro');
  }, []);

  const toggle = () => {
    const next = !retro;
    setRetro(next);
    localStorage.setItem('retro-mode', String(next));
    if (next) {
      document.documentElement.classList.add('retro');
    } else {
      document.documentElement.classList.remove('retro');
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-[9999] px-5 py-3 rounded-xl font-black text-base shadow-2xl transition-all hover:scale-105 active:scale-95"
      style={retro
        ? {
            background: '#00ff00',
            color: '#000080',
            border: '4px ridge #ffff00',
            fontFamily: 'Comic Sans MS, cursive',
            boxShadow: '0 0 20px #00ff00, 4px 4px 0 #ffff00',
          }
        : {
            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
            color: '#ffffff',
            border: '2px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(219,39,119,0.5)',
          }
      }
      title="90s Geocities Mode umschalten"
    >
      {retro ? '🌐 Zurück ins Jetzt' : '💾 90s Modus an!'}
    </button>
  );
}
