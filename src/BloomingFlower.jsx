import React, { useState, useEffect } from "react";

// BloomingFlower.jsx
// Single-file React component (default export) that shows a clickable flower which blooms when clicked
// Uses Tailwind classes for layout. Includes small CSS for bloom animations.

export default function BloomingFlower() {
  const [bloomed, setBloomed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (bloomed) {
      const t = setTimeout(() => setShowMessage(true), 600); // show message after bloom starts
      return () => clearTimeout(t);
    } else {
      setShowMessage(false);
    }
  }, [bloomed]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-rose-50 p-6">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-rose-700">Tap the flower to make it bloom</h1>

        <div
          role="button"
          tabIndex={0}
          onClick={() => setBloomed((s) => !s)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setBloomed((s) => !s)}
          aria-pressed={bloomed}
          className="mx-auto w-64 h-64 rounded-2xl shadow-2xl bg-white/60 backdrop-blur p-4 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        >
          {/* SVG Flower */}
          <svg viewBox="0 0 200 200" className="w-48 h-48" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gCenter" cx="50%" cy="40%">
                <stop offset="0%" stopColor="#fff59d" />
                <stop offset="100%" stopColor="#ffb677" />
              </radialGradient>
            </defs>

            {/* Stem */}
            <g transform="translate(100,120)">
              <rect x="-3" y="0" width="6" height="70" rx="3" fill="#6aa84f" />
              <path d="M-3 10 C -30 40, -10 60, -20 80" fill="#6aa84f" opacity="0.9" />
            </g>

            {/* Petals - 8 petals rotated around center */}
            <g transform="translate(100,80)">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (360 / 8) * i;
                // Each petal is a path that will scale/rotate when bloomed
                return (
                  <g
                    key={i}
                    transform={`rotate(${angle}) translate(0, -18)`}
                    className={bloomed ? `petal petal--bloom` : `petal`}
                    style={{ transformOrigin: '100px 100px' }}
                  >
                    <ellipse cx="0" cy="0" rx="18" ry="36" fill="#ff6b9a" />
                    <ellipse cx="-4" cy="-6" rx="12" ry="26" fill="#ff9fc0" opacity="0.9" />
                  </g>
                );
              })}

              {/* Center */}
              <circle cx="0" cy="0" r="20" fill="url(#gCenter)" stroke="#f1c40f" strokeWidth="3" />
            </g>

            {/* Optional leaves near stem (subtle) */}
            <g transform="translate(100,140)">
              <ellipse cx="-18" cy="10" rx="18" ry="8" fill="#6aa84f" transform={bloomed ? "rotate(-12) translate(-6,0)" : "rotate(-12)"} opacity="0.95" />
              <ellipse cx="18" cy="22" rx="16" ry="7" fill="#6aa84f" transform={bloomed ? "rotate(18) translate(6,0)" : "rotate(18)"} opacity="0.95" />
            </g>
          </svg>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-rose-600 text-white font-medium shadow hover:brightness-105 transition"
            onClick={() => setBloomed(true)}
          >
            Bloom
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 font-medium shadow hover:brightness-95 transition"
            onClick={() => setBloomed(false)}
          >
            Reset
          </button>
        </div>

        {/* Message that appears after bloom */}
        <div className="mt-8 min-h-[3rem] flex items-center justify-center">
          {showMessage && (
            <div className={`message shadow-lg p-4 rounded-xl inline-flex items-center gap-3`}> 
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21s-6.716-4.35-9.196-7.08C-0.74 10.97 3.5 6 7.5 7.5 9.5 8.2 10 10 12 11c2-1 2.5-2.8 4.5-3.5 4-1.5 8.24 3.47 4.696 6.42C18.716 16.65 12 21 12 21z" fill="#ff6b9a" />
              </svg>
              <div className="text-left">
                <div className="text-lg font-semibold text-rose-700">I am sorry Shrutu</div>
                <div className="text-sm text-gray-600">A little bloom to say it from the heart.</div>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-gray-500">Tip: click/tap the flower or press Enter/Space while focused to toggle bloom.</p>
      </div>

      {/* Component-scoped styles for animation. Tailwind utilities handle layout; small custom CSS drives the bloom timing. */}
      <style>{`
        .petal { 
          transform-origin: 100px 100px; /* approximate center of svg area */
          transform: scale(0.18) translateY(24px) rotate(0deg);
          opacity: 0.0;
          transition: transform 650ms cubic-bezier(.2,.9,.3,1), opacity 500ms ease;
        }
        .petal--bloom {
          transform: scale(1) translateY(0px) rotate(0deg);
          opacity: 1;
        }

        /* Slight stagger for petals to make the bloom feel organic */
        .petal:nth-child(1) { transition-delay: 0ms; }
        .petal:nth-child(2) { transition-delay: 40ms; }
        .petal:nth-child(3) { transition-delay: 80ms; }
        .petal:nth-child(4) { transition-delay: 120ms; }
        .petal:nth-child(5) { transition-delay: 160ms; }
        .petal:nth-child(6) { transition-delay: 200ms; }
        .petal:nth-child(7) { transition-delay: 240ms; }
        .petal:nth-child(8) { transition-delay: 280ms; }

        /* message entrance */
        .message {
          animation: dropFade 650ms cubic-bezier(.2,.9,.3,1);
        }

        @keyframes dropFade {
          from { transform: translateY(-8px) scale(0.98); opacity: 0 }
          to   { transform: translateY(0) scale(1); opacity: 1 }
        }

        /* small responsive tweak */
        @media (max-width: 640px) {
          .petal { transform-origin: 80px 80px; }
        }
      `}</style>
    </div>
  );
}
