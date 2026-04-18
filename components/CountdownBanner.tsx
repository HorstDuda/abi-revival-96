'use client';

import { useState, useEffect } from 'react';

const TARGET = new Date('2026-06-12T16:00:00+02:00');

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function CountdownBanner() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0, init: false });

  useEffect(() => {
    const tick = () => {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0, init: true });
        return;
      }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
        init: true,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      data-countdown
      className="border-b py-1.5"
      style={{
        background: 'linear-gradient(90deg, rgba(26,5,51,0.9), rgba(10,22,40,0.9))',
        borderColor: 'rgba(255,255,255,0.05)',
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-center gap-3 flex-wrap text-sm">
        {/* Location */}
        <span className="hidden sm:inline text-white/35 text-xs tracking-wide">
          12./13. Juni 2026 · Grillhütte Schmidthahn
        </span>
        <span className="hidden sm:inline text-white/15">·</span>

        {/* Live timer */}
        {time.init && (
          <div className="flex items-center gap-1.5 font-mono font-bold text-xs">
            <span className="text-pink-400">{time.d}<span className="font-normal text-white/25 ml-0.5">d</span></span>
            <span className="text-white/20">:</span>
            <span className="text-violet-400">{pad(time.h)}<span className="font-normal text-white/25 ml-0.5">h</span></span>
            <span className="text-white/20">:</span>
            <span className="text-blue-400">{pad(time.m)}<span className="font-normal text-white/25 ml-0.5">m</span></span>
            <span className="text-white/20">:</span>
            <span className="text-white/70">{pad(time.s)}<span className="font-normal text-white/25 ml-0.5">s</span></span>
          </div>
        )}

        <span className="hidden sm:inline text-white/15">·</span>
        <span className="hidden sm:inline text-white/35 text-xs tracking-wide">30 Jahre Abi Marienstatt</span>
      </div>
    </div>
  );
}
