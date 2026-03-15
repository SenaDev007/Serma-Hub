import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatFCFA } from "@/lib/utils";

export default async function ApprenantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apprenant = await prisma.apprenantProfil.findUnique({
    where: { id },
    include: {
      user: true,
      inscriptions: { include: { filiere: true } },
      paiements: true,
    },
  });
  if (!apprenant) notFound();

  return (
    <div>
      <Link href="/dashboard/apprenants" className="text-serma-orange font-medium text-sm hover:underline mb-6 inline-block">
        ← Apprenants
      </Link>
      <div className="bg-white rounded-xl shadow border border-serma-navy/5 p-6">
        <h1 className="font-display font-bold text-2xl text-serma-navy">
          {apprenant.user.prenom} {apprenant.user.nom}
        </h1>
        <p className="text-serma-blue/80 mt-1">{apprenant.user.email}</p>
        <p className="text-serma-blue/70">{apprenant.user.telephone ?? "—"}</p>
        <p className="mt-4">
          <span className="inline-block px-2 py-1 rounded text-xs bg-serma-light text-serma-blue/80">
            {apprenant.statut}
          </span>
        </p>
        <div className="mt-8">
          <h2 className="font-display font-bold text-lg text-serma-navy mb-4">Inscriptions</h2>
          <ul className="space-y-2">
            {apprenant.inscriptions.map((ins) => (
              <li key={ins.id} className="flex justify-between items-center py-2 border-b border-serma-navy/5">
                <span>{ins.filiere.nom}</span>
                <span>{formatFCFA(ins.montantPaye)} / {formatFCFA(ins.montantTotal)}</span>
                <span className="text-xs px-2 py-1 rounded bg-serma-light">{ins.statut}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
