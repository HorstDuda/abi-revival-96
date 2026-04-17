import { alumni } from '@/app/data/alumni';

function AlumniCard({ person }: { person: (typeof alumni)[0] }) {
  const initials = person.name
    .split(',')
    .map((p) => p.trim()[0])
    .join('');

  return (
    <div
      className={`relative rounded-xl p-4 border transition-all hover:scale-105 ${
        person.verified
          ? 'bg-gradient-to-br from-pink-900/60 to-purple-900/60 border-pink-500/60 shadow-lg shadow-pink-900/20'
          : person.missing
          ? 'bg-slate-900/30 border-slate-700/30 opacity-60'
          : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-500/50'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold ${
          person.verified
            ? 'bg-gradient-to-br from-pink-600 to-purple-600 text-white'
            : 'bg-slate-700 text-slate-400'
        }`}
      >
        {person.verified ? initials : <span className="text-2xl">👤</span>}
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-center text-slate-200 leading-tight">
        {person.name.split(', ').reverse().join(' ')}
        {person.geburtsname && (
          <span className="block text-xs text-slate-500 font-normal">
            geb. {person.geburtsname}
          </span>
        )}
      </p>

      {/* Verified info */}
      {person.verified ? (
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-1">
            <span className="text-xs text-pink-400 font-medium">✓ Verifiziert</span>
          </div>
          {person.beruf && (
            <p className="text-xs text-slate-300 leading-tight">{person.beruf}</p>
          )}
          {person.ort && (
            <p className="text-xs text-slate-400">📍 {person.ort}</p>
          )}
          {person.charakteristik && (
            <p className="text-xs text-slate-500 italic mt-1 leading-tight">
              &ldquo;{person.charakteristik}&rdquo;
            </p>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-600 text-center mt-2">
          {person.missing ? '🔍 Noch nicht erreicht' : 'Profil noch nicht beansprucht'}
        </p>
      )}

      {/* Claim button for unclaimed */}
      {!person.claimed && !person.missing && (
        <a
          href={`/claim?name=${encodeURIComponent(person.name)}`}
          className="block mt-3 text-center text-xs px-3 py-1 rounded bg-slate-700/50 text-slate-400 hover:bg-pink-800/50 hover:text-pink-300 transition"
        >
          Beanspruchen →
        </a>
      )}
    </div>
  );
}

export default function PersonenPage() {
  const claimed = alumni.filter((a) => a.claimed).length;
  const missing = alumni.filter((a) => a.missing).length;
  const reached = alumni.filter((a) => !a.missing).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
            Die Stufe
          </h1>
          <p className="text-slate-400">Gymnasium Marienstatt · Abi 1996</p>
          <div className="flex gap-6 justify-center mt-4 text-sm">
            <span className="text-slate-300">
              <span className="text-pink-400 font-bold">{reached}</span> erreicht
            </span>
            <span className="text-slate-300">
              <span className="text-green-400 font-bold">{claimed}</span> verifiziert
            </span>
            <span className="text-slate-300">
              <span className="text-yellow-400 font-bold">{missing}</span> vermisst
            </span>
          </div>
        </div>

        {/* Verified profiles highlighted */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-pink-400 mb-4">✓ Verifizierte Profile</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {alumni.filter((a) => a.verified).map((a) => (
              <AlumniCard key={a.id} person={a} />
            ))}
          </div>
        </div>

        {/* All alumni grid */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-slate-400 mb-4">Alle Stufenmitglieder</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {alumni.filter((a) => !a.verified && !a.missing).map((a) => (
              <AlumniCard key={a.id} person={a} />
            ))}
          </div>
        </div>

        {/* Missing */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-600 mb-4">🔍 Noch nicht erreicht</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {alumni.filter((a) => a.missing).map((a) => (
              <AlumniCard key={a.id} person={a} />
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Kennst du jemanden aus dieser Liste? Kontaktiere Markus Böer über die WhatsApp-Gruppe.
          </p>
        </div>
      </div>
    </main>
  );
}
