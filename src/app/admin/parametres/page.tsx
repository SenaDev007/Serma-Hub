import { Settings, Building2, Clock, Calendar } from "lucide-react";

const SECTIONS = [
  {
    icon: Building2,
    title: "Informations générales",
    fields: [
      { label: "Nom du centre",         value: "SERMA HUB – Impact Academy" },
      { label: "Ville",                 value: "Parakou, Bénin" },
      { label: "Adresse",               value: "Quartier Albarika, Rue des Entrepreneurs" },
      { label: "Téléphone / WhatsApp",  value: "+229 97 00 00 00" },
      { label: "Email contact",         value: "contact@sermahub.bj" },
      { label: "Site web",              value: "sermahub.bj" },
    ],
  },
  {
    icon: Clock,
    title: "Horaires d'ouverture",
    fields: [
      { label: "Lundi – Vendredi", value: "08h00 – 18h00" },
      { label: "Samedi",           value: "08h00 – 13h00" },
      { label: "Dimanche",         value: "Fermé" },
    ],
  },
  {
    icon: Calendar,
    title: "Prochaine promotion",
    fields: [
      { label: "Date de démarrage",            value: "01 Avril 2026" },
      { label: "Date limite d'inscription",    value: "25 Mars 2026" },
      { label: "Places disponibles / filière", value: "25" },
    ],
  },
];

export default function ParametresPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center">
          <Settings size={20} className="text-[#F5A623]" />
        </div>
        <div>
          <h1 className="font-syne font-bold text-white text-2xl">Paramètres</h1>
          <p className="text-[#8B9BB4] font-dm text-sm">Configuration générale de SERMA HUB</p>
        </div>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#253548] pb-4">
            <section.icon size={16} className="text-[#F5A623]" />
            <h2 className="font-syne font-bold text-white text-sm">{section.title}</h2>
          </div>
          {section.fields.map((f) => (
            <div key={f.label}>
              <label className="block text-[11px] font-dm font-semibold text-[#8B9BB4] uppercase tracking-wider mb-1.5">
                {f.label}
              </label>
              <input
                type="text"
                defaultValue={f.value}
                className="w-full bg-[#0D1B2A] border border-[#253548] rounded-xl px-4 py-2.5 text-[13px] font-dm text-white focus:outline-none focus:border-[#F5A623] transition-colors"
              />
            </div>
          ))}
        </div>
      ))}

      <button className="w-full bg-[#F5A623] text-[#0D1B2A] py-3 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] hover:-translate-y-0.5 transition-all duration-200">
        Sauvegarder les paramètres
      </button>
    </div>
  );
}
