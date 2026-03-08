import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-20 px-6 bg-[#0D1B2A] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,166,35,0.06) 0%, transparent 70%)",
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(#F8F9FA 1px, transparent 1px), linear-gradient(90deg, #F8F9FA 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] text-[11px] font-dm font-semibold tracking-[0.12em] uppercase px-4 py-2 rounded-full mb-6">
          <Clock size={11} />
          Places limitées — Prochaine promotion
          <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-pulse2" />
        </div>

        <h2 className="font-syne font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(26px,4vw,48px)" }}>
          Prêt à construire ton{" "}
          <span className="text-[#F5A623]">entreprise</span> ?
        </h2>

        <p className="text-[#8B9BB4] font-dm text-[16px] max-w-lg mx-auto leading-relaxed mb-10">
          Rejoins la prochaine promotion SERMA HUB. Les inscriptions sont ouvertes. Les places sont limitées à 25 par filière.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0D1B2A] px-8 py-4 rounded-xl font-syne font-bold text-sm hover:bg-[#e09620] hover:-translate-y-0.5 transition-all shadow-accent group">
            S&apos;inscrire maintenant
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link href="/filieres" className="inline-flex items-center gap-2 border border-[#253548] text-[#F8F9FA] px-8 py-4 rounded-xl font-dm font-medium text-sm hover:bg-[#1E2D3D] transition-colors">
            Voir les filières
          </Link>
        </div>
      </div>
    </section>
  );
}
