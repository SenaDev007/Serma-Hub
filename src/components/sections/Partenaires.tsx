import Link from "next/link";
import { Building2, Heart, Banknote, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getPartenaires() {
  try {
    return await prisma.partenaire.findMany({ where: { actif: true }, orderBy: { id: "asc" } });
  } catch {
    return [];
  }
}

const TYPES = [
  { icon: Building2, titre: "Institutions Publiques", description: "ANPE, mairies, ministères — pour les conventions de placement et la certification officielle.", color: "#60A5FA" },
  { icon: Heart, titre: "ONG & Associations", description: "Organisations de terrain pour le référencement des bénéficiaires et le cofinancement des formations.", color: "#4ADE80" },
  { icon: Banknote, titre: "Acteurs Financiers", description: "Microfinances et banques pour faciliter l'accès au crédit aux entrepreneurs formés.", color: "#F5A623" },
];

export default async function Partenaires() {
  const partenaires = await getPartenaires();

  return (
    <section id="partenaires" className="py-24 px-6 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Collaborer</p>
          <h2 className="font-syne font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            Rejoignez l&apos;écosystème{" "}
            <span className="text-[#F5A623]">SERMA HUB</span>
          </h2>
          <p className="text-[16px] text-[#8B9BB4] font-dm max-w-xl mx-auto leading-relaxed">
            Nous collaborons avec des institutions, ONG et acteurs financiers pour démultiplier l&apos;impact entrepreneurial au Bénin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
          {TYPES.map((p) => (
            <div key={p.titre} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-8 hover:border-[#F5A623]/30 transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: p.color + "15" }}>
                <p.icon size={22} style={{ color: p.color }} />
              </div>
              <h4 className="font-syne font-bold text-white text-base mb-3">{p.titre}</h4>
              <p className="text-[14px] text-[#8B9BB4] font-dm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        {partenaires.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {partenaires.map((p) => (
              <div key={p.id} className="bg-[#1E2D3D] border border-[#253548] rounded-xl px-5 py-3 text-[13px] font-dm text-[#8B9BB4]">
                {p.nom}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/partenaires" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-8 py-4 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] transition-colors group">
            Dossier partenariat <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link href="/#contact" className="inline-flex items-center gap-2 border border-[#253548] text-[#F8F9FA] px-8 py-4 rounded-xl font-dm font-medium text-sm hover:bg-[#1E2D3D] transition-colors">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
