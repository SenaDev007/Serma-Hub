import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatFCFA } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const filiereColors: Record<string, string> = {
  "commerce-distribution": "bg-filiere-commerce",
  "agro-business": "bg-filiere-agro",
  "services-techniques": "bg-filiere-tech",
  "digital-local": "bg-filiere-digital",
  "entrepreneur-feminin": "bg-filiere-feminin",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filiere = await prisma.filiere.findUnique({ where: { slug } });
  if (!filiere) return {};
  return {
    title: filiere.nom,
    description: filiere.description.slice(0, 160),
  };
}

export default async function FilierePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filiere = await prisma.filiere.findUnique({
    where: { slug, actif: true },
    include: { modules: { orderBy: { ordre: "asc" } } },
  });
  if (!filiere) notFound();

  const colorClass = filiereColors[filiere.slug] || "bg-serma-blue";

  return (
    <div>
      <section className={`${colorClass} py-16 text-white`}>
        <div className="container mx-auto px-4">
          <nav className="text-white/80 text-sm mb-6">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/filieres" className="hover:text-white">Filières</Link>
            <span className="mx-2">/</span>
            <span>{filiere.nom}</span>
          </nav>
          <h1 className="font-display font-bold text-4xl md:text-5xl">
            {filiere.nom}
          </h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            {filiere.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <span>Durée : {filiere.duree}</span>
            <span>Tarif : {formatFCFA(filiere.tarif)}</span>
          </div>
          <Link
            href={`/inscription?filiere=${filiere.slug}`}
            className="inline-block mt-8 bg-serma-orange text-serma-navy font-display font-bold px-8 py-4 rounded-lg hover:bg-serma-orange/90 transition-colors"
          >
            S&apos;inscrire à cette filière
          </Link>
        </div>
      </section>

      <section className="py-16 bg-serma-light">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-serma-navy mb-6">
            Pourquoi cette filière ?
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {filiere.objectifs.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowRight className="w-5 h-5 text-serma-orange shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-serma-navy mb-8">
            Programme détaillé (modules)
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {filiere.modules.map((mod) => (
              <AccordionItem
                key={mod.id}
                value={mod.id}
                className="bg-white rounded-xl border border-serma-navy/10 px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-display font-bold text-serma-navy">
                    {mod.titre}
                  </span>
                  <span className="text-serma-blue/70 text-sm font-normal">
                    — {mod.dureeHeures}h
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-serma-blue/90">
                  {mod.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-serma-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-2xl">
            Prêt à te lancer ?
          </h2>
          <p className="mt-2 text-white/80">
            Inscris-toi à la filière {filiere.nom} et rejoins la prochaine promotion.
          </p>
          <Link
            href={`/inscription?filiere=${filiere.slug}`}
            className="inline-block mt-6 bg-serma-orange text-serma-navy font-display font-bold px-8 py-4 rounded-lg hover:bg-serma-orange/90 transition-colors"
          >
            S&apos;inscrire maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}
