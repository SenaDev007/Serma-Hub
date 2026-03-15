import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ApprenantsPage() {
  const apprenants = await prisma.apprenantProfil.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="font-display font-bold text-xl sm:text-2xl text-serma-navy mb-6 sm:mb-8">
        Apprenants
      </h1>
      <div className="bg-white rounded-xl shadow border border-serma-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem]">
            <thead>
              <tr className="border-b border-serma-navy/10 bg-serma-light/50">
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Nom</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Email</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Téléphone</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Statut</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apprenants.map((a) => (
                <tr key={a.id} className="border-b border-serma-navy/5 hover:bg-serma-light/30">
                  <td className="p-4 font-medium">
                    {a.user.prenom} {a.user.nom}
                  </td>
                  <td className="p-4 text-serma-blue/80">{a.user.email}</td>
                  <td className="p-4">{a.user.telephone ?? "—"}</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-serma-light text-serma-blue/80">
                      {a.statut}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/dashboard/apprenants/${a.id}`}
                      className="text-serma-orange font-medium text-sm hover:underline"
                    >
                      Voir
                    </Link>
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
