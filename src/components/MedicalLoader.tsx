//ai health doctor
"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────
// MedicalLoader — premium full-screen loading screen
// Features: ECG heartbeat line, pulsing cross, DNA dots, progress bar
// ─────────────────────────────────────────────────────────

export default function MedicalLoader() {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("Initialising MediPulse...");

  useEffect(() => {
    const labels = [
      "Initialising MediPulse...",
      "Securing your session...",
      "Loading medical intelligence...",
      "Almost ready...",
    ];

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setProgress((p) => Math.min(p + Math.random() * 22 + 8, 92));
      if (step < labels.length) setLabel(labels[step]);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="medical-loader-root">
      {/* ── Background radial glow ── */}
      <div className="medical-loader-bg" />

      {/* ── Center card ── */}
      <div className="medical-loader-card">
        {/* ── Pulsing cross icon ── */}
        <div className="medical-cross-wrap">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="medical-cross-svg"
          >
            {/* Outer ring pulse */}
            <circle cx="32" cy="32" r="30" className="cross-ring-1" />
            <circle cx="32" cy="32" r="30" className="cross-ring-2" />
            {/* Background circle */}
            <circle cx="32" cy="32" r="28" fill="#0f172a" />
            {/* Cross shape */}
            <rect x="26" y="12" width="12" height="40" rx="3" fill="#38bdf8" />
            <rect x="12" y="26" width="40" height="12" rx="3" fill="#38bdf8" />
          </svg>
        </div>

        {/* ── Brand name ── */}
        <p className="medical-brand">medipulse</p>

        {/* ── ECG Heartbeat SVG ── */}
        <div className="ecg-container">
          <svg
            viewBox="0 0 400 80"
            xmlns="http://www.w3.org/2000/svg"
            className="ecg-svg"
            preserveAspectRatio="none"
          >
            <polyline
              className="ecg-line"
              points="
                0,40
                30,40
                45,40
                55,10
                65,70
                75,20
                85,40
                115,40
                130,40
                140,10
                150,70
                160,20
                170,40
                200,40
                215,40
                225,10
                235,70
                245,20
                255,40
                285,40
                300,40
                310,10
                320,70
                330,20
                340,40
                370,40
                400,40
              "
            />
            {/* Moving glowing dot */}
            <circle r="4" className="ecg-dot">
              <animateMotion
                dur="2.4s"
                repeatCount="indefinite"
                path="M0,40 L30,40 L45,40 L55,10 L65,70 L75,20 L85,40 L115,40 L130,40 L140,10 L150,70 L160,20 L170,40 L200,40 L215,40 L225,10 L235,70 L245,20 L255,40 L285,40 L300,40 L310,10 L320,70 L330,20 L340,40 L370,40 L400,40"
              />
            </circle>
          </svg>
        </div>

        {/* ── DNA helix dots row ── */}
        <div className="dna-row">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="dna-dot-wrap">
              <span
                className="dna-dot top"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
              <span
                className="dna-dot bottom"
                style={{ animationDelay: `${i * 0.12 + 0.35}s` }}
              />
            </div>
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* ── Status label ── */}
        <p className="medical-status">{label}</p>
      </div>

      {/* ── Inline styles (isolated, no Tailwind needed) ── */}
      <style>{`
        .medical-loader-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0f1e;
          font-family: var(--font-geist-sans), system-ui, sans-serif;
        }

        /* Radial background glow */
        .medical-loader-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56,189,248,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Center card */
        .medical-loader-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 40px 48px;
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(56, 189, 248, 0.15);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 24px 64px rgba(0,0,0,0.6),
            0 0 80px rgba(56,189,248,0.06);
          backdrop-filter: blur(20px);
          width: min(420px, 90vw);
        }

        /* ── Cross icon ── */
        .medical-cross-wrap {
          width: 72px;
          height: 72px;
        }
        .medical-cross-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .cross-ring-1 {
          stroke: rgba(56, 189, 248, 0.4);
          stroke-width: 1.5;
          fill: none;
          animation: crossPulse 2s ease-out infinite;
        }
        .cross-ring-2 {
          stroke: rgba(56, 189, 248, 0.2);
          stroke-width: 1;
          fill: none;
          animation: crossPulse 2s ease-out infinite 0.5s;
        }
        @keyframes crossPulse {
          0%   { r: 30; opacity: 0.8; }
          100% { r: 44; opacity: 0; }
        }

        /* ── Brand ── */
        .medical-brand {
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          margin: 0;
        }

        /* ── ECG line ── */
        .ecg-container {
          width: 100%;
          height: 56px;
          overflow: hidden;
        }
        .ecg-svg {
          width: 100%;
          height: 100%;
        }
        .ecg-line {
          fill: none;
          stroke: #38bdf8;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: ecgDraw 2.4s linear infinite;
          filter: drop-shadow(0 0 6px rgba(56,189,248,0.9));
        }
        @keyframes ecgDraw {
          0%   { stroke-dashoffset: 1000; opacity: 1; }
          85%  { stroke-dashoffset: 0;    opacity: 1; }
          100% { stroke-dashoffset: 0;    opacity: 0; }
        }
        .ecg-dot {
          fill: #7dd3fc;
          filter: drop-shadow(0 0 5px #38bdf8);
        }

        /* ── DNA helix dots ── */
        .dna-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dna-dot-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .dna-dot {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: dnaFloat 1.2s ease-in-out infinite alternate;
        }
        .dna-dot.top {
          background: #38bdf8;
          box-shadow: 0 0 8px rgba(56,189,248,0.7);
        }
        .dna-dot.bottom {
          background: #818cf8;
          box-shadow: 0 0 8px rgba(129,140,248,0.7);
        }
        @keyframes dnaFloat {
          0%   { transform: translateY(-5px); opacity: 0.5; }
          100% { transform: translateY(5px);  opacity: 1;   }
        }

        /* ── Progress bar ── */
        .progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #38bdf8 0%, #818cf8 100%);
          transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          box-shadow: 0 0 10px rgba(56,189,248,0.6);
        }

        /* ── Status label ── */
        .medical-status {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(148, 163, 184, 0.8);
          margin: 0;
          text-transform: uppercase;
          transition: opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
}
