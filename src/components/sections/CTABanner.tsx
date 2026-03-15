import Link from "next/link";

export function CTABanner() {
  return (
    <section className="py-16 bg-serma-orange">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-serma-navy">
          Tu veux construire ton avenir ?
        </h2>
        <p className="mt-2 text-serma-navy/80">
          Inscris-toi maintenant et rejoins la prochaine promotion.
        </p>
        <Link
          href="/inscription"
          className="inline-block mt-6 bg-white text-serma-navy font-display font-bold px-8 py-4 rounded-lg hover:bg-serma-light transition-colors shadow-lg"
        >
          S&apos;inscrire maintenant
        </Link>
      </div>
    </section>
  );
}
