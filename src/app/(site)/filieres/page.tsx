import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatFCFA } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const filiereColors: Record<string, string> = {
  "commerce-distribution": "bg-filiere-commerce",
  "agro-business": "bg-filiere-agro",
  "services-techniques": "bg-filiere-tech",
  "digital-local": "bg-filiere-digital",
  "entrepreneur-feminin": "bg-filiere-feminin",
};

export const metadata = {
  title: "Filières",
  description: "Découvrez les 5 filières de formation entrepreneuriale de SERMA HUB – Parakou, Bénin.",
};

export default async function FilieresPage() {
  const filieres = await prisma.filiere.findMany({
    where: { actif: true },
    orderBy: { ordre: "asc" },
    include: { _count: { select: { modules: true } } },
  });

  return (
    <div>
      <section className="bg-serma-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">
            Les 5 filières
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Choisis la formation qui correspond à ton projet entrepreneurial. Chaque filière combine théorie et pratique pour que tu sortes avec un projet testé.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filieres.map((f) => (
              <article
                key={f.id}
                className={`rounded-2xl overflow-hidden border-l-4 ${filiereColors[f.slug] || "bg-serma-blue"} border-serma-navy/20 bg-white shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="p-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${filiereColors[f.slug] || "bg-serma-blue"}`}>
                    {f.nom}
                  </div>
                  <p className="mt-3 text-serma-navy/90 line-clamp-2">{f.description}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-serma-blue/80">
                    <span>{f.duree}</span>
                    <span>{f._count.modules} modules</span>
                    <span className="font-bold text-serma-orange">{formatFCFA(f.tarif)}</span>
                  </div>
                  <Link
                    href={`/filieres/${f.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-serma-orange font-display font-bold hover:gap-3 transition-all"
                  >
                    Voir la filière
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
