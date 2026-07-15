import Destination from '#models/destination'
import DestinationTransformer from '#transformers/destination_transformer'
import type { HttpContext } from '@adonisjs/core/http'

const SUPPORTED_LOCALES = ['en', 'fr'] as const
const DEFAULT_LOCALE = 'en'
const DESTINATION_ORDER = ['moon', 'mars', 'europa', 'titan'] as const

function readLocaleInput(request: HttpContext['request']) {
  return request.input('lng') ?? request.input('locale')
}

function isSupportedLocale(value: string): value is (typeof SUPPORTED_LOCALES)[number] {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

export default class DestinationsController {
  /**
   * GET /api/v1/destinations?lng=en
   */
  async index({ request, response, serialize }: HttpContext) {
    const rawLocale = readLocaleInput(request)

    if (rawLocale && !isSupportedLocale(rawLocale)) {
      return response.badRequest({
        error: `Unsupported locale "${rawLocale}". Use one of: ${SUPPORTED_LOCALES.join(', ')}`,
      })
    }

    const locale = rawLocale ?? DEFAULT_LOCALE

    const destinations = await Destination.query()
      .where('locale', locale)
      .orderByRaw(
        `CASE slug ${DESTINATION_ORDER.map((slug, index) => `WHEN '${slug}' THEN ${index + 1}`).join(' ')} ELSE 99 END`,
      )

    return serialize(DestinationTransformer.transform(destinations))
  }

  /**
   * GET /api/v1/destinations/:slug?lng=en
   */
  async show({ params, request, response, serialize }: HttpContext) {
    const rawLocale = readLocaleInput(request)

    if (rawLocale && !isSupportedLocale(rawLocale)) {
      return response.badRequest({
        error: `Unsupported locale "${rawLocale}". Use one of: ${SUPPORTED_LOCALES.join(', ')}`,
      })
    }

    const locale = rawLocale ?? DEFAULT_LOCALE

    const destination = await Destination.query()
      .where('slug', params.slug)
      .where('locale', locale)
      .firstOrFail()

    return serialize(DestinationTransformer.transform(destination))
  }
}
