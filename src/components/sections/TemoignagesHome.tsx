"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { Temoignage } from "@prisma/client";

export function TemoignagesHome({ temoignages }: { temoignages: Temoignage[] }) {
  if (temoignages.length === 0) return null;
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-serma-navy">
            Ils ont transformé leur vie
          </h2>
          <p className="mt-3 text-serma-blue/80 max-w-2xl mx-auto">
            Témoignages de nos anciens apprenants.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {temoignages.slice(0, 3).map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-serma-light rounded-2xl p-6 border border-serma-navy/5"
            >
              <Quote className="w-10 h-10 text-serma-orange/50 mb-4" />
              <p className="text-serma-navy/90 italic">&ldquo;{t.texte.slice(0, 150)}...&rdquo;</p>
              <div className="flex gap-1 mt-3 text-serma-orange">
                {Array.from({ length: t.noteEtoiles }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 font-display font-bold text-serma-navy">
                {t.prenom} {t.nom}
              </p>
              <p className="text-sm text-serma-blue/80">{t.filiere}</p>
              {t.resultat && (
                <p className="text-sm text-serma-teal mt-1 font-medium">{t.resultat}</p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
