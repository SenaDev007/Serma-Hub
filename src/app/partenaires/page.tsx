import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PARTENAIRES_TYPES } from "@/lib/data";
import { BarChart3, GraduationCap, Handshake, Megaphone, Briefcase, Globe, ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Partenaires — SERMA HUB",
  description: "Devenez partenaire de SERMA HUB et contribuez à la formation entrepreneuriale de la jeunesse béninoise.",
};

const OFFRES = [
  { icon: BarChart3,    titre: "Rapports d'impact",        desc: "Rapports trimestriels détaillés sur les entrepreneurs formés et les entreprises créées." },
  { icon: GraduationCap,titre: "Visibilité pédagogique",   desc: "Vos logos et témoignages intégrés dans les supports de formation et sur le site web." },
  { icon: Handshake,    titre: "Networking",                desc: "Accès aux promotions d'entrepreneurs et aux événements SERMA HUB (démos, lancements)." },
  { icon: Megaphone,    titre: "Communication partagée",   desc: "Co-communication sur les réseaux sociaux, communiqués de presse et médias locaux." },
  { icon: Briefcase,    titre: "Recrutement prioritaire",  desc: "Accès prioritaire à nos meilleurs apprenants certifiés pour recrutement ou sous-traitance." },
  { icon: Globe,        titre: "Impact mesurable",          desc: "Contribution directe et documentée à l'ODD 8 (travail décent et croissance économique)." },
];

export default function PartenairesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0D1B2A] pt-28 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Collaborer ensemble</p>
            <h1 className="font-syne font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(32px,5vw,54px)" }}>
              Devenez <span className="text-[#F5A623]">partenaire</span>
            </h1>
            <p className="text-[#8B9BB4] font-dm text-[17px] leading-relaxed max-w-2xl mx-auto">
              SERMA HUB collabore avec des institutions, ONG, entreprises et acteurs financiers pour démultiplier l&apos;impact entrepreneurial au Bénin et en Afrique de l&apos;Ouest.
            </p>
          </div>
        </section>

        {/* Types */}
        <section className="py-20 px-6 bg-[#0D1B2A]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-syne font-bold text-white text-3xl">Types de partenariat</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {PARTENAIRES_TYPES.map((p) => (
                <div key={p.titre} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-10 text-center hover:border-[#F5A623]/40 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#F5A623]/20 transition-colors">
                    <Handshake size={26} className="text-[#F5A623]" />
                  </div>
                  <h3 className="font-syne font-bold text-white text-lg mb-3">{p.titre}</h3>
                  <p className="text-[14px] font-dm text-[#8B9BB4] leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>

            {/* What we offer */}
            <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-10">
              <h2 className="font-syne font-bold text-white text-2xl mb-8 text-center">Ce que nous offrons à nos partenaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OFFRES.map((item) => (
                  <div key={item.titre} className="flex gap-4 p-4 bg-[#0D1B2A] border border-[#253548] rounded-xl hover:border-[#F5A623]/30 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-[#F5A623]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-[#F5A623]" />
                    </div>
                    <div>
                      <h4 className="font-syne font-bold text-white text-sm mb-1">{item.titre}</h4>
                      <p className="text-[13px] font-dm text-[#8B9BB4] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-[#1E2D3D] text-center">
          <h2 className="font-syne font-bold text-white text-3xl mb-4">
            Prêt à construire l&apos;avenir ensemble ?
          </h2>
          <p className="text-[#8B9BB4] font-dm text-[16px] mb-8 max-w-xl mx-auto">
            Contactez-nous pour recevoir le dossier de partenariat complet et discuter d&apos;une collaboration sur mesure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-8 py-4 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] transition-colors group">
              Demander le dossier partenariat
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href="mailto:partenariats@sermahub.bj" className="inline-flex items-center gap-2 border-2 border-[#253548] text-[#F8F9FA] px-8 py-4 rounded-xl font-dm font-semibold text-sm hover:border-[#F5A623]/50 transition-colors">
              <Mail size={15} /> partenariats@sermahub.bj
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
