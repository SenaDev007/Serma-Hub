import Link from "next/link";
import { ArrowRight, MapPin, Users, BookOpen, Clock, GraduationCap } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getHeroStats() {
  try {
    const [filieresCount, apprenantsCount, statsRow] = await Promise.all([
      prisma.filiere.count({ where: { actif: true } }),
      prisma.apprenant.count(),
      prisma.stat.findUnique({ where: { cle: "duree_formation" } }),
    ]);
    return {
      filieres: filieresCount,
      apprenants: apprenantsCount,
      duree: statsRow?.valeur ?? "3-6",
    };
  } catch {
    return { filieres: 5, apprenants: 87, duree: "3-6" };
  }
}

export default async function Hero() {
  const stats = await getHeroStats();

  return (
    <section
      id="hero"
      className="min-h-screen bg-[#0D1B2A] relative flex items-center overflow-hidden"
      style={{ paddingTop: "72px" }}
    >
      {/* Mesh gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 15% 50%, rgba(245,166,35,0.07) 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 85% 30%, rgba(30,45,61,0.8) 0%, transparent 60%)",
      }} />
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#F8F9FA 1px, transparent 1px), linear-gradient(90deg, #F8F9FA 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-0" style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left */}
          <div className="animate-fade-up">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2.5 bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] text-[11px] font-dm font-semibold tracking-[0.1em] uppercase px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-pulse2" />
              <MapPin size={11} strokeWidth={2} />
              Centre de Formation Entrepreneuriale — Parakou, Bénin
            </div>

            {/* Title */}
            <h1 className="font-syne font-bold text-white leading-[1.08] mb-6" style={{ fontSize: "clamp(38px,5.5vw,68px)" }}>
              Éveiller.{" "}
              <span style={{ background: "linear-gradient(135deg, #F5A623, #FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Former.
              </span>
              <br />
              Entreprendre.
            </h1>

            <p className="text-[17px] text-[#8B9BB4] leading-relaxed mb-10 max-w-lg font-dm">
              SERMA HUB forme les jeunes et les femmes à créer des activités
              génératrices de revenus durables. Tu ne cherches pas un emploi —
              tu construis ta propre entreprise.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-8 py-4 rounded-xl font-syne font-bold text-sm hover:-translate-y-0.5 hover:shadow-accent transition-all duration-200 shadow-accent group"
              >
                Je veux me former
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/partenaires"
                className="inline-flex items-center gap-2 border border-[#253548] text-[#F8F9FA] px-8 py-4 rounded-xl font-dm font-medium text-sm hover:border-[#F5A623]/50 hover:bg-[#1E2D3D] transition-all duration-200"
              >
                Devenir partenaire
              </Link>
            </div>
          </div>

          {/* Right — Stats card */}
          <div className="flex justify-center lg:justify-end animate-fade-up-1">
            <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-8 w-full max-w-sm shadow-card">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#253548]">
                <div className="w-12 h-12 rounded-xl bg-[#F5A623] flex items-center justify-center text-[#0D1B2A]">
                  <GraduationCap size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-syne font-bold text-white text-lg">SERMA HUB</div>
                  <div className="text-[11px] text-[#8B9BB4] font-dm tracking-widest uppercase">Impact Academy</div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                {[
                  { icon: BookOpen, label: "Filières actives", value: String(stats.filieres), unit: "filières" },
                  { icon: Users, label: "Apprenants inscrits", value: String(stats.apprenants), unit: "apprenants" },
                  { icon: Clock, label: "Durée de formation", value: stats.duree, unit: "mois" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-4 bg-[#0D1B2A] rounded-xl px-5 py-4">
                    <div className="w-9 h-9 rounded-lg bg-[#F5A623]/10 flex items-center justify-center flex-shrink-0">
                      <s.icon size={18} className="text-[#F5A623]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] text-[#8B9BB4] font-dm">{s.label}</div>
                    </div>
                    <div className="font-syne font-bold text-[#F5A623] text-xl">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#253548] text-center">
                <p className="text-[11px] font-dm text-[#8B9BB4] tracking-widest uppercase">
                  Entreprendre · Innover · Impacter
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
