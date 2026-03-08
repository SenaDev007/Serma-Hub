import { TrendingUp, Users, Handshake, Target } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { prisma } from "@/lib/prisma";

async function getImpactStats() {
  try {
    const stats = await prisma.stat.findMany();
    const map = Object.fromEntries(stats.map((s) => [s.cle, s.valeur]));
    return map;
  } catch {
    return { apprenants_formes: "340", filieres_actives: "5", partenaires: "12", taux_insertion: "78" };
  }
}

export default async function Impact() {
  const stats = await getImpactStats();

  const KPIs = [
    { icon: Users, label: "Apprenants formés", value: parseInt(stats.apprenants_formes ?? "340"), suffix: "+", color: "#F5A623" },
    { icon: TrendingUp, label: "Filières actives", value: parseInt(stats.filieres_actives ?? "5"), suffix: "", color: "#4ADE80" },
    { icon: Handshake, label: "Partenaires", value: parseInt(stats.partenaires ?? "12"), suffix: "+", color: "#60A5FA" },
    { icon: Target, label: "Taux d'insertion", value: parseInt(stats.taux_insertion ?? "78"), suffix: "%", color: "#F472B6" },
  ];

  return (
    <section id="impact" className="py-24 px-6 bg-[#1E2D3D]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">
            Notre impact
          </p>
          <h2 className="font-syne font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            L&apos;impact que nous{" "}
            <span className="text-[#F5A623]">construisons</span>
          </h2>
          <p className="text-[#8B9BB4] font-dm text-[16px] max-w-lg mx-auto">
            Des chiffres réels, des vies transformées, une économie locale renforcée.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {KPIs.map((k) => (
            <div key={k.label} className="bg-[#0D1B2A] border border-[#253548] rounded-2xl p-8 text-center hover:border-[#F5A623]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: k.color + "15" }}>
                <k.icon size={22} style={{ color: k.color }} />
              </div>
              <div className="font-syne font-bold leading-none mb-2" style={{ fontSize: "48px", color: k.color }}>
                <AnimatedCounter target={k.value} suffix={k.suffix} />
              </div>
              <div className="text-[14px] text-[#8B9BB4] font-dm leading-snug">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Expansion phases */}
        <div className="mt-16">
          <h3 className="font-syne font-bold text-white text-xl text-center mb-8">
            3 phases d&apos;expansion continentale
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { phase: "Phase 1", titre: "Parakou & Nord-Bénin", periode: "2024–2026", description: "Consolider SERMA HUB comme le centre de référence pour la formation entrepreneuriale appliquée dans le nord du Bénin.", actif: true },
              { phase: "Phase 2", titre: "Cotonou & Côte d'Ivoire", periode: "2026–2028", description: "Étendre le modèle vers les grandes métropoles : Cotonou, Abidjan. Développer des partenariats institutionnels régionaux.", actif: false },
              { phase: "Phase 3", titre: "Expansion Continentale", periode: "2028–2030", description: "Déployer SERMA HUB comme réseau panafricain de centres de formation entrepreneuriale appliquée.", actif: false },
            ].map((ph) => (
              <div
                key={ph.phase}
                className={`rounded-2xl p-7 border transition-all ${
                  ph.actif
                    ? "border-[#F5A623]/50 bg-[#F5A623]/5"
                    : "border-[#253548] bg-[#0D1B2A]"
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[11px] font-dm font-semibold tracking-widest uppercase ${ph.actif ? "text-[#F5A623]" : "text-[#8B9BB4]"}`}>
                    {ph.phase}
                  </span>
                  {ph.actif && (
                    <span className="bg-[#F5A623] text-[#0D1B2A] text-[10px] px-2 py-0.5 rounded-full font-dm font-bold">
                      EN COURS
                    </span>
                  )}
                </div>
                <h4 className="font-syne font-bold text-white text-lg mb-1">{ph.titre}</h4>
                <div className="text-[12px] font-dm text-[#8B9BB4] mb-3">{ph.periode}</div>
                <p className="text-[13px] text-[#8B9BB4] font-dm leading-relaxed">{ph.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
