# SERMA HUB – Impact Academy

Site web institutionnel et backoffice pour le centre de formation SERMA HUB (CFPEA Parakou, Bénin).

## Stack

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styles** : Tailwind CSS 3 + tokens de marque SERMA
- **UI** : Composants type shadcn/ui (Radix) + Framer Motion
- **ORM** : Prisma + PostgreSQL
- **Auth** : NextAuth.js v5 (JWT)
- **Paiements** : FedaPay (Bénin/UEMOA)

## Démarrage

1. **Cloner et installer les dépendances**

```bash
npm install --legacy-peer-deps
```

2. **Configurer l'environnement**

```bash
cp .env.example .env.local
```

Renseigner au minimum :

- `DATABASE_URL` : URL PostgreSQL
- `NEXTAUTH_SECRET` : secret pour les sessions (générer avec `openssl rand -base64 32`)
- `NEXTAUTH_URL` : URL du site (ex. `http://localhost:3000`)

3. **Initialiser la base de données**

```bash
npx prisma db push
npm run db:seed
```

4. **Lancer le serveur de développement**

```bash
npm run dev
```

- Site public : http://localhost:3000  
- Connexion backoffice : http://localhost:3000/login  
- Compte seed : `admin@sermahub.org` / `AdminSerma2025!`

## Structure des routes

- **Site public** : `/`, `/filieres`, `/filieres/[slug]`, `/inscription`, `/temoignages`, `/a-propos`, `/contact`, `/blog`, `/devenir-formateur`
- **Auth** : `/login`
- **Backoffice** : `/dashboard`, `/dashboard/apprenants`, `/dashboard/inscriptions`, `/dashboard/paiements`, `/dashboard/filieres`, `/dashboard/formateurs`, `/dashboard/candidatures`, `/dashboard/vagues`, `/dashboard/messages`, `/dashboard/parametres`, etc.

## FedaPay

Pour activer les paiements en ligne :

1. Créer un compte sur [FedaPay](https://fedapay.com).
2. Renseigner dans `.env.local` : `FEDAPAY_SECRET_KEY`, `FEDAPAY_PUBLIC_KEY`, `FEDAPAY_WEBHOOK_SECRET`.
3. Configurer le webhook dans le dashboard FedaPay vers : `https://votredomaine.com/api/webhooks/fedapay`

## Déploiement (Docker)

```bash
docker build -t serma-hub .
docker run -p 3000:3000 --env-file .env serma-hub
```

Le build Next.js utilise `output: "standalone"` pour un binaire autonome.

---

Site conçu par **YEHI OR Tech** – Parakou.  
SERMA HUB – ENTREPRENDRE • INNOVER • IMPACTER.
