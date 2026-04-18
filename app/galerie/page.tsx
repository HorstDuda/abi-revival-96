'use client';

import Image from 'next/image';
import { useState } from 'react';

const PHOTO_COUNT = 118;
const photos = Array.from({ length: PHOTO_COUNT }, (_, i) =>
  `/grafiken/original/img-${String(i).padStart(3, '0')}.jpg`
);

const AI_IMAGES = [
  { src: '/grafiken/class-portrait-retro.png',          caption: 'Klassenfoto 1996 (KI-Rekonstruktion)' },
  { src: '/grafiken/marienstatt-monastery-school.png',  caption: 'Gymnasium Marienstatt' },
  { src: '/grafiken/hero-marienstatt-1996-vs-2026.png', caption: '1996 vs. 2026' },
  { src: '/grafiken/wortwolke-abstract.png',            caption: 'Wortwolke der Abizeitung' },
];

export default function GaleriePage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <main className="mesh-bg min-h-screen py-16 px-6">

      {/* ─── RETRO HEADER ─── */}
      <div className="retro-show text-center mb-8">
        <h1>📸 GALERIE 📸</h1>
        <p>Damals &amp; Heute</p>
        <span className="blink">NEU! 118 BILDER!</span>
        <div className="retro-construction">🚧 BILDER WERDEN GELADEN — BITTE WARTEN 🚧</div>
      </div>

      <div className="container mx-auto max-w-6xl">

        {/* ─── MODERN HEADER ─── */}
        <div className="text-center mb-16 retro-hide">
          <p style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Bilder aus 30 Jahren
          </p>
          <h1
            className="font-black"
            style={{ fontSize: 'clamp(3rem,8vw,6rem)', background: 'linear-gradient(135deg, #F59E0B, #FB7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}
          >
            Galerie
          </h1>
          <p style={{ color: 'rgba(241,240,239,0.4)', fontSize: '1rem' }}>
            Damals &amp; Heute · {PHOTO_COUNT} Seiten aus der Abizeitung 1996
          </p>
        </div>

        {/* ─── AI IMAGES HERO GRID ─── */}
        <div className="retro-hide mb-20">
          <p style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Damals vs. Heute
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {AI_IMAGES.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightbox(img.src)}
                style={{
                  position: 'relative',
                  aspectRatio: i === 0 ? '4/3' : i === 1 ? '3/4' : '1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: 'none',
                  cursor: 'pointer',
                  gridRow: i === 0 ? 'span 2' : 'auto',
                  background: 'rgba(255,255,255,0.05)',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  style={{ transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.3s' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0'; }}
                />
                <p style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', color: '#F1F0EF', fontSize: '0.78rem', fontWeight: '600', opacity: 0, transition: 'opacity 0.3s', textAlign: 'left' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0'; }}
                >
                  {img.caption}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ─── ABIZEITUNG GRID ─── */}
        <div>
          <div className="retro-hide mb-6">
            <p style={{ color: 'rgba(241,240,239,0.3)', fontSize: '0.78rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Aus der Abizeitung 1996
            </p>
            <p style={{ color: 'rgba(241,240,239,0.4)', fontSize: '0.85rem' }}>
              {PHOTO_COUNT} gescannte Seiten · Tippen zum Vergrößern
            </p>
          </div>

          {/* Masonry-ish columns */}
          <div style={{ columns: '2 160px', gap: '8px' }}>
            {photos.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                style={{
                  display: 'block',
                  width: '100%',
                  marginBottom: '8px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  breakInside: 'avoid',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.05)',
                  aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1' : '4/3',
                }}
              >
                <Image
                  src={src}
                  alt={`Abizeitung Seite ${i}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  loading="lazy"
                  style={{ transition: 'transform 0.3s', transform: 'scale(1)' }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                <span style={{ position: 'absolute', bottom: '4px', right: '6px', color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem', fontFamily: 'var(--font-geist-mono)' }}>
                  {String(i).padStart(3, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── UPLOAD CTA ─── */}
        <div
          className="retro-hide text-center mt-16"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2.5rem', maxWidth: '480px', margin: '4rem auto 0' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
          <h3 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Eigene Fotos beitragen</h3>
          <p style={{ color: 'rgba(241,240,239,0.4)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Hast du Fotos vom Abschluss, von Klassenfahrten oder von früher? Teile sie mit der Stufe!
          </p>
          <button
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #FB7185)',
              color: '#080808',
              border: 'none',
              borderRadius: '100px',
              padding: '0.75rem 2rem',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            Fotos hochladen (coming soon)
          </button>
        </div>

      </div>

      {/* ─── LIGHTBOX ─── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'zoom-out',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              color: '#F1F0EF',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '700px',
              aspectRatio: '4/3',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 50px 150px rgba(0,0,0,0.8)',
            }}
          >
            <Image
              src={lightbox}
              alt="Vollbild"
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}
