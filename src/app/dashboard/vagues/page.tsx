import { prisma } from "@/lib/prisma";

export default async function VaguesPage() {
  const vagues = await prisma.vague.findMany({
    orderBy: { dateDebut: "desc" },
    include: { filiere: true },
  });

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-serma-navy mb-8">Vagues & Promotions</h1>
      <div className="grid gap-4">
        {vagues.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-xl p-6 shadow border border-serma-navy/5 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <p className="font-display font-bold text-serma-navy">{v.nom}</p>
              <p className="text-sm text-serma-blue/80">{v.filiere.nom} • {v.code}</p>
              <p className="text-sm text-serma-blue/70">
                {v.dateDebut.toLocaleDateString("fr-FR")} → {v.dateFin.toLocaleDateString("fr-FR")}
              </p>
            </div>
            <span className="inline-block px-2 py-1 rounded text-xs bg-serma-light text-serma-blue/80">
              {v.statut}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
