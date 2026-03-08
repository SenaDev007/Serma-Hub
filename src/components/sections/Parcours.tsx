import { Compass, Users, Lightbulb, Rocket, Award, ChevronRight } from "lucide-react";

const ETAPES = [
  { num: "01", icon: Compass, titre: "Orientation", description: "Bilan de compétences et choix de filière selon ton profil et tes ressources." },
  { num: "02", icon: Users, titre: "Formation", description: "3 à 6 mois de modules pratiques animés par des formateurs terrain." },
  { num: "03", icon: Lightbulb, titre: "Projet", description: "Développement de ton plan d'affaires avec accompagnement personnalisé." },
  { num: "04", icon: Rocket, titre: "Lancement", description: "Test de marché, premiers clients et démarrage opérationnel de ton activité." },
  { num: "05", icon: Award, titre: "Certification", description: "Remise du certificat SERMA HUB et intégration du réseau d'alumni." },
];

export default function Parcours() {
  return (
    <section id="parcours" className="py-24 px-6 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">
            Le chemin
          </p>
          <h2 className="font-syne font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            Ton parcours en{" "}
            <span className="text-[#F5A623]">5 étapes</span>
          </h2>
          <p className="text-[16px] text-[#8B9BB4] font-dm max-w-lg mx-auto leading-relaxed">
            De l&apos;orientation au lancement : un parcours structuré pour construire ta réussite.
          </p>
        </div>

        <div className="relative">
          {/* Connector */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-px bg-gradient-to-r from-[#F5A623]/20 via-[#F5A623]/60 to-[#F5A623]/20" />

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
            {ETAPES.map((step, i) => (
              <div key={step.num} className="flex-1 flex flex-col items-center text-center px-4 group">
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#1E2D3D] border-2 border-[#253548] flex items-center justify-center mb-5 group-hover:border-[#F5A623] group-hover:bg-[#F5A623]/10 transition-all duration-200">
                  <step.icon size={22} className="text-[#8B9BB4] group-hover:text-[#F5A623] transition-colors" />
                </div>
                <div className="text-[10px] font-dm text-[#F5A623] tracking-widest mb-1">{step.num}</div>
                <h4 className="font-syne font-bold text-white text-[15px] mb-2">{step.titre}</h4>
                <p className="text-[13px] text-[#8B9BB4] font-dm leading-relaxed">{step.description}</p>
                {i < ETAPES.length - 1 && (
                  <ChevronRight size={16} className="lg:hidden mt-4 text-[#F5A623]" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <div className="inline-flex items-center gap-3 bg-[#1E2D3D] border border-[#253548] rounded-full px-6 py-3">
            <span className="text-[#F5A623] font-syne font-bold text-xl">3–6</span>
            <span className="text-[#8B9BB4] font-dm text-sm">mois de formation intensive et pratique</span>
          </div>
        </div>
      </div>
    </section>
  );
}
