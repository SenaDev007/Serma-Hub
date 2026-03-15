import { prisma } from "@/lib/prisma";
import { Target, Eye, Heart } from "lucide-react";

export const metadata = {
  title: "À propos",
  description: "Mission, vision et valeurs de SERMA HUB – Impact Academy, centre de formation entrepreneurial à Parakou, Bénin.",
};

const acrostic = [
  { letter: "S", word: "Société", desc: "Un cadre institutionnel structuré" },
  { letter: "E", word: "d'Éveil", desc: "Stimuler la conscience entrepreneuriale" },
  { letter: "R", word: "et de Réarmement", desc: "Renforcer les capacités et la résilience" },
  { letter: "M", word: "Mental", desc: "Travailler la posture et la mentalité" },
  { letter: "A", word: "de l'Afrique", desc: "Ancrage continental et panafricain" },
];

export default async function AProposPage() {
  const formateurs = await prisma.formateurProfil.findMany({
    where: { actif: true },
    include: { user: true },
  });

  return (
    <div>
      <section className="bg-serma-navy py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">
            À propos de SERMA HUB
          </h1>
          <p className="mt-6 text-white/80 max-w-2xl mx-auto font-accent italic">
            ENTREPRENDRE • INNOVER • IMPACTER
          </p>
        </div>
      </section>

      <section className="py-20 bg-serma-light">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl text-serma-navy text-center mb-12">
            L&apos;acrostiche SERMA
          </h2>
          <div className="grid md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {acrostic.map((item) => (
              <div
                key={item.letter}
                className="text-center p-6 rounded-2xl bg-white border border-serma-navy/10 shadow-sm"
              >
                <span className="text-4xl font-display font-black text-serma-orange">{item.letter}</span>
                <p className="mt-2 font-display font-bold text-serma-navy">{item.word}</p>
                <p className="mt-1 text-sm text-serma-blue/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-serma-light border-l-4 border-serma-orange">
              <Target className="w-10 h-10 text-serma-orange mb-4" />
              <h3 className="font-display font-bold text-xl text-serma-navy">Mission</h3>
              <p className="mt-2 text-serma-blue/80">
                Former et accompagner les jeunes et les femmes à créer des activités génératrices de revenus durables, grâce à une pédagogie pratique orientée vers les besoins du marché.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-serma-light border-l-4 border-serma-teal">
              <Eye className="w-10 h-10 text-serma-teal mb-4" />
              <h3 className="font-display font-bold text-xl text-serma-navy">Vision</h3>
              <p className="mt-2 text-serma-blue/80">
                Faire de Parakou un pôle régional d&apos;entrepreneurs autonomes, innovants et responsables, capable d&apos;inspirer toute l&apos;Afrique de l&apos;Ouest.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-serma-light border-l-4 border-serma-blue">
              <Heart className="w-10 h-10 text-serma-blue mb-4" />
              <h3 className="font-display font-bold text-xl text-serma-navy">Valeurs</h3>
              <p className="mt-2 text-serma-blue/80">
                Action, responsabilité, créativité, impact local et solidarité entrepreneuriale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {formateurs.length > 0 && (
        <section className="py-20 bg-serma-navy text-white">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-3xl text-center mb-12">L&apos;équipe</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {formateurs.map((f) => (
                <div key={f.id} className="text-center p-6 rounded-2xl bg-white/5">
                  <div className="w-20 h-20 rounded-full bg-serma-orange/20 mx-auto flex items-center justify-center font-display font-bold text-2xl text-serma-orange">
                    {f.user.prenom.slice(0, 1)}{f.user.nom.slice(0, 1)}
                  </div>
                  <p className="mt-4 font-display font-bold">{f.user.prenom} {f.user.nom}</p>
                  <p className="text-white/80 text-sm">{f.specialite}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
