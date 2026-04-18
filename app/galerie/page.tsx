'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

// ── Photo data ──
const PHOTO_COUNT = 118;
const photos = Array.from({ length: PHOTO_COUNT }, (_, i) =>
  `/grafiken/original/img-${String(i).padStart(3, '0')}.jpg`
);

const AI_IMAGES = [
  { src: '/grafiken/class-portrait-retro.png', caption: 'Klassenfoto 1996', sub: 'KI-Rekonstruktion' },
  { src: '/grafiken/marienstatt-monastery-school.png', caption: 'Gymnasium Marienstatt', sub: 'Das Kloster damals' },
  { src: '/grafiken/hero-marienstatt-1996-vs-2026.png', caption: '1996 vs. 2026', sub: 'Damals & Heute' },
  { src: '/grafiken/wortwolke-abstract.png', caption: 'Wortwolke', sub: 'Aus der Abizeitung' },
];

// ── Before/After Slider ──
function BeforeAfterSlider({ before, after, captionBefore, captionAfter }: {
  before: string; after: string; captionBefore: string; captionAfter: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) handleMove(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => { handleMove(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="ba-slider relative rounded-2xl overflow-hidden shadow-2xl"
      style={{ aspectRatio: '4/3' }}
      onMouseMove={onMouseMove}
      onMouseDown={() => { dragging.current = true; }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={onTouchMove}
    >
      {/* Before (bottom layer) */}
      <Image src={before} alt={captionBefore} fill className="object-cover" sizes="600px" />
      <div className="absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-bold" style={{ background: 'rgba(0,0,0,0.7)', color: '#f59e0b' }}>{captionBefore}</div>

      {/* After (clipped) */}
      <div className="ba-after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={after} alt={captionAfter} fill className="object-cover" sizes="600px" />
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-bold" style={{ background: 'rgba(0,0,0,0.7)', color: '#22d3ee' }}>{captionAfter}</div>
      </div>

      {/* Divider */}
      <div className="ba-divider" style={{ left: `${pos}%` }}>
        <div className="ba-handle">
          <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: -1 }}>◄►</span>
        </div>
      </div>
    </div>
  );
}

// ── Lightbox ──
function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        ←
      </button>

      {/* Image */}
      <div
        className="relative rounded-xl overflow-hidden shadow-2xl animate-scale-in"
        style={{ width: 'min(90vw, 900px)', height: 'min(85vh, 680px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt={`Foto ${index + 1}`}
          fill
          className="object-contain"
          sizes="900px"
          priority
        />
        <div
          className="absolute bottom-0 left-0 right-0 py-2 text-center"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
        >
          <p className="text-white/60 text-xs font-mono">{String(index).padStart(3, '0')} / {String(photos.length - 1).padStart(3, '0')}</p>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        →
      </button>
    </div>
  );
}

// ── Heights for masonry ──
const HEIGHTS = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[2/3]', 'aspect-square', 'aspect-[3/4]'];

export default function GaleriePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => i !== null ? (i - 1 + photos.length) % photos.length : 0);
  const nextPhoto = () => setLightboxIndex((i) => i !== null ? (i + 1) % photos.length : 0);

  return (
    <main className="min-h-screen py-12 relative">
      {/* Orbs */}
      <div className="orb animate-glow" style={{width:450,height:450,top:'-8%',right:'-5%',background:'radial-gradient(circle,rgba(6,182,212,0.2),transparent 70%)'}} />

      {/* Retro marquee */}
      <div className="retro-marquee bg-purple-600 text-yellow-300 py-1 text-sm font-bold">
        <marquee>★ GALERIE ★ FOTOS VON DAMALS ★ 118 SEITEN ABIZEITUNG ★ UNTER CONSTRUCTION ★ BEST VIEWED 800×600 ★</marquee>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-3">Bildarchiv</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-3">
            <span className="gradient-text">Galerie</span>
          </h1>
          <p className="text-white/40">Damals &amp; Heute · Bilder aus 30 Jahren</p>
        </div>

        {/* ── BEFORE / AFTER SLIDER ── */}
        <section className="max-w-2xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-2xl font-black gradient-text">Damals vs. Heute</h2>
            <span className="text-xs text-white/30 px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              Schieberegler ziehen
            </span>
          </div>
          <BeforeAfterSlider
            before="/grafiken/class-portrait-retro.png"
            after="/grafiken/hero-marienstatt-1996-vs-2026.png"
            captionBefore="1996"
            captionAfter="2026"
          />
        </section>

        {/* ── AI IMAGES GRID ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white/50 mb-5">KI-Rekonstruktionen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AI_IMAGES.map((img) => (
              <div
                key={img.src}
                className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                  sizes="250px"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-3"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%)' }}
                >
                  <p className="text-white text-xs font-bold leading-tight">{img.caption}</p>
                  <p className="text-white/50 text-[10px]">{img.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABIZEITUNG SCANS ── */}
        <section>
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-xl font-bold text-white/50">Aus der Abizeitung 1996</h2>
            <span className="text-xs text-white/25">{PHOTO_COUNT} gescannte Seiten</span>
          </div>
          <p className="text-white/25 text-sm mb-6">Tippe auf ein Bild für die Vollansicht</p>

          {/* Masonry grid */}
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
            {photos.map((src, i) => (
              <div
                key={src}
                className={`relative w-full break-inside-avoid rounded-lg overflow-hidden bg-slate-800 mb-2 ${HEIGHTS[i % HEIGHTS.length]} group cursor-pointer`}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={src}
                  alt={`Abizeitung Seite ${i}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    ⊕
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 text-[9px] text-white/30 font-mono">
                  {String(i).padStart(3, '0')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── UPLOAD CTA ── */}
        <div
          className="mt-16 text-center rounded-2xl p-8 max-w-lg mx-auto"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="text-4xl mb-4">📷</div>
          <h3 className="text-xl font-bold mb-2">Eigene Fotos beitragen</h3>
          <p className="text-white/40 text-sm mb-5">
            Hast du Fotos vom Abschluss, von Klassenfahrten oder von damals? Teile sie mit der Stufe!
          </p>
          <button
            className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#ec4899,#7c3aed)', color: '#fff' }}
          >
            Fotos hochladen (coming soon)
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </main>
  );
}
