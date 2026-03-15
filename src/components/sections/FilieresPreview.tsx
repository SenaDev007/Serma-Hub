"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Filiere } from "@prisma/client";

const filiereColors: Record<string, string> = {
  "commerce-distribution": "bg-filiere-commerce",
  "agro-business": "bg-filiere-agro",
  "services-techniques": "bg-filiere-tech",
  "digital-local": "bg-filiere-digital",
  "entrepreneur-feminin": "bg-filiere-feminin",
};

/** Chemins des images dans public/images/filieres/ (ex. commerce-distribution.jpg) */
const filiereImagePath = (slug: string) => `/images/filieres/${slug}.jpg`;

function FiliereCard({ filiere: f, index: i }: { filiere: Filiere; index: number }) {
  const [imgError, setImgError] = useState(false);
  const colorClass = filiereColors[f.slug] ?? "bg-serma-blue";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow border border-serma-navy/5"
    >
      <Link href={`/filieres/${f.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-serma-navy/10">
          {!imgError ? (
            <Image
              src={filiereImagePath(f.slug)}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={`absolute inset-0 ${colorClass} opacity-80`} aria-hidden />
          )}
          <div className={`absolute inset-0 opacity-40 ${colorClass}`} aria-hidden />
          <span
            className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-white text-sm font-medium shadow ${colorClass}`}
          >
            {f.nom}
          </span>
        </div>
        <div className="p-5">
          <p className="text-serma-navy/90 text-sm line-clamp-2">{f.description}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-serma-orange font-display font-bold text-sm group-hover:gap-3 transition-all">
            En savoir plus
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function FilieresPreview({ filieres }: { filieres: Filiere[] }) {
  return (
    <section className="py-20 bg-serma-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-serma-navy">
            Les 5 filières
          </h2>
          <p className="mt-3 text-serma-blue/80 max-w-2xl mx-auto">
            Choisis la formation qui correspond à ton projet entrepreneurial.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filieres.slice(0, 5).map((f, i) => (
            <FiliereCard key={f.id} filiere={f} index={i} />
          ))}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-serma-navy p-6 flex flex-col justify-center items-center text-center"
          >
            <p className="text-white/90 font-display font-bold mb-2">Tu hésites ?</p>
            <p className="text-white/70 text-sm mb-4">Découvre toutes nos filières et trouve ta voie.</p>
            <Link
              href="/filieres"
              className="inline-flex items-center gap-2 bg-serma-orange text-serma-navy font-display font-bold px-6 py-3 rounded-lg hover:bg-serma-orange/90 transition-colors"
            >
              Voir toutes les filières
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
