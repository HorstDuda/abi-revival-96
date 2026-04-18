'use client';

import { useState, useEffect, useCallback } from 'react';

export default function RetroToggle() {
  const [retro, setRetro] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('retro-mode') === 'true';
    setRetro(saved);
    if (saved) document.documentElement.classList.add('retro');
  }, []);

  const toggle = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);

    // Inject TV-static overlay
    const overlay = document.createElement('div');
    overlay.id = 'tv-static-overlay';
    document.body.appendChild(overlay);

    // Midpoint: flip the mode
    const flipAt = 280;
    setTimeout(() => {
      const next = !retro;
      setRetro(next);
      localStorage.setItem('retro-mode', String(next));
      if (next) {
        document.documentElement.classList.add('retro');
      } else {
        document.documentElement.classList.remove('retro');
      }
    }, flipAt);

    // Remove overlay and unlock
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      setTransitioning(false);
    }, 580);
  }, [retro, transitioning]);

  return (
    <button
      onClick={toggle}
      disabled={transitioning}
      title="90s Geocities Mode umschalten"
      className="fixed bottom-5 right-5 z-[9999] transition-all hover:scale-105 active:scale-95"
      style={{
        ...(retro
          ? {
              background: '#00ff00',
              color: '#000080',
              border: '4px ridge #ffff00',
              fontFamily: 'Comic Sans MS, cursive',
              fontWeight: 900,
              borderRadius: 0,
              boxShadow: '0 0 20px #00ff00, 4px 4px 0 #ffff00',
              padding: '0.6rem 1rem',
              fontSize: '0.875rem',
            }
          : {
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '0.875rem',
              boxShadow: '0 8px 32px rgba(124,58,237,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
              padding: '0.6rem 1rem',
              fontSize: '0.8125rem',
              fontWeight: 700,
            }),
        opacity: transitioning ? 0.4 : 1,
        cursor: transitioning ? 'wait' : 'pointer',
      }}
    >
      {transitioning ? '📺' : retro ? '🌐 Zurück ins Jetzt' : '💾 90s Modus'}
    </button>
  );
}
