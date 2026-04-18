'use client';

import { useState, useEffect } from 'react';

const TARGET = new Date('2026-06-12T12:00:00');

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
    done: false,
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1_000);
    return () => clearInterval(id);
  }, []);

  if (time.done) {
    return (
      <div className="text-center py-6">
        <p className="text-4xl font-black text-gradient animate-pulse-glow">
          🎉 Es ist so weit! 🎉
        </p>
      </div>
    );
  }

  const units = [
    { value: time.days,    label: 'Tage' },
    { value: time.hours,   label: 'Std' },
    { value: time.minutes, label: 'Min' },
    { value: time.seconds, label: 'Sek' },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5 retro-hide">
      {units.map(({ value, label }, i) => (
        <div key={label} className="text-center">
          <div
            className="glass rounded-xl sm:rounded-2xl flex items-center justify-center font-black tabular-nums"
            style={{
              width: 'clamp(64px, 14vw, 100px)',
              height: 'clamp(64px, 14vw, 100px)',
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.2)',
              color: '#F59E0B',
              letterSpacing: '-0.02em',
            }}
          >
            {String(value).padStart(2, '0')}
          </div>
          <p className="text-xs mt-2 tracking-widest uppercase" style={{ color: 'rgba(241,240,239,0.35)' }}>
            {label}
          </p>
          {i < units.length - 1 && (
            <span
              className="hidden sm:block absolute translate-x-[calc(clamp(64px,14vw,100px)+8px)] -translate-y-16 text-2xl font-black"
              style={{ color: 'rgba(245,158,11,0.4)' }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
