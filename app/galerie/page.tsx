'use client';

import { useState } from 'react';
import Image from 'next/image';

const PHOTO_COUNT = 118;
const photos = Array.from({ length: PHOTO_COUNT }, (_, i) =>
  `/grafiken/original/img-${String(i).padStart(3, '0')}.jpg`
);
const AI_IMAGES = [
  { src: '/grafiken/class-portrait-retro.png',          caption: 'Klassenfoto 1996 (KI)' },
  { src: '/grafiken/marienstatt-monastery-school.png',  caption: 'Gymnasium Marienstatt' },
  { src: '/grafiken/hero-marienstatt-1996-vs-2026.png', caption: '1996 vs. 2026' },
  { src: '/grafiken/wortwolke-abstract.png',            caption: 'Wortwolke Abizeitung' },
];
const HEIGHTS = ['aspect-square','aspect-[3/4]','aspect-[4/3]','aspect-[2/3]','aspect-square','aspect-[3/4]'];

export default function GaleriePage() {
  const [lightbox, setLightbox]   = useState<string | null>(null);
  const [uploadName, setUploadName] = useState<string | null>(null);

  return (
    <main className="min-h-screen py-12" style={{ background: 'linear-gradient(160deg, #0a1f0a 0%, #0a0a0a 100%)' }}>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] mx-4">
            <Image
              src={lightbox}
              alt="Vollbild"
              width={1200}
              height={900}
              className="object-contain max-h-[90vh] w-full rounded-2xl"
            />
          </div>
          <button
            className="absolute top-5 right-5 text-white text-3xl font-black w-10 h-10 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(232,64,96,0.8)' }}
            onClick={() => setLightbox(null)}
          >✕</button>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1
            className="font-black mb-2 tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#E84060', textShadow: '3px 3px 0px rgba(0,0,0,0.6)' }}
          >GALERIE</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)' }}>Damals &amp; Heute · {PHOTO_COUNT} Abizeitung-Seiten</p>
        </div>

        {/* Upload */}
        <div
          className="max-w-lg mx-auto mb-14 rounded-2xl p-6 text-center glass"
          style={{ border: '1px solid rgba(232,64,96,0.25)' }}
        >
          <p className="font-black text-lg text-white mb-1">📸 Eigene Fotos beitragen</p>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Klassenfahrten, Abschluss, damals oder heute?
          </p>
          <label
            className="inline-block cursor-pointer px-6 py-3 rounded-xl font-black text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #E84060, #c02040)', boxShadow: '0 4px 20px rgba(232,64,96,0.4)' }}
          >
            Fotos auswählen →
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => { if (e.target.files?.[0]) setUploadName(e.target.files[0].name); }}
            />
          </label>
          {uploadName && (
            <p className="mt-3 text-xs" style={{ color: '#52b788' }}>✓ {uploadName} ausgewählt (Upload-Backend kommt bald)</p>
          )}
        </div>

        {/* AI comparison */}
        <div className="mb-16">
          <h2 className="font-black text-2xl mb-6 text-white">Damals vs. Heute</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AI_IMAGES.map((img) => (
              <div
                key={img.src}
                className="group relative rounded-2xl overflow-hidden aspect-square cursor-zoom-in"
                style={{ background: 'rgba(10,20,10,0.5)' }}
                onClick={() => setLightbox(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-0 left-0 right-0 p-3 text-xs text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Abizeitung scans */}
        <div>
          <h2 className="font-black text-2xl mb-2 text-white">Aus der Abizeitung 1996</h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.38)' }}>
            {PHOTO_COUNT} gescannte Seiten · Klick für Vollbild
          </p>
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
            {photos.map((src, i) => (
              <div
                key={src}
                className={`relative w-full break-inside-avoid rounded-xl overflow-hidden mb-2 ${HEIGHTS[i % HEIGHTS.length]} group cursor-zoom-in`}
                style={{ background: 'rgba(10,20,10,0.5)' }}
                onClick={() => setLightbox(src)}
              >
                <Image
                  src={src}
                  alt={`Abizeitung Seite ${i}`}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div
                  className="absolute inset-0 transition-colors duration-300"
                  style={{ background: 'transparent' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(232,64,96,0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                />
                <span
                  className="absolute bottom-1 right-1 text-xs font-mono"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  {String(i).padStart(3, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
