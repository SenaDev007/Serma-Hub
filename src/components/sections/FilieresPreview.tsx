import Link from "next/link";
import { ArrowRight, BookOpen, ShoppingCart, Sprout, Wrench, Smartphone, Star, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";

const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingCart, Sprout, Wrench, Smartphone, Star, BookOpen,
};

async function getFilieres() {
  try {
    const filieres = await prisma.filiere.findMany({
      where: { actif: true },
      include: { _count: { select: { apprenants: true } } },
      orderBy: { id: "asc" },
    });
    return filieres;
  } catch {
    return [];
  }
}

export default async function FilieresPreview() {
  const filieres = await getFilieres();

  return (
    <section id="filieres" className="py-24 px-6 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">
            Nos formations
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-syne font-bold text-white leading-tight" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              <BookOpen size={32} className="inline text-[#F5A623] mr-3 mb-1" />
              {filieres.length || 5} filières pour{" "}
              <span className="text-[#F5A623]">entreprendre</span>
            </h2>
            <p className="text-[15px] text-[#8B9BB4] max-w-sm font-dm leading-relaxed">
              Chaque filière est conçue pour le marché local. Tu sors avec un projet testé et de vrais clients.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filieres.map((f, i) => {
            const Icon = ICON_MAP[f.iconSlug] ?? BookOpen;
            return (
              <div
                key={f.id}
                className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-7 hover:-translate-y-1 hover:border-[#F5A623]/30 hover:shadow-card transition-all duration-200 group flex flex-col"
              >
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                    <Icon size={22} className="text-[#F5A623]" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0D1B2A] px-3 py-1 rounded-full">
                    <Clock size={11} className="text-[#8B9BB4]" />
                    <span className="text-[11px] text-[#8B9BB4] font-dm">{f.dureeMois} mois</span>
                  </div>
                </div>

                <h3 className="font-syne font-bold text-white text-[18px] mb-2">{f.nom}</h3>
                <p className="text-[14px] text-[#8B9BB4] leading-relaxed mb-6 flex-1 font-dm">
                  {f.description.substring(0, 120)}…
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#253548]">
                  <span className="text-[12px] font-dm text-[#8B9BB4]">
                    {f._count.apprenants} inscrits
                  </span>
                  <Link
                    href={`/filieres/${f.id}`}
                    className="inline-flex items-center gap-1.5 text-[#F5A623] text-[13px] font-dm font-medium hover:gap-2.5 transition-all duration-150"
                  >
                    Découvrir <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/filieres"
            className="inline-flex items-center gap-2 border border-[#253548] text-[#F8F9FA] px-8 py-4 rounded-xl font-dm font-medium text-sm hover:border-[#F5A623]/40 hover:bg-[#1E2D3D] transition-all duration-200"
          >
            Voir toutes les filières <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
