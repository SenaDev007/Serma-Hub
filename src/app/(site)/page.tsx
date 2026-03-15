import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/sections/Hero";
import { FilieresPreview } from "@/components/sections/FilieresPreview";
import { Difference } from "@/components/sections/Difference";
import { Impact } from "@/components/sections/Impact";
import { TemoignagesHome } from "@/components/sections/TemoignagesHome";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTABanner } from "@/components/sections/CTABanner";

export default async function HomePage() {
  const [filieres, temoignages, articles] = await Promise.all([
    prisma.filiere.findMany({ where: { actif: true }, orderBy: { ordre: "asc" } }),
    prisma.temoignage.findMany({ where: { publie: true }, take: 6 }),
    prisma.article.findMany({ orderBy: { datePublication: "desc" } }),
  ]);

  return (
    <>
      <Hero />
      <FilieresPreview filieres={filieres} />
      <Difference />
      <Impact />
      <TemoignagesHome temoignages={temoignages} />
      <BlogPreview articles={articles} />
      <CTABanner />
    </>
  );
}
