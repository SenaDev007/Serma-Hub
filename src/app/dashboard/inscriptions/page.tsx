import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatFCFA } from "@/lib/utils";

export default async function InscriptionsPage() {
  const inscriptions = await prisma.inscription.findMany({
    orderBy: { dateInscription: "desc" },
    include: { apprenant: { include: { user: true } }, filiere: true },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-serma-navy mb-8">
        Inscriptions
      </h1>
      <div className="bg-white rounded-xl shadow border border-serma-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-serma-navy/10 bg-serma-light/50">
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Apprenant</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Filière</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Date</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Montant</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Payé</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Statut</th>
              </tr>
            </thead>
            <tbody>
              {inscriptions.map((ins) => (
                <tr key={ins.id} className="border-b border-serma-navy/5 hover:bg-serma-light/30">
                  <td className="p-4">
                    {ins.apprenant.user.prenom} {ins.apprenant.user.nom}
                  </td>
                  <td className="p-4">{ins.filiere.nom}</td>
                  <td className="p-4 text-serma-blue/80 text-sm">
                    {ins.dateInscription.toLocaleDateString("fr-FR")}
                  </td>
                  <td className="p-4">{formatFCFA(ins.montantTotal)}</td>
                  <td className="p-4">{formatFCFA(ins.montantPaye)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        ins.statut === "CONFIRMEE"
                          ? "bg-green-100 text-green-800"
                          : ins.statut === "EN_ATTENTE"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-serma-light text-serma-blue/80"
                      }`}
                    >
                      {ins.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
