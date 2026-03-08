import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FILIERES } from "@/lib/data";
import { formatFCFA } from "@/lib/utils";
import { ArrowRight, Banknote } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Filières — 5 formations entrepreneuriales",
  description: "Découvrez les 5 filières entrepreneuriales de SERMA HUB : Commerce, Agro-Business, Services Techniques, Digital Local et Entrepreneur Féminin.",
};

export default function FilieresPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0D1B2A] pt-28 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">
              Nos formations
            </p>
            <h1 className="font-syne font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              5 filières pour <span className="text-[#F5A623]">entreprendre</span>
            </h1>
            <p className="text-[#8B9BB4] font-dm text-[17px] max-w-xl mx-auto leading-relaxed">
              Chaque filière est conçue autour des réalités du marché local béninois. Tu sors avec un projet testé, des clients réels et tes premiers revenus.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-20 px-6 bg-[#0D1B2A]">
          <div className="max-w-6xl mx-auto space-y-6">
            {FILIERES.map((f) => (
              <div key={f.slug} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl overflow-hidden hover:border-[#F5A623]/30 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Left */}
                  <div className="bg-[#0D1B2A] p-8 flex flex-col justify-between border-r border-[#253548]">
                    <div>
                      <p className="text-[11px] font-dm font-semibold tracking-[0.15em] uppercase text-[#F5A623] mb-2">
                        Filière {f.id} · {f.duree}
                      </p>
                      <h2 className="font-syne font-bold text-white text-xl mb-3">{f.nom}</h2>
                      <p className="text-[#8B9BB4] font-dm text-[14px] leading-relaxed">{f.description}</p>
                    </div>
                    <div className="mt-8">
                      <div className="flex items-center gap-1.5 text-[11px] font-dm text-[#8B9BB4] mb-1">
                        <Banknote size={12} /> À partir de
                      </div>
                      <div className="font-syne font-bold text-[#F5A623] text-2xl">
                        {formatFCFA(f.mensualite)}<span className="text-sm font-dm text-[#8B9BB4]">/mois</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: details */}
                  <div className="p-8 lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-[11px] font-dm font-semibold text-[#F5A623] uppercase tracking-wider mb-3">Compétences clés</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {f.competences.map((c) => (
                            <span key={c} className="bg-[#253548] text-[#F8F9FA] text-[11px] font-dm px-3 py-1 rounded-full">
                              {c}
                            </span>
                          ))}
                        </div>
                        <div className="p-4 bg-[#F5A623]/5 border-l-2 border-[#F5A623] rounded-r-xl">
                          <p className="text-[11px] font-dm font-semibold text-[#F5A623] uppercase tracking-wider mb-1">Résultat attendu</p>
                          <p className="text-[13px] font-dm text-[#F8F9FA] leading-relaxed">{f.resultatAttendu}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[11px] font-dm font-semibold text-[#F5A623] uppercase tracking-wider mb-3">Tarifs</h3>
                        <div className="space-y-2 mb-6">
                          {[
                            { label: "Paiement intégral", amount: f.prixIntegral, badge: null },
                            { label: "Acompte 50%", amount: f.acompte50, badge: "Populaire" },
                            { label: "3 mensualités", amount: f.mensualite, badge: null },
                          ].map((t) => (
                            <div key={t.label} className="flex items-center justify-between p-3 border border-[#253548] rounded-xl">
                              <div className="flex items-center gap-2">
                                <span className="text-[13px] font-dm text-[#8B9BB4]">{t.label}</span>
                                {t.badge && (
                                  <span className="bg-[#F5A623] text-[#0D1B2A] text-[10px] font-syne font-bold px-2 py-0.5 rounded-full">
                                    {t.badge}
                                  </span>
                                )}
                              </div>
                              <span className="font-syne font-bold text-white text-sm">{formatFCFA(t.amount)}</span>
                            </div>
                          ))}
                        </div>
                        <Link
                          href={`/filieres/${f.slug}`}
                          className="w-full flex items-center justify-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-6 py-3.5 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] transition-all group"
                        >
                          Voir la filière en détail
                          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-[#1E2D3D] text-center">
          <h2 className="font-syne font-bold text-white text-3xl mb-4">
            Vous ne savez pas quelle filière choisir ?
          </h2>
          <p className="text-[#8B9BB4] font-dm mb-8 text-[16px]">
            Remplissez le formulaire de contact et nous vous orientons gratuitement.
          </p>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-8 py-4 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] transition-colors">
            Se faire orienter gratuitement
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
