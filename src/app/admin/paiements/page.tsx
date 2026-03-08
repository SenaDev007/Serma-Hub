import { Banknote, TrendingUp, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";

type PaiementRow = { id: number; montant: number; datePaiement: Date; methode: string; statut: string; apprenantId: number; apprenant: { prenom: string; nom: string; filiere: { nom: string } } };

async function getPaiements(): Promise<PaiementRow[]> {
  try {
    return await prisma.paiement.findMany({
      orderBy: { datePaiement: "desc" },
      include: { apprenant: { select: { prenom: true, nom: true, filiere: { select: { nom: true } } } } },
    });
  } catch { return []; }
}

const STATUT_STYLE: Record<string, string> = {
  paye:       "bg-green-500/10 text-green-400",
  en_attente: "bg-[#F5A623]/10 text-[#F5A623]",
  en_retard:  "bg-red-500/10 text-red-400",
};
const STATUT_LABEL: Record<string, string> = {
  paye: "Payé", en_attente: "En attente", en_retard: "En retard",
};

export default async function PaiementsPage() {
  const paiements = await getPaiements();
  const totalEncaisse = paiements.filter(p => p.statut === "paye").reduce((s, p) => s + p.montant, 0);
  const enAttente = paiements.filter(p => p.statut !== "paye").reduce((s, p) => s + p.montant, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-syne font-bold text-white text-2xl">Paiements</h1>
        <p className="text-[#8B9BB4] font-dm text-sm mt-1">Suivi des règlements et mensualités</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Banknote,    label: "Total encaissé",      value: totalEncaisse.toLocaleString("fr-FR") + " FCFA", color: "#4ADE80" },
          { icon: Clock,       label: "En attente / retard", value: enAttente.toLocaleString("fr-FR") + " FCFA",    color: "#F5A623" },
          { icon: TrendingUp,  label: "Nb transactions",     value: String(paiements.length),                      color: "#60A5FA" },
        ].map((s) => (
          <div key={s.label} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.color + "15" }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <div>
              <div className="font-syne font-bold text-white text-lg">{s.value}</div>
              <div className="text-[12px] font-dm text-[#8B9BB4]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#253548]">
          <h2 className="font-syne font-bold text-white text-sm">Historique des paiements</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#253548]">
                {["Apprenant", "Filière", "Montant", "Type", "Date", "Statut"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-dm font-semibold text-[#8B9BB4] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#253548]">
              {paiements.map((p) => (
                <tr key={p.id} className="hover:bg-[#253548]/30 transition-colors">
                  <td className="px-5 py-3.5 text-[13px] font-dm text-white">
                    {p.apprenant.prenom} {p.apprenant.nom}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-dm text-[#8B9BB4]">{p.apprenant.filiere.nom}</td>
                  <td className="px-5 py-3.5 font-syne font-bold text-[13px] text-[#F5A623]">
                    {p.montant.toLocaleString("fr-FR")} FCFA
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-dm text-[#8B9BB4]">{p.typePaiement}</td>
                  <td className="px-5 py-3.5 text-[13px] font-dm text-[#8B9BB4]">
                    {new Date(p.datePaiement).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-dm font-semibold px-2.5 py-1 rounded-full ${STATUT_STYLE[p.statut] ?? "bg-[#253548] text-[#8B9BB4]"}`}>
                      {STATUT_LABEL[p.statut] ?? p.statut}
                    </span>
                  </td>
                </tr>
              ))}
              {paiements.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-[#8B9BB4] font-dm text-sm">Aucun paiement enregistré.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
