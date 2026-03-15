import { prisma } from "@/lib/prisma";
import { formatFCFA } from "@/lib/utils";

export default async function PaiementsPage() {
  const paiements = await prisma.paiement.findMany({
    orderBy: { createdAt: "desc" },
    include: { apprenant: { include: { user: true } }, inscription: { include: { filiere: true } } },
    take: 100,
  });

  return (
    <div>
<h1 className="font-display font-bold text-xl sm:text-2xl text-serma-navy mb-6 sm:mb-8">
        Paiements
      </h1>
      <div className="bg-white rounded-xl shadow border border-serma-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem]">
            <thead>
              <tr className="border-b border-serma-navy/10 bg-serma-light/50">
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Référence</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Apprenant</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Filière</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Montant</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Statut</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Date</th>
              </tr>
            </thead>
            <tbody>
              {paiements.map((p) => (
                <tr key={p.id} className="border-b border-serma-navy/5 hover:bg-serma-light/30">
                  <td className="p-4 font-mono text-sm">{p.reference}</td>
                  <td className="p-4">
                    {p.apprenant.user.prenom} {p.apprenant.user.nom}
                  </td>
                  <td className="p-4">{p.inscription.filiere.nom}</td>
                  <td className="p-4">{formatFCFA(p.montant)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        p.statut === "COMPLETE"
                          ? "bg-green-100 text-green-800"
                          : p.statut === "EN_ATTENTE" || p.statut === "INITIE"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.statut}
                    </span>
                  </td>
                  <td className="p-4 text-serma-blue/80 text-sm">
                    {p.createdAt.toLocaleDateString("fr-FR")}
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
