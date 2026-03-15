import { prisma } from "@/lib/prisma";

export default async function CandidaturesPage() {
  const candidatures = await prisma.candidatureFormateur.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="font-display font-bold text-xl sm:text-2xl text-serma-navy mb-6 sm:mb-8">Candidatures Formateurs</h1>
      <div className="bg-white rounded-xl shadow border border-serma-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem]">
            <thead>
              <tr className="border-b border-serma-navy/10 bg-serma-light/50">
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Nom</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Email</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Filières cibles</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Statut</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Date</th>
              </tr>
            </thead>
            <tbody>
              {candidatures.map((c) => (
                <tr key={c.id} className="border-b border-serma-navy/5">
                  <td className="p-4 font-medium">{c.prenom} {c.nom}</td>
                  <td className="p-4 text-serma-blue/80">{c.email}</td>
                  <td className="p-4 text-sm">{c.filieresCibles.join(", ")}</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 rounded text-xs bg-serma-light text-serma-blue/80">
                      {c.statut}
                    </span>
                  </td>
                  <td className="p-4 text-serma-blue/80 text-sm">
                    {c.createdAt.toLocaleDateString("fr-FR")}
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
