"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, Sparkles } from "lucide-react";

const blocks = [
  {
    title: "Business First",
    description: "Chaque formation est conçue pour que tu sortes avec un projet testé et des premiers revenus.",
    icon: Briefcase,
    accent: "serma-orange",
  },
  {
    title: "Accompagnement inclus",
    description: "Mentorat, suivi terrain et réseau alumni pour ne pas rester seul après la formation.",
    icon: Users,
    accent: "serma-teal",
  },
  {
    title: "Réseau Alumni actif",
    description: "Rejoins une communauté d'entrepreneurs qui s'entraident et partagent des opportunités.",
    icon: Sparkles,
    accent: "serma-blue",
  },
];

const accentBg: Record<string, string> = {
  "serma-orange": "bg-serma-orange/10",
  "serma-teal": "bg-serma-teal/10",
  "serma-blue": "bg-serma-blue/10",
};

const accentIcon: Record<string, string> = {
  "serma-orange": "text-serma-orange",
  "serma-teal": "text-serma-teal",
  "serma-blue": "text-serma-blue",
};

export function Difference() {
  return (
    <section className="py-24 md:py-32 bg-serma-light relative overflow-hidden">
      {/* Fond décoratif discret */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--serma-navy) 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, var(--serma-navy) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <p className="text-serma-orange font-display font-bold text-sm uppercase tracking-widest mb-3">
            Notre différence
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-serma-navy leading-tight">
            Pourquoi SERMA HUB ?
          </h2>
          <p className="mt-4 text-lg text-serma-blue/80 font-body">
            Pas un cours. <span className="font-accent italic text-serma-navy">Une entreprise.</span>
          </p>
        </motion.header>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {blocks.map((block, i) => (
            <motion.article
              key={block.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white rounded-2xl p-8 shadow-sm border border-serma-navy/5
                         hover:shadow-xl hover:border-serma-navy/10 transition-all duration-300"
            >
              {/* Ligne d'accent en haut */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${
                  block.accent === "serma-orange"
                    ? "bg-serma-orange"
                    : block.accent === "serma-teal"
                    ? "bg-serma-teal"
                    : "bg-serma-blue"
                }`}
                aria-hidden
              />
              <div className="flex flex-col h-full">
                <div
                  className={`inline-flex w-14 h-14 items-center justify-center rounded-2xl ${accentBg[block.accent]} ${accentIcon[block.accent]} mb-6
                             group-hover:scale-110 transition-transform duration-300`}
                >
                  <block.icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold text-xl text-serma-navy">
                  {block.title}
                </h3>
                <p className="mt-3 text-serma-blue/80 leading-relaxed flex-1">
                  {block.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
