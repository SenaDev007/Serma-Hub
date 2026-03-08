import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { IMPACT_STATS, PHASES_EXPANSION } from "@/lib/data";
import { Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre Impact — SERMA HUB",
  description: "Découvrez l'impact concret de SERMA HUB : entrepreneurs formés, entreprises créées, et notre plan d'expansion pour 2025–2027.",
};

const TEMOIGNAGES = [
  { nom: "Aminatou K.", promo: "Commerce · Jan 2025",       texte: "Avant SERMA, je vendais de façon informelle sans savoir si je gagnais vraiment de l'argent. Aujourd'hui j'ai une boutique structurée avec 47 clients réguliers." },
  { nom: "Kofi M.",     promo: "Commerce · Oct 2024",       texte: "La méthode SERMA m'a permis de multiplier mes revenus par 3 en 4 mois. Les formateurs t'accompagnent vraiment jusqu'au premier client réel." },
  { nom: "Rachida B.",  promo: "Agro-Business · Juin 2024", texte: "J'ai lancé ma boutique de produits locaux pendant la formation. Avant même de terminer, j'avais déjà rentabilisé ma formation." },
];

export default function ImpactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0D1B2A] pt-28 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Résultats mesurables</p>
            <h1 className="font-syne font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              Notre <span className="text-[#F5A623]">impact</span>
            </h1>
            <p className="text-[#8B9BB4] font-dm text-[17px] leading-relaxed max-w-2xl mx-auto">
              Chaque chiffre ici représente un entrepreneur qui a transformé son idée en activité génératrice de revenus.
            </p>
          </div>
        </section>

        {/* KPIs */}
        <section className="py-20 px-6 bg-[#0D1B2A]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {IMPACT_STATS.map((s) => (
                <div key={s.label} className="text-center p-8 bg-[#1E2D3D] border border-[#253548] rounded-2xl hover:border-[#F5A623]/40 transition-all">
                  <div className="font-syne font-bold text-[#F5A623] mb-2" style={{ fontSize: "clamp(32px,4vw,50px)" }}>
                    {s.num}{s.suffix}
                  </div>
                  <div className="text-[12px] font-dm font-medium text-[#8B9BB4] uppercase tracking-wider leading-snug">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Témoignages */}
            <h2 className="font-syne font-bold text-white text-2xl text-center mb-10">Ce que disent nos apprenants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEMOIGNAGES.map((t) => (
                <div key={t.nom} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-8 hover:border-[#F5A623]/30 transition-all">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="text-[#F5A623]" fill="#F5A623" />
                    ))}
                  </div>
                  <p className="text-[14px] font-dm text-[#F8F9FA] leading-relaxed mb-5 italic">&ldquo;{t.texte}&rdquo;</p>
                  <div>
                    <strong className="font-syne font-bold text-white text-sm block">{t.nom}</strong>
                    <span className="text-[12px] font-dm text-[#8B9BB4]">{t.promo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expansion */}
        <section className="py-20 px-6 bg-[#1E2D3D]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Feuille de route</p>
              <h2 className="font-syne font-bold text-white text-3xl">Plan d&apos;expansion 2025–2027</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PHASES_EXPANSION.map((p, i) => (
                <div key={p.phase} className={`bg-[#0D1B2A] border rounded-2xl p-8 ${p.actif ? "border-[#F5A623]/40" : "border-[#253548]"}`}>
                  <div className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center font-syne font-bold text-[#0D1B2A] text-lg mb-4 flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-[11px] font-dm font-semibold tracking-widest text-[#F5A623] uppercase mb-2">{p.periode}</p>
                  <h3 className="font-syne font-bold text-white text-base mb-3">{p.titre}</h3>
                  <p className="text-[13px] font-dm text-[#8B9BB4] leading-relaxed">{p.description}</p>
                  {p.actif && (
                    <span className="inline-flex items-center gap-1 mt-3 text-[10px] font-dm font-semibold bg-[#F5A623]/10 text-[#F5A623] px-2.5 py-1 rounded-full">
                      En cours
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-[#0D1B2A] text-center">
          <h2 className="font-syne font-bold text-white text-2xl mb-6">
            Rejoignez les prochains entrepreneurs formés
          </h2>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-8 py-4 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] transition-all group">
            S&apos;inscrire maintenant
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
