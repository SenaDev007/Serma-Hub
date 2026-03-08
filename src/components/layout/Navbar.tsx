"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/filieres", label: "Filières" },
  { href: "/#parcours", label: "Parcours" },
  { href: "/impact", label: "Impact" },
  { href: "/partenaires", label: "Partenaires" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D1B2A]/95 backdrop-blur-xl border-b border-[#253548]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "72px" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#F5A623] flex items-center justify-center text-[#0D1B2A] group-hover:scale-105 transition-transform">
            <GraduationCap size={20} strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-syne font-bold text-base text-white tracking-tight">
              SERMA <span className="text-[#F5A623]">HUB</span>
            </div>
            <div className="text-[10px] text-[#8B9BB4] font-dm tracking-widest uppercase">
              Impact Academy
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-dm font-medium text-[#8B9BB4] hover:text-white hover:bg-[#1E2D3D] transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-[#F5A623] text-[#0D1B2A] font-syne font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#e09620] transition-colors shadow-accent group"
          >
            S&apos;inscrire
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <button
            className="md:hidden p-2 rounded-lg text-[#8B9BB4] hover:text-white hover:bg-[#1E2D3D] transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D1B2A] border-t border-[#253548] px-6 py-5 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-dm text-[#8B9BB4] hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 mt-4 bg-[#F5A623] text-[#0D1B2A] font-syne font-bold text-sm px-5 py-3 rounded-xl"
          >
            S&apos;inscrire <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </header>
  );
}
