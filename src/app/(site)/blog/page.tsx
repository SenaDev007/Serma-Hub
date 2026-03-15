import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog",
  description: "Actualités et conseils entrepreneuriat – SERMA HUB Parakou.",
};

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { publie: true },
    orderBy: { datePublication: "desc" },
  });

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display font-bold text-4xl text-serma-navy text-center">
          Blog & Actualités
        </h1>
        <p className="mt-4 text-serma-blue/80 text-center max-w-2xl mx-auto">
          Conseils et actualités sur l&apos;entrepreneuriat en Afrique.
        </p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/blog/${a.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-serma-navy/5 hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video bg-serma-navy/10 relative">
                {a.image ? (
                  <Image src={a.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 768px) 100vw, 33vw" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-serma-navy/20 font-display font-bold text-5xl">
                    {a.titre.slice(0, 1)}
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-serma-orange text-serma-navy text-xs font-bold px-2 py-1 rounded">
                  {a.categorie}
                </span>
              </div>
              <div className="p-5">
                <time className="text-sm text-serma-blue/70">
                  {a.datePublication && formatDate(a.datePublication)}
                </time>
                <h2 className="mt-2 font-display font-bold text-serma-navy group-hover:text-serma-orange transition-colors line-clamp-2">
                  {a.titre}
                </h2>
                <p className="mt-2 text-serma-blue/80 text-sm line-clamp-2">{a.extrait}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
