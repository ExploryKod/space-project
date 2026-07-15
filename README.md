# Space Tourism

Site multipage de **tourisme spatial** : présentation des destinations, de l'équipage et des technologies de voyage. Interface en **Next.js** (i18n fr/en), contenu dynamique servi par une **API REST AdonisJS**.

> Design inspiré du challenge Frontend Mentor *Space tourism website*. Implémentation full-stack personnelle.

## Structure

```text
space-site/   → frontend (Next.js)
space-api/    → backend (AdonisJS, API REST)
```

## Prérequis

- Node.js 20+
- [pnpm](https://pnpm.io) (frontend)
- npm (backend)

## Backend (`space-api`)

```bash
cd space-api
cp .env.example .env
npm install
node ace generate:key    # copier la clé dans APP_KEY du .env
node ace migration:run
node ace db:seed
npm run dev
```

API : [http://localhost:3333](http://localhost:3333)  
Exemple : `GET /api/v1/destinations?lng=fr`

### Documentation API

En attendant la mise en place d'une documentation interactive (Swagger / OpenAPI), les routes sont décrites manuellement dans [`docs/api/`](docs/api/) :

- [Destinations](docs/api/api.destination.md)

## Frontend (`space-site`)

```bash
cd space-site
corepack enable
cp .env.example .env
pnpm install
pnpm dev
```

Site : [http://localhost:3000](http://localhost:3000)

## Lancer le projet en local

Deux terminaux :

1. `space-api` → `npm run dev`
2. `space-site` → `pnpm dev`
