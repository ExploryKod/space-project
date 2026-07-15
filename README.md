# Space Tourism

Site multipage de **tourisme spatial** : présentation des destinations, de l'équipage et des technologies de voyage. Interface en **Next.js** (i18n fr/en), contenu dynamique servi par une **API avec AdonisJS**.

**Note**<br>

Site en cours de fondation.<br>

L'api n'est pas encore relié pleinement au site frontend et surtout **le site frontend en nextjs n'a pas le bon choix d'architecture**. Ici c'est overkill. <br>

**Contexte** : nous l'avions fait avant avec des data dans des fichiers json mais l'idée de départ était de rester sur NextJS. Or en lui ajoutant une api en AdonyJS la question se pose de garder NextJS pour le remplacer par un simple front avec un framework plus adapté.

> Design inspiré du challenge Frontend Mentor *Space tourism website*. Implémentation full-stack personnelle.

## Structure

```text
space-site/   → frontend (Next.js)
space-api/    → backend (AdonisJS)
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
