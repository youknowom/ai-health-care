//ai health doctor
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, Sparkles, Menu, X } from "lucide-react";

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "#f0fdf4",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {/* ── TOP ANNOUNCEMENT BANNER ── */}
      <div
        className="w-full py-2.5 flex items-center justify-center gap-2 text-white text-sm font-medium px-4"
        style={{
          background:
            "linear-gradient(90deg, #f97316 0%, #fb923c 30%, #fbbf24 60%, #f97316 100%)",
        }}
      >
        <Sparkles className="w-3 h-3 flex-shrink-0" />
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest opacity-80 flex-shrink-0">
          NEW
        </span>
        <span className="text-xs sm:text-sm text-center">
          AI Medical Intelligence is live in beta. Try Now
        </span>
        <ArrowRight className="w-3 h-3 flex-shrink-0" />
        <Sparkles className="w-3 h-3 flex-shrink-0 hidden sm:block" />
      </div>

      {/* ── NAVBAR — calls useUser() internally ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "85vh" }}
      >
        <div className="absolute inset-0 -z-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[500px] rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(ellipse, #fdba74 0%, #fcd34d 40%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-16 left-0 w-[500px] h-[500px] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(ellipse, #c4b5fd 0%, #a5b4fc 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-16 right-0 w-[500px] h-[500px] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(ellipse, #93c5fd 0%, #bfdbfe 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-[300px]"
            style={{
              background: "linear-gradient(to bottom, transparent, #f0fdf4)",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 sm:py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            className="mb-8 md:mb-10"
          >
            <span
              className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-neutral-700 border border-neutral-300/60"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              India&apos;s AI Medical Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, delay: 0.1 },
            }}
            className="text-[2.4rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-semibold text-neutral-950 max-w-4xl mx-auto leading-[1.05] tracking-[-0.03em]"
          >
            AI for all,
            <br />
            from your doctor.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.2 },
            }}
            className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed font-normal px-2"
          >
            Built on frontier-class AI. Powered by voice, vision, and context.
            <br className="hidden sm:block" />
            Delivering real healthcare intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, delay: 0.3 },
            }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 cursor-pointer rounded-full text-white text-sm sm:text-base font-semibold transition-all duration-200 hover:scale-[1.03] hover:opacity-90"
                style={{
                  background: "#111111",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.18)",
                }}
              >
                Experience MediPulse
              </button>
            </Link>
            <Link href="/sign-in" className="w-full sm:w-auto">
              {/* <button
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 cursor-pointer rounded-full text-neutral-800 text-sm sm:text-base font-medium transition-all duration-200 hover:bg-white/80"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(8px)",
                  boxShadow:
                    "0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)",
                }}
              >
                Sign in
              </button> */}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section
        className="py-10 sm:py-14 border-t border-green-200/60"
        style={{ background: "#f0fdf4" }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-7 sm:mb-10">
            Built for patients, doctors &amp; hospitals
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-40">
            {["Apollo", "Fortis", "AIIMS", "Max Health", "Narayana"].map(
              (name) => (
                <span
                  key={name}
                  className="text-lg sm:text-xl font-bold text-neutral-700 tracking-tight"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION HEADING ── */}
      <section
        className="pt-16 sm:pt-24 pb-6 sm:pb-8"
        style={{ background: "#dcfce7" }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 mb-4 sm:mb-5">
            For Patients | Doctors | Hospitals
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-950 tracking-[-0.025em]">
            India&apos;s full-stack AI medical platform
          </h2>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section
        className="pb-8 sm:pb-10 pt-8 sm:pt-10"
        style={{ background: "#dcfce7" }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-5 sm:space-y-6">
          <FeatureCard
            graphic={<AIDoctorGraphic />}
            eyebrow="FOR PATIENTS"
            title="AI Doctor"
            description="Talk to your AI doctor any time. Describe symptoms by voice or text and receive instant, evidence-based medical guidance powered by BioBERT and frontier language models."
            bullets={[
              {
                label: "Voice consultation",
                desc: "Real-time speech recognition",
              },
              {
                label: "Smart triage",
                desc: "98% symptom extraction accuracy",
              },
              {
                label: "10 specialists",
                desc: "From cardiology to dermatology",
              },
            ]}
            cta="Start consultation"
            href="/dashboard"
          />

          <FeatureCard
            reverse
            graphic={<NearMeGraphic />}
            eyebrow="FOR PATIENTS"
            title="Near Me Doctor"
            description="Find verified doctors and clinics near you instantly. Filter by specialty, check real-time availability, and book appointments in a single tap — no phone calls needed."
            bullets={[
              { label: "GPS-powered map", desc: "Live location search" },
              { label: "Verified profiles", desc: "Credentials & reviews" },
              { label: "Instant booking", desc: "One-tap appointments" },
            ]}
            cta="Find doctors"
            href="/dashboard"
          />

          <FeatureCard
            graphic={<ScanReportsGraphic />}
            eyebrow="FOR PATIENTS & DOCTORS"
            title="Scan Medical Reports"
            description="Upload any lab report, prescription, or X-ray image. Our AI extracts every key value, flags abnormalities, and explains results in plain language — instantly."
            bullets={[
              { label: "OCR extraction", desc: "PDF & image scan" },
              { label: "X-ray AI", desc: "CNN detects pneumonia & anomalies" },
              { label: "Plain English", desc: "No medical jargon" },
            ]}
            cta="Scan a report"
            href="/dashboard/ocr-analysis"
          />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 sm:py-32" style={{ background: "#f0fdf4" }}>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-neutral-950 tracking-[-0.03em] leading-tight mb-6 sm:mb-8">
              Your health deserves
              <br />
              intelligent care.
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg mb-8 sm:mb-12 max-w-lg mx-auto px-2">
              Join patients and doctors already using MediPulse for smarter,
              faster healthcare.
            </p>
            <Link href="/dashboard">
              <button
                className="cursor-pointer px-7 sm:px-10 py-3.5 sm:py-4 rounded-full text-white text-sm sm:text-base font-semibold transition-all duration-200 hover:scale-[1.03] hover:opacity-90"
                style={{
                  background: "#111111",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.18)",
                }}
              >
                Experience MediPulse
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 sm:py-10 border-t border-green-200/60"
        style={{ background: "#f0fdf4" }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="text-xl font-bold text-neutral-900 tracking-tight">
            medipulse
          </span>
          <p className="text-xs text-neutral-400 text-center order-last sm:order-none">
            © {new Date().getFullYear()} MediPulse. AI guidance only not a
            substitute for professional medical advice.
          </p>
          <div className="flex gap-5 text-sm text-neutral-400">
            <Link href="#" className="hover:text-neutral-700 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-neutral-700 transition-colors">
              Terms
            </Link>
            <span className="text-neutral-500">v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Navbar — useUser() called HERE, not passed as prop
// ─────────────────────────────────────────────────────────
function Navbar() {
  // ✅ Called directly inside Navbar so Clerk always has fresh auth state
  const { user, isLoaded } = useUser();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background:
          scrolled || menuOpen
            ? "rgba(240,253,244,0.97)"
            : "rgba(240,253,244,0.75)",
        backdropFilter: "blur(16px)",
        borderBottom:
          scrolled || menuOpen
            ? "1px solid rgba(0,0,0,0.07)"
            : "1px solid transparent",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-neutral-900 tracking-tight hover:opacity-70 transition-opacity"
          >
            medipulse
          </Link>

          {/* Center nav links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {["Features", "How it works", "Docs"].map((label) => (
              <button
                key={label}
                className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 transition-all duration-150"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right CTAs — desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* ✅ Show skeleton until Clerk resolves auth state */}
            {!isLoaded ? (
              <div className="w-32 h-9 rounded-full bg-neutral-200 animate-pulse" />
            ) : !user ? (
              <>
                <Link href="/sign-in">
                  <button
                    className="px-5 py-2.5 rounded-full text-neutral-800 text-sm font-medium transition-all duration-150 hover:bg-white"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      boxShadow:
                        "0 1px 3px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)",
                    }}
                  >
                    Sign in
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button
                    className="cursor-pointer px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-150 hover:opacity-90"
                    style={{
                      background: "#111",
                      boxShadow:
                        "inset 0 0 0 1px rgba(255,255,255,0.14), 0 2px 8px rgba(0,0,0,0.18)",
                    }}
                  >
                    Experience MediPulse
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <UserButton />
                <Link href="/dashboard">
                  <button
                    className="cursor-pointer px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-150 hover:opacity-90"
                    style={{
                      background: "#111",
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)",
                    }}
                  >
                    Dashboard
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile right: user + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* ✅ Only show UserButton once Clerk has confirmed user is logged in */}
            {isLoaded && user && <UserButton />}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-neutral-700 hover:bg-neutral-100/80 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="pb-5 pt-2 flex flex-col gap-2">
                {["Features", "How it works", "Docs"].map((label) => (
                  <button
                    key={label}
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100/70 transition-colors"
                  >
                    {label}
                  </button>
                ))}

                <div className="pt-2 border-t border-neutral-200/60 flex flex-col gap-2">
                  {/* ✅ Same isLoaded guard for mobile menu */}
                  {!isLoaded ? (
                    <div className="w-full h-10 rounded-full bg-neutral-200 animate-pulse" />
                  ) : !user ? (
                    <>
                      <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                        <button className="w-full py-2.5 rounded-full text-neutral-800 text-sm font-medium border border-neutral-300/60 hover:bg-white transition-colors">
                          Sign in
                        </button>
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setMenuOpen(false)}
                      >
                        <button
                          className="w-full py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                          style={{ background: "#111" }}
                        >
                          Experience MediPulse
                        </button>
                      </Link>
                    </>
                  ) : (
                    <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                      <button
                        className="w-full py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                        style={{ background: "#111" }}
                      >
                        Dashboard
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────
// FeatureCard
// ─────────────────────────────────────────────────────────
function FeatureCard({
  graphic,
  eyebrow,
  title,
  description,
  bullets,
  cta,
  href,
  reverse = false,
}: {
  graphic: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  bullets: { label: string; desc: string }[];
  cta: string;
  href: string;
  reverse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      viewport={{ once: true }}
      className="rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden grid grid-cols-1 md:grid-cols-2"
      style={{
        background: "#f0fdf4",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(22,163,74,0.12)",
      }}
    >
      <div
        className={`min-h-[240px] sm:min-h-[320px] md:min-h-[400px] ${reverse ? "md:order-2" : ""}`}
      >
        {graphic}
      </div>
      <div
        className={`flex flex-col justify-center p-7 sm:p-10 md:p-14 ${reverse ? "md:order-1" : ""}`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
          {eyebrow}
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-950 tracking-[-0.025em] mb-4 sm:mb-5">
          {title}
        </h3>
        <p className="text-neutral-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
          {description}
        </p>
        <ul className="space-y-3 sm:space-y-4 mb-7 sm:mb-10">
          {bullets.map((b) => (
            <li key={b.label} className="flex items-start gap-3">
              <span className="mt-1 text-green-500 text-base sm:text-lg flex-shrink-0">
                ✦
              </span>
              <div>
                <span className="font-semibold text-neutral-800 text-sm">
                  {b.label}
                </span>
                <span className="text-neutral-500 text-sm"> — {b.desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <Link href={href}>
          <button
            className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              boxShadow:
                "0 2px 10px rgba(22,163,74,0.35), inset 0 0 0 1px rgba(255,255,255,0.15)",
            }}
          >
            {cta} <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Graphics
// ─────────────────────────────────────────────────────────
function AIDoctorGraphic() {
  return (
    <div
      className="h-full min-h-[320px] flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #c4b5fd 0%, #818cf8 40%, #6366f1 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        <div
          className="w-48 h-48 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 70%)",
            transform: "translateY(40%)",
          }}
        />
      </div>
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-white/30"
        style={{ boxShadow: "0 0 0 12px rgba(255,255,255,0.1)" }}
      />
      <div className="relative z-10 text-white/20 text-[8rem] font-bold select-none">
        +
      </div>
    </div>
  );
}

function NearMeGraphic() {
  return (
    <div
      className="h-full min-h-[320px] flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #67e8f9 0%, #38bdf8 50%, #0ea5e9 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-end justify-center">
        <div
          className="w-64 h-40 rounded-t-full"
          style={{
            background: "rgba(255,255,255,0.12)",
            transform: "translateY(20%)",
          }}
        />
      </div>
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/80" />
        <div className="w-1 h-24 bg-white/20" />
      </div>
      <div className="relative z-10 text-white/15 text-[8rem] font-bold select-none">
        ◎
      </div>
    </div>
  );
}

function ScanReportsGraphic() {
  return (
    <div
      className="h-full min-h-[320px] flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #6ee7b7 0%, #34d399 40%, #059669 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-white"
            style={{
              width: "80%",
              top: `${20 + i * 15}%`,
              opacity: 1 - i * 0.15,
            }}
          />
        ))}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.15), transparent)",
        }}
      />
      <div className="relative z-10 text-white/15 text-[8rem] font-bold select-none">
        ≡
      </div>
    </div>
  );
}
