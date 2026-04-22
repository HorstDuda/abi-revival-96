'use client';

import { useState, useEffect } from 'react';

export default function RetroToggle() {
  const [retro, setRetro]       = useState(false);
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
        title="Zwischen Modern und Netscape 1996 umschalten"
        className="fixed bottom-5 right-5 z-[9999] transition-all hover:scale-105 active:scale-95"
        style={retro ? {
          /* Windows 95 raised button */
          background: '#C0C0C0',
          color: '#000000',
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #808080',
          borderBottom: '2px solid #808080',
          fontFamily: 'Times New Roman, Times, serif',
          fontSize: '13px',
          fontWeight: 'bold',
          padding: '6px 14px',
          borderRadius: '0',
          boxShadow: 'none',
          cursor: 'default',
        } : {
          background: '#111827',
          color: '#f9fafb',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '10px 18px',
          fontSize: '13px',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          fontFamily: 'inherit',
        }}
      >
        {switching ? '📡' : retro ? '🖥 Zurück in 2026' : '📺 Zeitreise 1996'}
      </button>
    </>
  );
}
