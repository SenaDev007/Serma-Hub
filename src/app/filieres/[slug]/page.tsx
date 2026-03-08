import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FILIERES } from "@/lib/data";
import { formatFCFA } from "@/lib/utils";
import { ArrowLeft, Clock, Calendar, Check, ArrowRight, Target, Star } from "lucide-react";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return FILIERES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const filiere = FILIERES.find((f) => f.slug === params.slug);
  if (!filiere) return {};
  return {
    title: `${filiere.nom} — Formation Entrepreneuriale`,
    description: filiere.description,
  };
}

export default function FiliereDetailPage({ params }: Props) {
  const filiere = FILIERES.find((f) => f.slug === params.slug);
  if (!filiere) notFound();
  const f = filiere!;

  const TARIFS = [
    { label: "Paiement intégral", amount: f.prixIntegral, desc: "Règlement unique avant démarrage", highlight: false },
    { label: "Acompte 50%",       amount: f.acompte50,    desc: "50% à l'inscription + 50% à mi-parcours", highlight: true },
    { label: "3 mensualités",     amount: f.mensualite,   desc: "Étalé sur 3 mois consécutifs", highlight: false },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0D1B2A] pt-28 pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <Link href="/filieres" className="inline-flex items-center gap-2 text-[#8B9BB4] hover:text-white text-sm font-dm mb-8 transition-colors">
              <ArrowLeft size={14} /> Toutes les filières
            </Link>
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1">
                <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">
                  Filière {f.id} · {f.duree}
                </p>
                <h1 className="font-syne font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(30px,4vw,50px)" }}>
                  {f.nom}
                </h1>
                <p className="text-[#8B9BB4] font-dm text-[16px] leading-relaxed mb-6 max-w-xl">
                  {f.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 bg-[#1E2D3D] border border-[#253548] text-[#8B9BB4] font-dm text-[13px] px-3 py-1.5 rounded-full">
                    <Clock size={12} /> {f.horaires}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#1E2D3D] border border-[#253548] text-[#8B9BB4] font-dm text-[13px] px-3 py-1.5 rounded-full">
                    <Calendar size={12} /> {f.duree}
                  </span>
                </div>
              </div>

              {/* Quick price card */}
              <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-8 min-w-[260px]">
                <p className="text-[11px] font-dm font-semibold uppercase tracking-widest text-[#8B9BB4] mb-1">À partir de</p>
                <div className="font-syne font-bold text-[#F5A623] text-3xl mb-1">
                  {formatFCFA(f.mensualite)}
                </div>
                <p className="text-[#8B9BB4] font-dm text-[13px] mb-6">par mois (3 mensualités)</p>
                <Link
                  href="/#contact"
                  className="w-full flex items-center justify-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-6 py-3.5 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] transition-colors group"
                >
                  S&apos;inscrire maintenant
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-6 bg-[#0D1B2A]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              {/* Compétences */}
              <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-8">
                <h2 className="font-syne font-bold text-white text-lg mb-5">Compétences développées</h2>
                <div className="flex flex-wrap gap-2.5">
                  {f.competences.map((c) => (
                    <span key={c} className="flex items-center gap-1.5 bg-[#253548] text-[#F8F9FA] font-dm text-[12px] px-3 py-1.5 rounded-full">
                      <Check size={11} className="text-[#F5A623]" /> {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Programme */}
              {f.modules && (
                <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-8">
                  <h2 className="font-syne font-bold text-white text-lg mb-5">Programme de formation</h2>
                  <div className="space-y-5">
                    {f.modules.map((mois, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center font-syne font-bold text-[#0D1B2A] text-sm">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-syne font-bold text-white text-sm mb-1">{mois.titre}</p>
                          <p className="text-[13px] font-dm text-[#8B9BB4] leading-relaxed">{mois.resultat}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pour qui */}
              {f.profilPour && (
                <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-8">
                  <h2 className="font-syne font-bold text-white text-lg mb-5">Cette filière est faite pour toi si…</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {f.profilPour.map((d) => (
                      <div key={d} className="flex items-start gap-2.5 p-3 bg-[#253548] rounded-xl">
                        <ArrowRight size={13} className="text-[#F5A623] mt-0.5 flex-shrink-0" />
                        <span className="text-[13px] font-dm text-[#F8F9FA]">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Résultat */}
              <div className="bg-[#F5A623]/5 border border-[#F5A623]/20 rounded-2xl p-8">
                <div className="flex items-center gap-2.5 mb-4">
                  <Target size={18} className="text-[#F5A623]" />
                  <h2 className="font-syne font-bold text-white text-lg">Résultat attendu</h2>
                </div>
                <p className="text-[#F8F9FA] font-dm text-[15px] leading-relaxed">{f.resultatAttendu}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Tarifs */}
              <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-6">
                <h3 className="font-syne font-bold text-white text-sm mb-4">Options de paiement</h3>
                <div className="space-y-3">
                  {TARIFS.map((t) => (
                    <div key={t.label} className={`p-4 rounded-xl border-2 transition-all ${t.highlight ? "border-[#F5A623] bg-[#F5A623]/5" : "border-[#253548]"}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-syne font-bold text-white text-sm">{t.label}</span>
                        {t.highlight && (
                          <span className="flex items-center gap-1 bg-[#F5A623] text-[#0D1B2A] text-[10px] font-syne font-bold px-2 py-0.5 rounded-full">
                            <Star size={9} fill="currentColor" /> Populaire
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] font-dm text-[#8B9BB4] mb-2">{t.desc}</p>
                      <div className="font-syne font-bold text-[#F5A623] text-lg">{formatFCFA(t.amount)}</div>
                    </div>
                  ))}
                </div>
                <Link href="/#contact" className="mt-4 w-full flex items-center justify-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-6 py-3.5 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] transition-all group">
                  Réserver ma place
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Profil contre */}
              {f.profilContre && (
                <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-6">
                  <h3 className="font-syne font-bold text-white text-sm mb-4">Cette filière n&apos;est pas pour toi si…</h3>
                  <ul className="space-y-2">
                    {f.profilContre.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[13px] font-dm text-[#8B9BB4]">
                        <span className="text-[#F5A623] mt-0.5 flex-shrink-0">•</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Other filières */}
              <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-6">
                <h3 className="font-syne font-bold text-white text-sm mb-4">Autres filières</h3>
                <div className="space-y-1">
                  {FILIERES.filter((other) => other.slug !== f.slug).map((other) => (
                    <Link key={other.slug} href={`/filieres/${other.slug}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#253548] transition-colors group">
                      <ArrowRight size={13} className="text-[#8B9BB4] group-hover:text-[#F5A623] transition-colors flex-shrink-0" />
                      <span className="text-[13px] font-dm text-[#8B9BB4] group-hover:text-white transition-colors">{other.nom}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
