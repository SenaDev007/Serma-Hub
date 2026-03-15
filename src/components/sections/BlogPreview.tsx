"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Article } from "@prisma/client";
import { formatDate } from "@/lib/utils";

export function BlogPreview({ articles }: { articles: Article[] }) {
  const published = articles.filter((a) => a.publie && a.datePublication).slice(0, 3);
  if (published.length === 0) return null;
  return (
    <section className="py-20 bg-serma-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end flex-wrap gap-4 mb-12"
        >
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-serma-navy">
              Blog & Actualités
            </h2>
            <p className="mt-2 text-serma-blue/80">
              Conseils et actualités sur l&apos;entrepreneuriat.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-serma-orange font-display font-bold flex items-center gap-2 hover:gap-3 transition-all"
          >
            Voir tout
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {published.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <Link href={`/blog/${article.slug}`} className="block">
                <div className="aspect-video bg-serma-navy/10 relative overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-serma-navy/30 font-display font-bold text-4xl">
                      {article.titre.slice(0, 1)}
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-serma-orange text-serma-navy text-xs font-bold px-2 py-1 rounded">
                    {article.categorie}
                  </span>
                </div>
                <div className="p-5">
                  <time className="text-sm text-serma-blue/70">
                    {article.datePublication && formatDate(article.datePublication)}
                  </time>
                  <h3 className="mt-2 font-display font-bold text-serma-navy group-hover:text-serma-orange transition-colors line-clamp-2">
                    {article.titre}
                  </h3>
                  <p className="mt-2 text-serma-blue/80 text-sm line-clamp-2">{article.extrait}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-serma-orange font-medium text-sm">
                    Lire la suite
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
