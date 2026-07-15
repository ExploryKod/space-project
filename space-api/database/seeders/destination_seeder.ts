import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Destination from '#models/destination'
import { frDestinationItems } from '#database/factories/destination_factory'

export default class extends BaseSeeder {
  async run() {
    for (const item of frDestinationItems) {
      await Destination.updateOrCreate(
        { slug: item.slug, locale: item.locale },
        item,
      )
    }
  }
}
