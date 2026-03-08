import { ClipboardList, UserCheck, Clock, UserX } from "lucide-react";
import { prisma } from "@/lib/prisma";

type ApprenantRow = { id: number; nom: string; prenom: string; telephone: string; ville: string | null; statut: string; dateInscription: Date; filiereId: number; filiere: { nom: string }; createdAt: Date };

async function getInscriptions(): Promise<ApprenantRow[]> {
  try {
    return await prisma.apprenant.findMany({
      orderBy: { createdAt: "desc" },
      include: { filiere: { select: { nom: true } } },
    });
  } catch { return []; }
}

const STATUT_STYLE: Record<string, string> = {
  confirme:   "bg-green-500/10 text-green-400",
  en_attente: "bg-[#F5A623]/10 text-[#F5A623]",
  abandonne:  "bg-red-500/10 text-red-400",
  certifie:   "bg-blue-500/10 text-blue-400",
};
const STATUT_LABEL: Record<string, string> = {
  confirme: "Confirmé", en_attente: "En attente", abandonne: "Abandonné", certifie: "Certifié",
};

export default async function InscriptionsPage() {
  const inscriptions = await getInscriptions();
  const confirmes  = inscriptions.filter(i => i.statut === "confirme").length;
  const attente    = inscriptions.filter(i => i.statut === "en_attente").length;
  const abandonnes = inscriptions.filter(i => i.statut === "abandonne").length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-syne font-bold text-white text-2xl">Inscriptions</h1>
        <p className="text-[#8B9BB4] font-dm text-sm mt-1">{inscriptions.length} demandes au total</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { icon: ClipboardList, label: "Total",      value: inscriptions.length, color: "#F5A623" },
          { icon: UserCheck,     label: "Confirmés",  value: confirmes,           color: "#4ADE80" },
          { icon: Clock,         label: "En attente", value: attente,             color: "#60A5FA" },
          { icon: UserX,         label: "Abandonnés", value: abandonnes,          color: "#F472B6" },
        ].map((s) => (
          <div key={s.label} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.color + "15" }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <div>
              <div className="font-syne font-bold text-white text-xl">{s.value}</div>
              <div className="text-[12px] font-dm text-[#8B9BB4]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#253548]">
          <h2 className="font-syne font-bold text-white text-sm">Toutes les inscriptions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#253548]">
                {["Apprenant", "Téléphone", "Filière", "Ville", "Date", "Statut"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-dm font-semibold text-[#8B9BB4] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#253548]">
              {inscriptions.map((ins) => (
                <tr key={ins.id} className="hover:bg-[#253548]/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623] text-xs font-syne font-bold flex-shrink-0">
                        {ins.prenom.charAt(0)}
                      </div>
                      <span className="text-[13px] font-dm text-white">{ins.prenom} {ins.nom}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-dm text-[#8B9BB4]">{ins.telephone}</td>
                  <td className="px-5 py-3.5 text-[13px] font-dm text-[#8B9BB4]">{ins.filiere.nom}</td>
                  <td className="px-5 py-3.5 text-[13px] font-dm text-[#8B9BB4]">{ins.ville ?? "—"}</td>
                  <td className="px-5 py-3.5 text-[13px] font-dm text-[#8B9BB4]">
                    {new Date(ins.dateInscription).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-dm font-semibold px-2.5 py-1 rounded-full ${STATUT_STYLE[ins.statut] ?? "bg-[#253548] text-[#8B9BB4]"}`}>
                      {STATUT_LABEL[ins.statut] ?? ins.statut}
                    </span>
                  </td>
                </tr>
              ))}
              {inscriptions.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-[#8B9BB4] font-dm text-sm">Aucune inscription.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

