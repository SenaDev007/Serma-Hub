import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Filières
  const filieres = await Promise.all([
    prisma.filiere.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nom: "Commerce & Distribution",
        description: "Maîtrisez les techniques de vente, la gestion des stocks et le développement d'un réseau commercial solide au Bénin et dans la sous-région.",
        iconSlug: "ShoppingCart",
        dureeMois: 4,
        actif: true,
      },
    }),
    prisma.filiere.upsert({
      where: { id: 2 },
      update: {},
      create: {
        nom: "Agro-Business",
        description: "Transformez les ressources agricoles locales en entreprises rentables : transformation, conservation, commercialisation des produits du terroir.",
        iconSlug: "Sprout",
        dureeMois: 4,
        actif: true,
      },
    }),
    prisma.filiere.upsert({
      where: { id: 3 },
      update: {},
      create: {
        nom: "Services Techniques",
        description: "Formez-vous aux métiers techniques porteurs : maintenance électrique, plomberie, soudure, électronique et gestion d'un atelier professionnel.",
        iconSlug: "Wrench",
        dureeMois: 6,
        actif: true,
      },
    }),
    prisma.filiere.upsert({
      where: { id: 4 },
      update: {},
      create: {
        nom: "Digital Local",
        description: "Utilisez le numérique comme levier économique : marketing digital, e-commerce, création de contenu et outils digitaux adaptés au contexte local.",
        iconSlug: "Smartphone",
        dureeMois: 3,
        actif: true,
      },
    }),
    prisma.filiere.upsert({
      where: { id: 5 },
      update: {},
      create: {
        nom: "Entrepreneur Féminin",
        description: "Programme dédié aux femmes entrepreneures : autonomisation financière, gestion de microentreprise, leadership et accès au financement.",
        iconSlug: "Star",
        dureeMois: 4,
        actif: true,
      },
    }),
  ]);

  // Apprenants
  const apprenants = await Promise.all([
    prisma.apprenant.upsert({
      where: { id: 1 },
      update: {},
      create: { nom: "Kone", prenom: "Moussa", telephone: "+229 96 22 33 44", filiereId: 2, statut: "confirme", dateInscription: new Date("2026-01-08") },
    }),
    prisma.apprenant.upsert({
      where: { id: 2 },
      update: {},
      create: { nom: "Ouedraogo", prenom: "Amina", telephone: "+229 95 44 55 66", filiereId: 5, statut: "confirme", dateInscription: new Date("2026-01-09") },
    }),
    prisma.apprenant.upsert({
      where: { id: 3 },
      update: {},
      create: { nom: "Ba", prenom: "Nafissatou", telephone: "+229 93 88 99 00", filiereId: 3, statut: "certifie", dateInscription: new Date("2025-10-03") },
    }),
    prisma.apprenant.upsert({
      where: { id: 4 },
      update: {},
      create: { nom: "Diallo", prenom: "Amadou", telephone: "+229 91 00 11 22", filiereId: 1, statut: "certifie", dateInscription: new Date("2025-10-01") },
    }),
    prisma.apprenant.upsert({
      where: { id: 5 },
      update: {},
      create: { nom: "Sow", prenom: "Ramatou", telephone: "+229 90 22 33 44", filiereId: 4, statut: "confirme", dateInscription: new Date("2026-01-15") },
    }),
    prisma.apprenant.upsert({
      where: { id: 6 },
      update: {},
      create: { nom: "Traoré", prenom: "Seydou", telephone: "+229 89 44 55 66", filiereId: 2, statut: "certifie", dateInscription: new Date("2025-10-05") },
    }),
    prisma.apprenant.upsert({
      where: { id: 7 },
      update: {},
      create: { nom: "Diallo", prenom: "Fatou", telephone: "+229 97 00 11 22", filiereId: 1, statut: "en_attente", dateInscription: new Date("2026-03-08") },
    }),
    prisma.apprenant.upsert({
      where: { id: 8 },
      update: {},
      create: { nom: "Sow", prenom: "Ibrahim", telephone: "+229 92 55 66 77", filiereId: 4, statut: "en_attente", dateInscription: new Date("2026-03-07") },
    }),
    prisma.apprenant.upsert({
      where: { id: 9 },
      update: {},
      create: { nom: "Coulibaly", prenom: "Mariam", telephone: "+229 96 33 44 55", filiereId: 5, statut: "confirme", dateInscription: new Date("2026-01-12") },
    }),
    prisma.apprenant.upsert({
      where: { id: 10 },
      update: {},
      create: { nom: "Touré", prenom: "Sidi", telephone: "+229 94 77 88 99", filiereId: 3, statut: "confirme", dateInscription: new Date("2026-01-10") },
    }),
  ]);

  // Paiements
  await Promise.all([
    prisma.paiement.upsert({ where: { id: 1 }, update: {}, create: { apprenantId: 1, montant: 87500, methode: "mobile_money", statut: "paye", datePaiement: new Date("2026-01-08") } }),
    prisma.paiement.upsert({ where: { id: 2 }, update: {}, create: { apprenantId: 2, montant: 50000, methode: "especes", statut: "paye", datePaiement: new Date("2026-01-09") } }),
    prisma.paiement.upsert({ where: { id: 3 }, update: {}, create: { apprenantId: 3, montant: 155000, methode: "mobile_money", statut: "paye", datePaiement: new Date("2025-10-03") } }),
    prisma.paiement.upsert({ where: { id: 4 }, update: {}, create: { apprenantId: 4, montant: 150000, methode: "virement", statut: "paye", datePaiement: new Date("2025-10-01") } }),
    prisma.paiement.upsert({ where: { id: 5 }, update: {}, create: { apprenantId: 5, montant: 41666, methode: "mobile_money", statut: "en_attente", datePaiement: new Date("2026-01-15") } }),
    prisma.paiement.upsert({ where: { id: 6 }, update: {}, create: { apprenantId: 6, montant: 175000, methode: "especes", statut: "paye", datePaiement: new Date("2025-10-05") } }),
    prisma.paiement.upsert({ where: { id: 7 }, update: {}, create: { apprenantId: 9, montant: 50000, methode: "mobile_money", statut: "paye", datePaiement: new Date("2026-01-12") } }),
    prisma.paiement.upsert({ where: { id: 8 }, update: {}, create: { apprenantId: 10, montant: 77500, methode: "especes", statut: "paye", datePaiement: new Date("2026-01-10") } }),
  ]);

  // Messages
  await Promise.all([
    prisma.message.upsert({ where: { id: 1 }, update: {}, create: { nom: "Fatou Diallo", telephone: "+229 97 00 11 22", sujet: "Inscription Commerce", contenu: "Bonjour, je voudrais m'inscrire à la filière Commerce & Distribution. Est-il encore possible de rejoindre la promo de janvier ?", lu: false } }),
    prisma.message.upsert({ where: { id: 2 }, update: {}, create: { nom: "Oumar Diop", email: "oumar@ong-beninoise.org", sujet: "Partenariat ONG", contenu: "Nous sommes une ONG spécialisée dans l'autonomisation des femmes au Bénin. Nous aimerions explorer un partenariat avec SERMA HUB.", lu: false } }),
    prisma.message.upsert({ where: { id: 3 }, update: {}, create: { nom: "Mariam Coulibaly", telephone: "+229 95 33 44 55", sujet: "Demande d'info paiement", contenu: "Est-ce que je peux payer en 3 fois pour la filière Agro-Business ? Quel est le montant exact de chaque mensualité ?", lu: true } }),
    prisma.message.upsert({ where: { id: 4 }, update: {}, create: { nom: "Sidi Touré", email: "sidi.toure@gmail.com", sujet: "Candidature formateur", contenu: "Je suis formateur en techniques de vente avec 8 ans d'expérience. Je suis intéressé par un poste de formateur SERMA HUB.", lu: true } }),
    prisma.message.upsert({ where: { id: 5 }, update: {}, create: { nom: "Aïcha Camara", telephone: "+229 93 77 88 99", sujet: "Question sur les horaires", contenu: "Bonjour, je travaille le matin. Y a-t-il des cours en soirée ou le week-end ?", lu: true } }),
  ]);

  // Partenaires
  await Promise.all([
    prisma.partenaire.upsert({ where: { id: 1 }, update: {}, create: { nom: "ANPE Bénin", actif: true } }),
    prisma.partenaire.upsert({ where: { id: 2 }, update: {}, create: { nom: "Mairie de Parakou", actif: true } }),
    prisma.partenaire.upsert({ where: { id: 3 }, update: {}, create: { nom: "Chambre de Commerce Bénin", actif: true } }),
    prisma.partenaire.upsert({ where: { id: 4 }, update: {}, create: { nom: "ONG FADES", actif: true } }),
    prisma.partenaire.upsert({ where: { id: 5 }, update: {}, create: { nom: "FNPEEJ", actif: true } }),
    prisma.partenaire.upsert({ where: { id: 6 }, update: {}, create: { nom: "Microfinance CLCAM", actif: true } }),
  ]);

  // Équipe
  await Promise.all([
    prisma.membreEquipe.upsert({ where: { id: 1 }, update: {}, create: { prenom: "Sènakpon", nom: "Hounsou", role: "Fondateur & Directeur Pédagogique", description: "Entrepreneur et formateur passionné, il a fondé SERMA HUB avec la vision de transformer l'économie locale par la formation pratique.", initiales: "SH", actif: true } }),
    prisma.membreEquipe.upsert({ where: { id: 2 }, update: {}, create: { prenom: "Rachida", nom: "Alabi", role: "Responsable Filière Commerce", description: "Experte en commerce et distribution avec 10 ans d'expérience terrain dans la sous-région ouest-africaine.", initiales: "RA", actif: true } }),
    prisma.membreEquipe.upsert({ where: { id: 3 }, update: {}, create: { prenom: "Kofi", nom: "Mensah", role: "Formateur Agro-Business", description: "Agronome de formation, il accompagne les jeunes dans la valorisation des filières agricoles béninoises.", initiales: "KM", actif: true } }),
    prisma.membreEquipe.upsert({ where: { id: 4 }, update: {}, create: { prenom: "Aïssatou", nom: "Barry", role: "Coordinatrice Programme Féminin", description: "Militante pour l'autonomisation économique des femmes, elle pilote le programme Entrepreneur Féminin.", initiales: "AB", actif: true } }),
  ]);

  // Stats
  await Promise.all([
    prisma.stat.upsert({ where: { cle: "apprenants_formes" }, update: { valeur: "340" }, create: { cle: "apprenants_formes", valeur: "340" } }),
    prisma.stat.upsert({ where: { cle: "filieres_actives" }, update: { valeur: "5" }, create: { cle: "filieres_actives", valeur: "5" } }),
    prisma.stat.upsert({ where: { cle: "partenaires" }, update: { valeur: "12" }, create: { cle: "partenaires", valeur: "12" } }),
    prisma.stat.upsert({ where: { cle: "taux_insertion" }, update: { valeur: "78" }, create: { cle: "taux_insertion", valeur: "78" } }),
    prisma.stat.upsert({ where: { cle: "duree_formation" }, update: { valeur: "3-6" }, create: { cle: "duree_formation", valeur: "3-6" } }),
  ]);

  console.log("✅ Seed terminé avec succès");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
