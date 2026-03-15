"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 * i },
  }),
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stats = [
  { value: 500, suffix: "+", label: "Apprenants formés" },
  { value: 5, suffix: "", label: "Filières" },
  { value: 85, suffix: "%", label: "Taux d'insertion" },
  { value: "3-6", suffix: " mois", label: "Accompagnement" },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-serma-navy">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-serma-navy/60" aria-hidden="true" />
      </div>
      <div className="container mx-auto px-4 relative z-10 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white/90 text-sm">
              <GraduationCap className="w-4 h-4 text-serma-orange" />
              Centre de Formation Professionnelle Entrepreneuriale Appliquée (CFPEA) — Parakou, Bénin
            </span>
          </motion.div>
          <motion.h1
            variants={item}
            className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight text-center"
          >
            <span className="text-white">ENTREPRENDRE</span>
            <span className="mx-1.5 sm:mx-2 text-white/60" aria-hidden="true">•</span>
            <span className="text-serma-orange">INNOVER</span>
            <span className="mx-1.5 sm:mx-2 text-white/60" aria-hidden="true">•</span>
            <span className="text-serma-teal">IMPACTER</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-xl text-white/90 font-accent italic max-w-2xl mx-auto"
          >
            Éveiller les esprits, transformer l&apos;avenir entrepreneurial en Afrique
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 bg-serma-orange text-serma-navy font-display font-bold px-8 py-4 rounded-lg hover:bg-serma-orange/90 transition-colors shadow-lg"
            >
              S&apos;inscrire maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/filieres"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-display font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            >
              Découvrir les filières
            </Link>
          </motion.div>
          <motion.div
            variants={item}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl text-serma-orange">
                  {typeof stat.value === "string" ? (
                    stat.value + stat.suffix
                  ) : (
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-white/80 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
