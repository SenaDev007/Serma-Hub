import { FileText, GraduationCap, Star, Users, Heart, Handshake, Sparkles } from "lucide-react";

const SECTIONS = [
  { id: "hero",        titre: "Section Hero",    desc: "Titre, sous-titre et statistiques d'accueil",        icon: Sparkles },
  { id: "filieres",   titre: "Filières",         desc: "Contenu des 5 filières (modules, prix)",             icon: GraduationCap },
  { id: "temoignages",titre: "Témoignages",       desc: "Avis et témoignages des apprenants",                 icon: Star },
  { id: "equipe",     titre: "Équipe",            desc: "Formateurs et équipe pédagogique",                   icon: Users },
  { id: "valeurs",    titre: "Valeurs & Mission", desc: "Valeurs fondatrices et mission SERMA HUB",           icon: Heart },
  { id: "partenaires",titre: "Partenaires",       desc: "Types de partenariat et contacts",                   icon: Handshake },
];

export default function ContenuPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-syne font-bold text-white text-2xl">Contenu du site</h1>
        <p className="text-[#8B9BB4] font-dm text-sm mt-1">Gérez les sections affichées sur le site public</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((s) => (
          <div key={s.id} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-5 flex items-start gap-4 hover:border-[#F5A623]/30 transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5A623]/20 transition-colors">
              <s.icon size={18} className="text-[#F5A623]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-syne font-bold text-white text-sm mb-1">{s.titre}</div>
              <div className="text-[12px] font-dm text-[#8B9BB4] leading-relaxed">{s.desc}</div>
            </div>
            <FileText size={14} className="text-[#8B9BB4] group-hover:text-[#F5A623] transition-colors flex-shrink-0 mt-0.5" />
          </div>
        ))}
      </div>

      <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <FileText size={16} className="text-[#F5A623]" />
          <h2 className="font-syne font-bold text-white text-sm">Gestion du contenu</h2>
        </div>
        <p className="text-[#8B9BB4] font-dm text-sm leading-relaxed">
          Le contenu dynamique (filières, partenaires, statistiques, équipe) est géré directement depuis la base de données.
          Utilisez les sections <strong className="text-white">Filières</strong>, <strong className="text-white">Équipe</strong> et <strong className="text-white">Partenaires</strong> dans le menu de navigation pour modifier ces données.
        </p>
      </div>
    </div>
  );
}
