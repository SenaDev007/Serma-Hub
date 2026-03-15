"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, Sparkles } from "lucide-react";

const blocks = [
  {
    title: "Business First",
    description: "Chaque formation est conçue pour que tu sortes avec un projet testé et des premiers revenus.",
    icon: Briefcase,
    side: "left",
  },
  {
    title: "Accompagnement inclus",
    description: "Mentorat, suivi terrain et réseau alumni pour ne pas rester seul après la formation.",
    icon: Users,
    side: "right",
  },
  {
    title: "Réseau Alumni actif",
    description: "Rejoins une communauté d'entrepreneurs qui s'entraident et partagent des opportunités.",
    icon: Sparkles,
    side: "left",
  },
];

export function Difference() {
  return (
    <section className="py-20 bg-serma-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-serma-navy">
            Pourquoi SERMA HUB ?
          </h2>
          <p className="mt-3 text-serma-blue/80 max-w-2xl mx-auto">
            Pas un cours. Une entreprise.
          </p>
        </motion.div>
        <div className="space-y-0">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, x: block.side === "left" ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row gap-8 items-center py-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                <div className={`inline-flex p-4 rounded-xl bg-serma-orange/10 text-serma-orange ${i % 2 === 1 ? "md:ml-auto" : ""}`}>
                  <block.icon className="w-8 h-8" />
                </div>
                <h3 className="mt-4 font-display font-bold text-xl text-serma-navy">{block.title}</h3>
                <p className="mt-2 text-serma-blue/80">{block.description}</p>
              </div>
              <div className={`flex-1 border-l-4 border-serma-orange bg-white p-6 rounded-r-xl shadow-sm min-h-[120px] ${i % 2 === 1 ? "border-l-0 border-r-4 md:rounded-l-xl md:rounded-r-none" : ""}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
