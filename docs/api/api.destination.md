# API — Destinations

## Domaine métier

Les **destinations** représentent les lieux de voyage proposés par l'agence de tourisme spatial (Lune, Mars, Europa, Titan). Chaque destination expose des informations de présentation : nom, description, distance moyenne, durée estimée du voyage et visuels.

Le contenu est **localisé** (`en`, `fr`) : une même destination existe sous plusieurs langues avec des textes adaptés, tout en partageant le même identifiant (`slug`) et les mêmes chemins d'images.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| Base URL (dev) | `http://localhost:3333` |
| Préfixe | `/api/v1` |
| Authentification | Aucune (routes publiques) |
| Format | `application/json` |
| Enveloppe de réponse | `{ "data": ... }` |

---

## Schéma : `Destination`

| Champ | Type | Description |
|-------|------|-------------|
| `slug` | `string` | Identifiant stable (`moon`, `mars`, `europa`, `titan`) |
| `name` | `string` | Nom affiché |
| `description` | `string` | Texte descriptif |
| `distance` | `string` | Distance moyenne (ex. `384,400 km`) |
| `travel` | `string` | Durée estimée du voyage (ex. `3 days`) |
| `image` | `string` | Chemin de l'image PNG (servie par le frontend) |
| `alt` | `string` | Texte alternatif de l'image |

---

## Paramètre commun : locale

| Paramètre | Emplacement | Requis | Défaut | Valeurs |
|-----------|-------------|--------|--------|---------|
| `lng` | query | Non | `en` | `en`, `fr` |
| `locale` | query | Non | `en` | `en`, `fr` (alias de `lng`) |

Si `lng` et `locale` sont fournis, **`lng` est prioritaire**.

---

## `GET /api/v1/destinations`

Liste toutes les destinations pour une locale donnée, dans l'ordre : Moon → Mars → Europa → Titan.

### Paramètres

| Nom | In | Type | Requis | Description |
|-----|-----|------|--------|-------------|
| `lng` | query | `string` | Non | Langue du contenu (`en`, `fr`) |
| `locale` | query | `string` | Non | Alias de `lng` |

### Réponses

**200 OK**

```json
{
  "data": [
    {
      "slug": "moon",
      "name": "Moon",
      "description": "See our planet as you've never seen it before...",
      "distance": "384,400 km",
      "travel": "3 days",
      "image": "/destination/image-moon.png",
      "alt": "the moon"
    }
  ]
}
```

**400 Bad Request** — locale non supportée

```json
{
  "error": "Unsupported locale \"de\". Use one of: en, fr"
}
```

### Exemple

```bash
curl "http://localhost:3333/api/v1/destinations?lng=fr"
```

---

## `GET /api/v1/destinations/{slug}`

Retourne une destination par son identifiant et sa locale.

### Paramètres

| Nom | In | Type | Requis | Description |
|-----|-----|------|--------|-------------|
| `slug` | path | `string` | Oui | `moon`, `mars`, `europa`, `titan` |
| `lng` | query | `string` | Non | Langue du contenu (`en`, `fr`) |
| `locale` | query | `string` | Non | Alias de `lng` |

### Réponses

**200 OK**

```json
{
  "data": {
    "slug": "moon",
    "name": "Lune",
    "description": "Découvrez notre planète comme vous ne l'avez jamais vue...",
    "distance": "384 400 km",
    "travel": "3 jours",
    "image": "/destination/image-moon.png",
    "alt": "la lune"
  }
}
```

**400 Bad Request** — locale non supportée (même format que ci-dessus)

**404 Not Found** — combinaison `slug` + locale introuvable

### Exemple

```bash
curl "http://localhost:3333/api/v1/destinations/moon?lng=fr"
```

---

## Notes

- Les images (`image`) sont des chemins relatifs ; le frontend Next.js les sert depuis `/public`.
- Les champs internes (`id`, `locale`, `createdAt`, `updatedAt`) ne sont **pas** exposés par l'API.
- Après `node ace db:seed`, vérifier que les locales souhaitées sont bien présentes en base (`lng=fr` et `lng=en`).
