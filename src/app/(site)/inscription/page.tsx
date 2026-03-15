import { prisma } from "@/lib/prisma";
import { InscriptionForm } from "./InscriptionForm";

export const metadata = {
  title: "Inscription",
  description: "Inscris-toi à une formation SERMA HUB – Parakou, Bénin.",
};

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ filiere?: string }>;
}) {
  const { filiere: filiereSlug } = await searchParams;
  const [filieres, vagues] = await Promise.all([
    prisma.filiere.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
    prisma.vague.findMany({
      where: { statut: "PLANIFIEE" },
      include: { filiere: true },
      orderBy: { dateDebut: "asc" },
    }),
  ]);
  const filierePreselected = filiereSlug
    ? filieres.find((f) => f.slug === filiereSlug)?.id
    : undefined;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-display font-bold text-3xl text-serma-navy text-center">
          Inscription à une formation
        </h1>
        <p className="mt-2 text-serma-blue/80 text-center">
          Remplis le formulaire en 3 étapes. À la fin, tu pourras payer en ligne (Mobile Money ou carte).
        </p>
        <InscriptionForm
          filieres={filieres}
          vagues={vagues}
          filierePreselected={filierePreselected}
        />
      </div>
    </div>
  );
}
