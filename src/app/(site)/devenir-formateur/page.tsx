import { CandidatureFormateurSection } from "./CandidatureFormateurSection";

export const metadata = {
  title: "Devenir formateur",
  description: "Rejoins l'équipe pédagogique SERMA HUB – Partager ton expertise, transformer des vies.",
};

export default function DevenirFormateurPage() {
  return (
    <div>
      <section className="bg-serma-navy py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23ffffff' fill-opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-serma-teal/20 text-serma-teal px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-serma-teal animate-pulse" />
            Recrutement ouvert
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">
            Rejoins l&apos;équipe pédagogique SERMA HUB
          </h1>
          <p className="mt-6 text-white/90 max-w-2xl mx-auto">
            Partage ton expertise, transforme des vies, construis l&apos;Afrique de demain.
          </p>
        </div>
      </section>

      <section className="py-20 bg-serma-light">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl text-serma-navy text-center mb-12">
            Pourquoi enseigner chez SERMA HUB ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Rémunération compétitive", desc: "Honoraires convenus et versés dans les délais." },
              { title: "Impact réel", desc: "Tu formes des entrepreneurs qui créent des emplois." },
              { title: "Formation pédagogique", desc: "Nous t'accompagnons pour transmettre efficacement." },
              { title: "Réseau professionnel", desc: "Échanges avec d'autres formateurs et partenaires." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow border border-serma-navy/5">
                <h3 className="font-display font-bold text-serma-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-serma-blue/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CandidatureFormateurSection />
    </div>
  );
}
