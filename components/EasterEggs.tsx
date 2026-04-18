'use client';

import { useEffect, useRef, useState } from 'react';

// Konami code sequence
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export default function EasterEggs() {
  const [konamiActive, setKonamiActive] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [typed, setTyped] = useState('');
  const konamiIndex = useRef(0);
  const konamiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeBuffer = useRef('');
  const typeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Konami code listener
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key;

      // Konami code
      if (key === KONAMI[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiTimeout.current) clearTimeout(konamiTimeout.current);
        konamiTimeout.current = setTimeout(() => { konamiIndex.current = 0; }, 2000);
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          setKonamiActive(true);
          setTimeout(() => setKonamiActive(false), 4000);
        }
      } else {
        konamiIndex.current = 0;
      }

      // Type "1996" easter egg
      typeBuffer.current += key;
      if (typeBuffer.current.length > 10) typeBuffer.current = typeBuffer.current.slice(-10);
      if (typeTimeout.current) clearTimeout(typeTimeout.current);
      typeTimeout.current = setTimeout(() => { typeBuffer.current = ''; }, 3000);
      if (typeBuffer.current.includes('1996')) {
        typeBuffer.current = '';
        setTyped('1996');
        setTimeout(() => setTyped(''), 2500);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      if (konamiTimeout.current) clearTimeout(konamiTimeout.current);
      if (typeTimeout.current) clearTimeout(typeTimeout.current);
    };
  }, []);

  // Logo click easter egg
  useEffect(() => {
    const logo = document.querySelector('a[href="/"]');
    if (!logo) return;
    let clicks = 0;
    const handler = () => {
      clicks++;
      setLogoClicks(clicks);
      if (clicks >= 5) {
        clicks = 0;
        setLogoClicks(0);
        // Flash the logo briefly
        (logo as HTMLElement).style.animation = 'retroRainbow 0.5s linear 3';
        setTimeout(() => { (logo as HTMLElement).style.animation = ''; }, 1500);
        alert('🎉 Du hast es gefunden! Die geheime Seite ist noch in Arbeit — aber wir wissen, dass du neugierig bist! 🕵️');
      }
    };
    logo.addEventListener('click', handler);
    return () => logo.removeEventListener('click', handler);
  }, []);

  if (!konamiActive && !typed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        pointerEvents: 'none',
      }}
    >
      {konamiActive && (
        <div
          style={{
            background: 'linear-gradient(135deg, #F59E0B, #FB7185, #818CF8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: '900',
            textAlign: 'center',
            animation: 'bounceIn 0.5s ease-out both',
            textShadow: 'none',
          }}
        >
          ↑↑↓↓←→←→BA
          <div style={{ fontSize: '2rem', marginTop: '1rem', WebkitTextFillColor: 'rgba(241,240,239,0.8)', background: 'none', backgroundClip: 'unset' }}>
            Du kennst den Code! 🎮
          </div>
        </div>
      )}
      {typed === '1996' && (
        <div
          style={{
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            fontWeight: '900',
            opacity: 0.15,
            color: '#F59E0B',
            animation: 'bounceIn 0.4s ease-out both',
            letterSpacing: '-0.05em',
          }}
        >
          1996
        </div>
      )}
    </div>
  );
}
