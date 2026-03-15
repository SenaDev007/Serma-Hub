import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatFCFA } from "@/lib/utils";

export default async function FiliereEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const filiere = await prisma.filiere.findUnique({
    where: { id },
    include: { modules: { orderBy: { ordre: "asc" } } },
  });
  if (!filiere) notFound();

  return (
    <div>
      <Link href="/dashboard/filieres" className="text-serma-orange font-medium text-sm hover:underline mb-6 inline-block">
        ← Filières
      </Link>
      <div className="bg-white rounded-xl shadow border border-serma-navy/5 p-6">
        <h1 className="font-display font-bold text-2xl text-serma-navy">{filiere.nom}</h1>
        <p className="text-serma-blue/80 mt-1">{filiere.slug}</p>
        <p className="mt-4">{filiere.duree} — {formatFCFA(filiere.tarif)}</p>
        <p className="mt-4 text-serma-blue/90">{filiere.description}</p>
        <div className="mt-8">
          <h2 className="font-display font-bold text-lg text-serma-navy mb-4">Modules</h2>
          <ul className="space-y-2">
            {filiere.modules.map((m) => (
              <li key={m.id} className="py-2 border-b border-serma-navy/5">
                <span className="font-medium">{m.titre}</span>
                <span className="text-serma-blue/70 text-sm ml-2">— {m.dureeHeures}h</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-serma-blue/70 text-sm">Édition complète à venir (formulaire + sauvegarde).</p>
      </div>
    </div>
  );
}
