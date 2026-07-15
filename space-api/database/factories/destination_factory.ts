import factory from '@adonisjs/lucid/factories'
import Destination from '#models/destination'

type DestinationSeed = {
  slug: string
  locale: string
  name: string
  description: string
  distance: string
  travel: string
  image: string
  alt: string
}

/** Source: space-site/app/i18n/locales/fr/destination.json (items) */
export const frDestinationItems: DestinationSeed[] = [
  {
    slug: 'moon',
    locale: 'fr',
    name: 'Lune',
    description:
      "Découvrez notre planète comme vous ne l'avez jamais vue auparavant. Un voyage parfait et relaxant pour prendre du recul et revenir ressourcé. Une fois sur place, profitez-en pour découvrir l'histoire en visitant les sites d'atterrissage de Luna 2 et d'Apollo 11.",
    distance: '384 400 km',
    travel: '3 jours',
    image: '/destination/image-moon.png',
    alt: 'la lune',
  },
  {
    slug: 'mars',
    locale: 'fr',
    name: 'Mars',
    description:
      "N'oubliez pas d'emporter vos chaussures de randonnée. Vous en aurez besoin pour gravir Olympus Mons, la plus haute montagne planétaire de notre système solaire. Elle mesure deux fois et demie la taille de l'Everest !",
    distance: '225 millions de km',
    travel: '9 mois',
    image: '/destination/image-mars.png',
    alt: 'mars',
  },
  {
    slug: 'europa',
    locale: 'fr',
    name: 'Europa',
    description:
      "La plus petite des quatre lunes galiléennes en orbite autour de Jupiter, Europe est le rêve des amateurs d'hiver. Avec sa surface glacée, c'est l'endroit idéal pour faire du patin à glace, du curling, du hockey, ou simplement se détendre dans votre confortable cabine hivernale.",
    distance: '628 millions de km',
    travel: '3 ans',
    image: '/destination/image-europa.png',
    alt: 'europa',
  },
  {
    slug: 'titan',
    locale: 'fr',
    name: 'Titan',
    description:
      "Seule lune connue à posséder une atmosphère dense en dehors de la Terre, Titan est un vrai chez-soi loin de chez soi (avec juste quelques centaines de degrés en moins !). En bonus, vous profiterez d'une vue spectaculaire sur les anneaux de Saturne.",
    distance: '1,6 milliard de km',
    travel: '7 ans',
    image: '/destination/image-titan.png',
    alt: 'titan',
  },
]

function itemForSlug(slug: string): DestinationSeed {
  const item = frDestinationItems.find((entry) => entry.slug === slug)
  if (!item) {
    throw new Error(`Unknown destination slug: ${slug}`)
  }
  return item
}

export const DestinationFactory = factory
  .define(Destination, async ({ faker }) => {
    return faker.helpers.arrayElement(frDestinationItems)
  })
  .state('moon', () => itemForSlug('moon'))
  .state('mars', () => itemForSlug('mars'))
  .state('europa', () => itemForSlug('europa'))
  .state('titan', () => itemForSlug('titan'))
  .build()
