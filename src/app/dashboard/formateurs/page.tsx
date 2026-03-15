import { prisma } from "@/lib/prisma";

export default async function FormateursPage() {
  const formateurs = await prisma.formateurProfil.findMany({
    include: { user: true },
  });

  return (
    <div>
      <h1 className="font-display font-bold text-xl sm:text-2xl text-serma-navy mb-6 sm:mb-8">Formateurs</h1>
      <div className="bg-white rounded-xl shadow border border-serma-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem]">
            <thead>
              <tr className="border-b border-serma-navy/10 bg-serma-light/50">
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Nom</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Spécialité</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Statut</th>
              </tr>
            </thead>
            <tbody>
              {formateurs.map((f) => (
                <tr key={f.id} className="border-b border-serma-navy/5">
                  <td className="p-4 font-medium">{f.user.prenom} {f.user.nom}</td>
                  <td className="p-4">{f.specialite}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${f.actif ? "bg-green-100 text-green-800" : "bg-serma-light text-serma-blue/80"}`}>
                      {f.actif ? "Actif" : "Inactif"}
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
