import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { EQUIPE } from "@/lib/data";
import { Zap, Target, Handshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos de SERMA HUB",
  description: "Découvrez l'histoire, la mission et l'équipe de SERMA HUB – Impact Academy, centre de formation entrepreneuriale à Parakou, Bénin.",
};

const DIFFERENCES = [
  { icon: Zap,       titre: "Pédagogie appliquée",         desc: "Chaque module est ancré dans la réalité du marché local béninois. Pas de théorie sans pratique." },
  { icon: Target,    titre: "Résultats mesurables",         desc: "À chaque étape, des objectifs concrets : clients, ventes, revenus, projet validé." },
  { icon: Handshake, titre: "Accompagnement post-formation",desc: "3 mois d'incubation après la certification pour consolider et développer ton activité." },
];

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0D1B2A] pt-28 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Notre histoire</p>
            <h1 className="font-syne font-bold text-white leading-tight mb-6" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              À propos de <span className="text-[#F5A623]">SERMA HUB</span>
            </h1>
            <p className="text-[#8B9BB4] font-dm text-[17px] leading-relaxed max-w-2xl mx-auto">
              SERMA HUB est née d&apos;un constat simple : trop de jeunes et de femmes au Bénin ont
              des idées mais manquent des compétences pratiques pour les transformer en entreprises viables.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-6 bg-[#0D1B2A]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Notre mission</p>
              <h2 className="font-syne font-bold text-white text-3xl mb-5">
                Former pour <span className="text-[#F5A623]">libérer</span>
              </h2>
              <p className="text-[16px] font-dm text-[#8B9BB4] leading-relaxed mb-4">
                SERMA HUB est un centre de formation professionnelle entrepreneuriale appliquée basé à
                Parakou, Bénin. Notre mission : former les jeunes et les femmes à créer des activités
                génératrices de revenus durables.
              </p>
              <p className="text-[16px] font-dm text-[#8B9BB4] leading-relaxed mb-8">
                Nous ne dispensons pas des cours théoriques. Nous accompagnons chaque apprenant dans
                la construction d&apos;un projet réel, testé sur le marché local, avec de vrais clients.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: "5",   label: "Filières" },
                  { num: "4–5", label: "Mois" },
                  { num: "25",  label: "Max / promo" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 bg-[#1E2D3D] border border-[#253548] rounded-xl">
                    <div className="font-syne font-bold text-[#F5A623] text-2xl">{s.num}</div>
                    <div className="text-[12px] font-dm text-[#8B9BB4]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-10">
              <h3 className="text-[11px] font-dm font-semibold text-[#F5A623] uppercase tracking-widest mb-5">Notre vision</h3>
              <p className="text-[#F8F9FA] font-dm text-[16px] leading-relaxed mb-6">
                Devenir le premier réseau d&apos;incubateurs entrepreneuriaux du nord-Bénin, formant
                <strong className="text-[#F5A623]"> 500 entrepreneurs actifs d&apos;ici 2027</strong> et
                contribuant directement à la réduction du chômage des jeunes à Parakou.
              </p>
              <div className="text-[11px] font-dm font-semibold tracking-[0.2em] text-[#8B9BB4] uppercase text-center">
                ENTREPRENDRE <span className="text-[#F5A623] mx-2">•</span>
                INNOVER <span className="text-[#F5A623] mx-2">•</span>
                IMPACTER
              </div>
            </div>
          </div>
        </section>

        {/* Differences */}
        <section className="py-16 px-6 bg-[#1E2D3D]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-syne font-bold text-white text-2xl text-center mb-10">Ce qui nous différencie</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DIFFERENCES.map((v) => (
                <div key={v.titre} className="bg-[#0D1B2A] border border-[#253548] rounded-2xl p-8 hover:border-[#F5A623]/30 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-[#F5A623]/10 flex items-center justify-center mb-5">
                    <v.icon size={20} className="text-[#F5A623]" />
                  </div>
                  <h4 className="font-syne font-bold text-white text-base mb-2">{v.titre}</h4>
                  <p className="text-[14px] font-dm text-[#8B9BB4] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-6 bg-[#0D1B2A]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Les visages</p>
              <h2 className="font-syne font-bold text-white text-3xl">Notre équipe</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EQUIPE.map((m) => (
                <div key={m.prenom} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-8 text-center hover:border-[#F5A623]/30 transition-all">
                  <div className="w-16 h-16 rounded-full bg-[#F5A623] flex items-center justify-center font-syne font-bold text-[#0D1B2A] text-2xl mx-auto mb-4">
                    {m.initiales}
                  </div>
                  <h4 className="font-syne font-bold text-white text-base mb-1">{m.prenom} {m.nom}</h4>
                  <p className="text-[11px] font-dm font-semibold text-[#F5A623] uppercase tracking-wider mb-3">{m.role}</p>
                  <p className="text-[13px] font-dm text-[#8B9BB4] leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-[#1E2D3D] text-center">
          <h2 className="font-syne font-bold text-white text-2xl mb-6">Rejoignez l&apos;aventure SERMA HUB</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-8 py-4 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] transition-colors group">
              S&apos;inscrire <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/partenaires" className="inline-flex items-center gap-2 border-2 border-[#253548] text-[#F8F9FA] px-8 py-4 rounded-xl font-dm font-semibold text-sm hover:border-[#F5A623]/50 transition-colors">
              Devenir partenaire
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
