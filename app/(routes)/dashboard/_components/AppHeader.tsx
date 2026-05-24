//ai health doctor
"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuOptions = [
  { id: 1, name: "Home", path: "/dashboard" },
  { id: 2, name: "History", path: "/dashboard/history" },
  { id: 3, name: "Billing", path: "/dashboard/billing" },
];

function AppHeader() {
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
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background:
          scrolled || menuOpen
            ? "rgba(240,253,244,0.97)"
            : "rgba(240,253,244,0.75)",
        backdropFilter: "blur(16px)",
        borderBottom:
          scrolled || menuOpen
            ? "1px solid rgba(22,163,74,0.12)"
            : "1px solid transparent",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-neutral-900 tracking-tight hover:opacity-70 transition-opacity flex-shrink-0"
          >
            medipulse
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {menuOptions.map((opt) => (
              <Link
                key={opt.id}
                href={opt.path}
                className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 transition-all duration-150 flex items-center gap-1"
              >
                {opt.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <UserButton />
            {/* Mobile hamburger */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-neutral-700 hover:bg-neutral-100/80 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <nav className="flex flex-col gap-1 pb-4 pt-2">
                {menuOptions.map((opt) => (
                  <Link
                    key={opt.id}
                    href={opt.path}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-3 rounded-xl text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 transition-colors"
                  >
                    {opt.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default AppHeader;
