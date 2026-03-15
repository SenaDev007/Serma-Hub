import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatFCFA } from "@/lib/utils";

export default async function FilieresBackofficePage() {
  const filieres = await prisma.filiere.findMany({
    orderBy: { ordre: "asc" },
    include: { _count: { select: { inscriptions: true, modules: true } } },
  });

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-serma-navy mb-8">
        Filières
      </h1>
      <div className="grid gap-6">
        {filieres.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-xl p-6 shadow border border-serma-navy/5 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl shrink-0"
                style={{ backgroundColor: f.couleur }}
              />
              <div>
                <h2 className="font-display font-bold text-serma-navy">{f.nom}</h2>
                <p className="text-sm text-serma-blue/80">
                  {f._count.modules} modules • {f.duree} • {formatFCFA(f.tarif)}
                </p>
                <p className="text-sm text-serma-blue/70 mt-1">
                  {f._count.inscriptions} inscription(s)
                </p>
              </div>
            </div>
            <Link
              href={`/dashboard/filieres/${f.id}`}
              className="bg-serma-orange text-serma-navy font-display font-bold px-4 py-2 rounded-lg hover:bg-serma-orange/90 text-sm"
            >
              Éditer
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
