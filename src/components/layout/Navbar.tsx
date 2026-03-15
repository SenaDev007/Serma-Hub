"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/filieres", label: "Filières" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [rejoindreOpen, setRejoindreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-serma-navy/95 backdrop-blur",
        scrolled && "shadow-lg"
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between" aria-label="Navigation principale">
        <Link href="/" className="font-display font-bold text-xl text-white flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="text-serma-orange">SERMA</span> HUB
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 hover:text-serma-orange transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setRejoindreOpen(!rejoindreOpen)}
              className="flex items-center gap-1 text-white/90 hover:text-serma-orange transition-colors text-sm font-medium"
              aria-expanded={rejoindreOpen}
              aria-haspopup="true"
            >
              Rejoindre SERMA HUB
              <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {rejoindreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full right-0 mt-2 py-2 w-48 bg-serma-navy rounded-lg shadow-xl border border-white/10"
                >
                  <Link
                    href="/inscription"
                    className="block px-4 py-2 text-white hover:bg-white/10 text-sm"
                    onClick={() => setRejoindreOpen(false)}
                  >
                    S&apos;inscrire comme apprenant
                  </Link>
                  <Link
                    href="/devenir-formateur"
                    className="block px-4 py-2 text-white hover:bg-white/10 text-sm"
                    onClick={() => setRejoindreOpen(false)}
                  >
                    Devenir formateur
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/dashboard"
            className="text-white/70 hover:text-serma-orange transition-colors text-sm"
          >
            Backoffice
          </Link>
          <Link
            href="/inscription"
            className="bg-serma-orange text-serma-navy font-display font-bold px-5 py-2.5 rounded-lg hover:bg-serma-orange/90 transition-colors"
          >
            S&apos;inscrire
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-serma-navy border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-white hover:text-serma-orange"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/inscription" className="py-2 text-serma-orange font-medium" onClick={() => setOpen(false)}>
                S&apos;inscrire comme apprenant
              </Link>
              <Link href="/devenir-formateur" className="py-2 text-white" onClick={() => setOpen(false)}>
                Devenir formateur
              </Link>
              <Link href="/dashboard" className="py-2 text-white/70" onClick={() => setOpen(false)}>
                Backoffice
              </Link>
              <Link
                href="/inscription"
                className="mt-2 bg-serma-orange text-serma-navy font-bold py-3 rounded-lg text-center"
                onClick={() => setOpen(false)}
              >
                S&apos;inscrire maintenant
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
