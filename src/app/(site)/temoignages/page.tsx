import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";

export const metadata = {
  title: "Témoignages",
  description: "Témoignages des anciens apprenants de SERMA HUB – Parakou, Bénin.",
};

export default async function TemoignagesPage() {
  const temoignages = await prisma.temoignage.findMany({
    where: { publie: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display font-bold text-4xl text-serma-navy text-center">
          Témoignages
        </h1>
        <p className="mt-4 text-serma-blue/80 text-center max-w-2xl mx-auto">
          Ils ont transformé leur vie avec SERMA HUB. Découvre leurs parcours.
        </p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {temoignages.map((t) => (
            <article
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-serma-navy/5"
            >
              <p className="text-serma-navy/90 italic">&ldquo;{t.texte}&rdquo;</p>
              <div className="flex gap-1 mt-3 text-serma-orange">
                {Array.from({ length: t.noteEtoiles }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 font-display font-bold text-serma-navy">
                {t.prenom} {t.nom}
              </p>
              <p className="text-sm text-serma-blue/80">{t.filiere}</p>
              {t.promotion && <p className="text-sm text-serma-blue/70">Promotion {t.promotion}</p>}
              {t.resultat && (
                <p className="text-sm text-serma-teal font-medium mt-2">{t.resultat}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
