import { X, Check, Briefcase, Users, Banknote, Leaf } from "lucide-react";

const CLASSIC = [
  { text: "Cours théoriques uniquement" },
  { text: "Aucun contact avec le marché réel" },
  { text: "Certificat sans valeur pratique" },
  { text: "Tu cherches un emploi après la formation" },
  { text: "Des mois avant de voir des résultats" },
];

const SERMA = [
  { text: "Projet réel dès le 1er mois de formation" },
  { text: "Vrais clients, vraies ventes sur le terrain" },
  { text: "Premiers revenus avant la fin de la formation" },
  { text: "Tu crées ton propre emploi et emplois d'autres" },
  { text: "Résultats mesurables à chaque étape" },
];

const PROMESSES = [
  { icon: Briefcase, titre: "Projet testé", desc: "Tu pars avec un projet validé sur le marché local" },
  { icon: Users, titre: "Clients réels", desc: "Tes premiers clients arrivent pendant la formation" },
  { icon: Banknote, titre: "Premiers revenus", desc: "Tu encaisses avant même d'avoir ton certificat" },
  { icon: Leaf, titre: "Accompagnement", desc: "3 mois d'incubation post-formation inclus" },
];

export default function Difference() {
  return (
    <section id="difference" className="py-24 px-6 bg-[#0D1B2A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Notre approche</p>
          <h2 className="font-syne font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            Pas un cours.{" "}
            <span className="text-[#F5A623]">Une entreprise.</span>
          </h2>
          <p className="text-[16px] text-[#8B9BB4] font-dm max-w-xl mx-auto leading-relaxed">
            SERMA HUB n&apos;est pas une école classique. C&apos;est un incubateur entrepreneurial à pédagogie appliquée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-8 opacity-60">
            <span className="inline-block bg-[#253548] text-[#8B9BB4] text-[10px] font-dm font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              Centre classique
            </span>
            <ul className="space-y-3">
              {CLASSIC.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-[14px] text-[#8B9BB4] font-dm">
                  <X size={16} className="text-red-400 flex-shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1E2D3D] border border-[#F5A623]/30 rounded-2xl p-8">
            <span className="inline-block bg-[#F5A623] text-[#0D1B2A] text-[10px] font-syne font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              SERMA HUB
            </span>
            <ul className="space-y-3">
              {SERMA.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-[14px] text-white font-dm">
                  <Check size={16} className="text-[#F5A623] flex-shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-10">
          <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-2 text-center">La promesse SERMA</p>
          <h3 className="font-syne font-bold text-white text-2xl text-center mb-8">Tu sors avec 4 acquis non négociables</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROMESSES.map((p) => (
              <div key={p.titre} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 flex items-center justify-center mx-auto mb-4">
                  <p.icon size={22} className="text-[#F5A623]" />
                </div>
                <div className="font-syne font-bold text-white text-sm mb-1">{p.titre}</div>
                <div className="text-[12px] text-[#8B9BB4] font-dm leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
