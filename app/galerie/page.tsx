import Image from 'next/image';

// Generate array of photo filenames (img-000 to img-117, skip 'grafiken' dir entry)
const PHOTO_COUNT = 118; // img-000 through img-117
const photos = Array.from({ length: PHOTO_COUNT }, (_, i) =>
  `/grafiken/original/img-${String(i).padStart(3, '0')}.jpg`
);

// AI-generated images for the comparison section
const AI_IMAGES = [
  { src: '/grafiken/class-portrait-retro.png', caption: 'Klassenfoto 1996 (KI-Rekonstruktion)' },
  { src: '/grafiken/marienstatt-monastery-school.png', caption: 'Gymnasium Marienstatt' },
  { src: '/grafiken/hero-marienstatt-1996-vs-2026.png', caption: '1996 vs. 2026' },
  { src: '/grafiken/wortwolke-abstract.png', caption: 'Wortwolke der Abizeitung' },
];

// Heights for masonry effect (alternating)
const HEIGHTS = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[2/3]', 'aspect-square', 'aspect-[3/4]'];

export default function GaleriePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
            Galerie
          </h1>
          <p className="text-slate-400">Damals &amp; Heute · Bilder aus 30 Jahren</p>
        </div>

        {/* AI-generated comparison images */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-pink-400 mb-6">Damals vs. Heute</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AI_IMAGES.map((img) => (
              <div key={img.src} className="group relative rounded-xl overflow-hidden aspect-square bg-slate-800">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="absolute bottom-0 left-0 right-0 p-3 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Original Abizeitung scans */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-400 mb-2">Aus der Abizeitung 1996</h2>
          <p className="text-slate-500 text-sm mb-6">
            {PHOTO_COUNT} gescannte Seiten · Tap für Vollbild
          </p>

          {/* Masonry-like grid using CSS columns */}
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-2">
            {photos.map((src, i) => (
              <div
                key={src}
                className={`relative w-full break-inside-avoid rounded-lg overflow-hidden bg-slate-800 mb-2 ${
                  HEIGHTS[i % HEIGHTS.length]
                } group cursor-pointer`}
              >
                <Image
                  src={src}
                  alt={`Abizeitung Seite ${i}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <span className="absolute bottom-1 right-1 text-xs text-white/50 font-mono">
                  {String(i).padStart(3, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload CTA */}
        <div className="mt-16 text-center bg-slate-800/50 border border-slate-700 rounded-2xl p-8 max-w-lg mx-auto">
          <h3 className="text-xl font-bold mb-2">Eigene Fotos beitragen</h3>
          <p className="text-slate-400 text-sm mb-4">
            Hast du Fotos vom Abschluss, von Klassenfahrten oder von damals? Teile sie mit der Stufe!
          </p>
          <button className="px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-lg font-bold transition">
            Fotos hochladen (coming soon)
          </button>
        </div>
      </div>
    </main>
  );
}
