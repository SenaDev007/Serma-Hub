import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return {};
  return {
    title: article.titre,
    description: article.extrait,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, publie: true },
  });
  if (!article) notFound();

  return (
    <article className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <nav className="text-serma-blue/80 text-sm mb-8">
          <Link href="/" className="hover:text-serma-orange">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-serma-orange">Blog</Link>
          <span className="mx-2">/</span>
          <span>{article.titre}</span>
        </nav>
        {article.image && (
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-8">
            <Image src={article.image} alt="" fill className="object-cover" priority />
          </div>
        )}
        <span className="text-serma-orange font-bold text-sm">{article.categorie}</span>
        <h1 className="font-display font-bold text-4xl text-serma-navy mt-2">
          {article.titre}
        </h1>
        <p className="mt-2 text-serma-blue/80">
          {article.datePublication && formatDate(article.datePublication)} — {article.auteur}
        </p>
        <div
          className="mt-8 prose prose-serma max-w-none text-serma-navy/90"
          dangerouslySetInnerHTML={{ __html: article.contenu }}
        />
      </div>
    </article>
  );
}
