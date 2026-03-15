"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats: Array<
  | { value: number; suffix: string; label: string }
  | { value: number; suffix: string; label: string; raw: true }
> = [
  { value: 500, suffix: "+", label: "Apprenants formés" },
  { value: 85, suffix: "%", label: "Taux d'emploi / création" },
  { value: 12, suffix: "+", label: "Partenaires" },
  { value: 50, suffix: " M", label: "FCFA générés (revenus apprenants)", raw: true },
];

export function Impact() {
  return (
    <section className="py-20 bg-serma-navy relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h10v10H0V0zm20 20h10v10H20V20z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            Chiffres & Impact
          </h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            Notre engagement en faveur de l&apos;entrepreneuriat en Afrique.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-bold text-3xl md:text-4xl text-serma-orange">
                {stat && "raw" in stat && stat.raw ? (
                  `${stat.value}${stat.suffix}`
                ) : (
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-white/90 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
