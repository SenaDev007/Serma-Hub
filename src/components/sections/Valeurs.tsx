import { Zap, Shield, Users, Leaf, Globe } from "lucide-react";

const VALEURS = [
  { icon: Zap, titre: "Action", description: "Apprendre en faisant. Chaque module débouche sur une réalisation concrète.", color: "#F5A623" },
  { icon: Shield, titre: "Rigueur", description: "Des méthodes éprouvées, une pédagogie structurée et des formateurs certifiés.", color: "#60A5FA" },
  { icon: Users, titre: "Communauté", description: "Un réseau d'entrepreneurs qui se soutiennent, partagent et grandissent ensemble.", color: "#4ADE80" },
  { icon: Leaf, titre: "Durabilité", description: "Former pour créer des entreprises viables sur le long terme, pas juste un auto-emploi.", color: "#34D399" },
  { icon: Globe, titre: "Impact", description: "Chaque entrepreneur formé transforme son entourage et renforce l'économie locale.", color: "#F472B6" },
];

export default function Valeurs() {
  return (
    <section id="valeurs" className="py-24 px-6 bg-[#1E2D3D]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">
            Ce qui nous guide
          </p>
          <h2 className="font-syne font-bold text-white leading-tight" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            Nos <span className="text-[#F5A623]">valeurs</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {VALEURS.map((v) => (
            <div key={v.titre} className="bg-[#0D1B2A] border border-[#253548] rounded-2xl p-7 text-center hover:border-[#F5A623]/30 transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: v.color + "15" }}>
                <v.icon size={22} style={{ color: v.color }} />
              </div>
              <h4 className="font-syne font-bold text-white text-sm mb-2">{v.titre}</h4>
              <p className="text-[12px] text-[#8B9BB4] font-dm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
