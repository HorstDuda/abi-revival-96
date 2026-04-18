'use client';

import { useState, useEffect, useRef } from 'react';

export default function RetroToggle() {
  const [retro, setRetro] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('retro-mode') === 'true';
    setRetro(saved);
    if (saved) document.documentElement.classList.add('retro');
  }, []);

  const toggle = () => {
    if (transitioning) return;
    setTransitioning(true);

    // TV static flash
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.display = 'block';
      overlay.style.opacity = '1';
      overlay.style.animation = 'none';
    }

    // Flicker effect
    let flickers = 0;
    const flicker = setInterval(() => {
      if (overlay) overlay.style.opacity = flickers % 2 === 0 ? '0' : '0.9';
      flickers++;
      if (flickers > 6) {
        clearInterval(flicker);
        // Apply the mode change
        const next = !retro;
        setRetro(next);
        localStorage.setItem('retro-mode', String(next));
        if (next) {
          document.documentElement.classList.add('retro');
        } else {
          document.documentElement.classList.remove('retro');
        }
        // Fade out overlay
        if (overlay) {
          overlay.style.transition = 'opacity 0.3s ease';
          overlay.style.opacity = '0';
          setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.transition = '';
            setTransitioning(false);
          }, 350);
        } else {
          setTransitioning(false);
        }
      }
    }, 60);
  };

  return (
    <>
      {/* TV Static Overlay */}
      <div
        ref={overlayRef}
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 99998,
          pointerEvents: 'none',
          background: `
            repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 2px)
          `,
          backgroundColor: 'rgba(180,180,180,0.75)',
        }}
      />

      {/* Toggle Button */}
      <button
        onClick={toggle}
        disabled={transitioning}
        className="fixed bottom-5 right-5 z-[9999] transition-all hover:scale-105 active:scale-95 disabled:cursor-wait"
        style={retro
          ? {
              background: '#00ff00',
              color: '#000080',
              border: '4px ridge #ffff00',
              fontFamily: 'Comic Sans MS, cursive',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              padding: '10px 18px',
              borderRadius: '0',
              boxShadow: '0 0 20px #00ff00, 4px 4px 0 #ff0000',
            }
          : {
              background: 'linear-gradient(135deg, #6d28d9, #db2777)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              fontWeight: '700',
              fontSize: '0.85rem',
              padding: '10px 20px',
              borderRadius: '100px',
              boxShadow: '0 8px 32px rgba(109,40,217,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
            }
        }
        title="90s Geocities Mode umschalten"
      >
        {retro
          ? '💻 Zurück ins Jetzt'
          : '📺 90s Modus!'}
      </button>
    </>
  );
}
