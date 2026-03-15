import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("AdminSerma2025!", 12);

  await prisma.user.upsert({
    where: { email: "admin@sermahub.org" },
    update: {},
    create: {
      email: "admin@sermahub.org",
      password: hashedPassword,
      nom: "Admin",
      prenom: "SERMA",
      role: "SUPER_ADMIN",
    },
  });

  const filieresData = [
    {
      slug: "commerce-distribution",
      nom: "Commerce & Distribution",
      description: "Formation complète pour lancer ou structurer une activité dans le commerce et la distribution. Gestion des stocks, négociation, vente B2B et B2C.",
      couleur: "#1A5276",
      icone: "ShoppingCart",
      duree: "4 mois",
      tarif: 150000,
      ordre: 1,
      objectifs: ["Gérer un point de vente", "Négocier avec les fournisseurs", "Structurer sa trésorerie"],
      modules: [
        { titre: "Fondamentaux du commerce", description: "Introduction au commerce formel et informel.", dureeHeures: 20, ordre: 1 },
        { titre: "Gestion des stocks", description: "Inventaire, rotation, approvisionnement.", dureeHeures: 24, ordre: 2 },
        { titre: "Vente et négociation", description: "Techniques de vente B2B et B2C.", dureeHeures: 28, ordre: 3 },
        { titre: "Comptabilité de base", description: "Trésorerie, marges, prix de revient.", dureeHeures: 24, ordre: 4 },
      ],
    },
    {
      slug: "agro-business",
      nom: "Agro-Business & Transformation",
      description: "De la production à la transformation et à la commercialisation des produits agricoles. Valorisation des filières locales.",
      couleur: "#145A32",
      icone: "Leaf",
      duree: "5 mois",
      tarif: 175000,
      ordre: 2,
      objectifs: ["Transformer des produits agricoles", "Commercialiser en circuit court", "Valoriser les filières locales"],
      modules: [
        { titre: "Filières agricoles au Bénin", description: "Contexte et opportunités.", dureeHeures: 16, ordre: 1 },
        { titre: "Transformation alimentaire", description: "Conservation, conditionnement, normes.", dureeHeures: 32, ordre: 2 },
        { titre: "Commercialisation des produits", description: "Marchés, prix, circuits.", dureeHeures: 24, ordre: 3 },
        { titre: "Gestion d'exploitation", description: "Coûts, investissements, rentabilité.", dureeHeures: 24, ordre: 4 },
      ],
    },
    {
      slug: "services-techniques",
      nom: "Services Techniques",
      description: "Électricité, solaire, plomberie et BTP. Formation pratique pour devenir technicien qualifié ou créer son entreprise de services.",
      couleur: "#6E2F0A",
      icone: "Wrench",
      duree: "5 mois",
      tarif: 200000,
      ordre: 3,
      objectifs: ["Réaliser des installations électriques", "Installer des kits solaires", "Créer son entreprise de services"],
      modules: [
        { titre: "Électricité bâtiment", description: "Sécurité, câblage, normes.", dureeHeures: 40, ordre: 1 },
        { titre: "Énergie solaire", description: "Kits solaires, dimensionnement, installation.", dureeHeures: 32, ordre: 2 },
        { titre: "Plomberie de base", description: "Installations sanitaires courantes.", dureeHeures: 24, ordre: 3 },
        { titre: "Entrepreneuriat technique", description: "Devis, chantiers, relation client.", dureeHeures: 20, ordre: 4 },
      ],
    },
    {
      slug: "digital-local",
      nom: "Digital Local",
      description: "Marketing digital, réseaux sociaux, création de contenu et freelancing. Pour les entrepreneurs qui veulent vendre en ligne.",
      couleur: "#4A235A",
      icone: "Smartphone",
      duree: "4 mois",
      tarif: 180000,
      ordre: 4,
      objectifs: ["Gérer une présence en ligne", "Créer du contenu engageant", "Monétiser ses compétences digitales"],
      modules: [
        { titre: "Réseaux sociaux", description: "Facebook, WhatsApp Business, Instagram.", dureeHeures: 24, ordre: 1 },
        { titre: "Création de contenu", description: "Photos, vidéos, copywriting.", dureeHeures: 28, ordre: 2 },
        { titre: "Marketing digital", description: "Publicité ciblée, analytics.", dureeHeures: 20, ordre: 3 },
        { titre: "Freelance et portage", description: "Proposer ses services en ligne.", dureeHeures: 24, ordre: 4 },
      ],
    },
    {
      slug: "entrepreneur-feminin",
      nom: "Entrepreneuriat Féminin",
      description: "Formation dédiée aux femmes pour lancer ou développer une AGR. Leadership, gestion du temps, accès au financement.",
      couleur: "#7B241C",
      icone: "Heart",
      duree: "4 mois",
      tarif: 120000,
      ordre: 5,
      objectifs: ["Lancer une AGR durable", "Gérer temps et famille", "Accéder au financement"],
      modules: [
        { titre: "Identifier son projet", description: "Idéation, marché, modèle économique.", dureeHeures: 20, ordre: 1 },
        { titre: "Leadership et posture", description: "Confiance en soi, prise de parole.", dureeHeures: 24, ordre: 2 },
        { titre: "Gestion et trésorerie", description: "Comptabilité simplifiée pour AGR.", dureeHeures: 24, ordre: 3 },
        { titre: "Financement et réseaux", description: "Microfinance, appels à projets, solidarité.", dureeHeures: 20, ordre: 4 },
      ],
    },
  ];

  for (const f of filieresData) {
    const { modules, ...filiereData } = f;
    const filiere = await prisma.filiere.upsert({
      where: { slug: filiereData.slug },
      update: {},
      create: filiereData,
    });
    const existingModules = await prisma.module.count({ where: { filiereId: filiere.id } });
    if (existingModules === 0) {
      await prisma.module.createMany({
        data: modules.map((m) => ({ ...m, filiereId: filiere.id })),
      });
    }
  }

  const temoignagesCount = await prisma.temoignage.count();
  if (temoignagesCount === 0) {
    await prisma.temoignage.createMany({
      data: [
        { nom: "Adékpè", prenom: "Marie", filiere: "Commerce & Distribution", promotion: "2024", texte: "SERMA HUB m'a donné les outils pour structurer mon commerce. Aujourd'hui j'ai un vrai point de vente et des fournisseurs fiables. Je recommande à 100%.", resultat: "Boutique ouverte à Parakou", noteEtoiles: 5, publie: true },
        { nom: "Sègbo", prenom: "Jean", filiere: "Agro-Business", promotion: "2024", texte: "La formation en transformation de produits locaux a changé ma vie. Je vends maintenant du gari et de la pâte d'arachide conditionnés aux supermarchés.", resultat: "Entreprise de transformation créée", noteEtoiles: 5, publie: true },
        { nom: "Yessoufou", prenom: "Amina", filiere: "Entrepreneuriat Féminin", promotion: "2024", texte: "En tant que femme, j'avais besoin d'un cadre bienveillant pour oser me lancer. SERMA HUB m'a accompagnée pas à pas. Merci à toute l'équipe.", resultat: "Coopérative de teinture lancée", noteEtoiles: 5, publie: true },
      ],
    });
  }

  await prisma.article.upsert({
    where: { slug: "bienvenue-serma-hub" },
    update: {},
    create: {
      slug: "bienvenue-serma-hub",
      titre: "Bienvenue sur le blog SERMA HUB",
      extrait: "Découvrez nos actualités et conseils pour les entrepreneurs.",
      contenu: "<p>Contenu de l'article...</p>",
      categorie: "Actualités",
      publie: true,
      datePublication: new Date(),
      auteur: "SERMA HUB",
      tags: ["actualités", "formation"],
    },
  });

  await prisma.article.upsert({
    where: { slug: "5-conseils-entrepreneur-debutant" },
    update: {},
    create: {
      slug: "5-conseils-entrepreneur-debutant",
      titre: "5 conseils pour l'entrepreneur débutant",
      extrait: "Les bases pour bien démarrer son projet en Afrique.",
      contenu: "<p>1. Bien connaître son marché. 2. Commencer petit. 3. S'entourer. 4. Gérer sa trésorerie. 5. Persévérer.</p>",
      categorie: "Conseils",
      publie: true,
      datePublication: new Date(),
      auteur: "SERMA HUB",
      tags: ["conseils", "débutant"],
    },
  });

  console.log("Seed terminé : admin, filières, modules, témoignages, articles.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
