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

## Déploiement sur Vercel

1. **Importer le projet** sur [vercel.com](https://vercel.com) (GitHub / GitLab / Bitbucket).

2. **Base de données** : utiliser un PostgreSQL compatible serverless avec pooler de connexions :
   - [Vercel Postgres](https://vercel.com/storage/postgres)
   - [Neon](https://neon.tech) (option « connection pooling »)
   - [Supabase](https://supabase.com)

   Copier l’URL de connexion (avec paramètres de pool si proposés) dans les variables d’environnement.

3. **Variables d’environnement** (à configurer dans Vercel → Project → Settings → Environment Variables) :

   | Variable | Description | Exemple |
   |----------|-------------|---------|
   | `DATABASE_URL` | URL PostgreSQL (avec pooler pour serverless) | `postgresql://...?pgbouncer=true` |
   | `NEXTAUTH_SECRET` | Secret pour les sessions JWT | `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | URL publique du site | `https://ton-projet.vercel.app` |
   | `FEDAPAY_SECRET_KEY` | Clé secrète FedaPay | (optionnel) |
   | `FEDAPAY_PUBLIC_KEY` | Clé publique FedaPay | (optionnel) |
   | `FEDAPAY_WEBHOOK_SECRET` | Secret webhook FedaPay | (optionnel) |
   | `RESEND_API_KEY` | Envoi d’emails | (optionnel) |
   | `NEXT_PUBLIC_SITE_URL` | URL du site (emails, liens) | `https://ton-projet.vercel.app` |

   **Important** : après le premier déploiement, mettre à jour `NEXTAUTH_URL` et `NEXT_PUBLIC_SITE_URL` avec l’URL réelle (ex. domaine personnalisé).

4. **Install** : le projet utilise `installCommand: "npm install --legacy-peer-deps"` (voir `vercel.json`). Aucune action à faire côté interface si `vercel.json` est commité.

5. **Migrations Prisma** : exécuter en local (ou dans un job CI) puis pousser le schéma :
   ```bash
   npx prisma migrate deploy
   # ou
   npx prisma db push
   npm run db:seed
   ```
   Vercel ne lance pas les migrations automatiquement ; il faut une base déjà à jour.

6. **Webhook FedaPay** : une fois le domaine en production connu, configurer l’URL du webhook dans le dashboard FedaPay : `https://ton-domaine.com/api/webhooks/fedapay`.

---

## Déploiement (Docker)

Pour un déploiement autonome (VPS, etc.) :

```bash
DOCKER_BUILD=1 docker build -t serma-hub .
docker run -p 3000:3000 --env-file .env serma-hub
```

Avec `DOCKER_BUILD=1`, le build Next.js produit un output `standalone`.

---

Site conçu par **YEHI OR Tech** – Parakou.  
SERMA HUB – ENTREPRENDRE • INNOVER • IMPACTER.
