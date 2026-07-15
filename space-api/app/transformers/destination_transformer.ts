import type Destination from '#models/destination'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class DestinationTransformer extends BaseTransformer<Destination> {
  toObject() {
    return this.pick(this.resource, [
      'slug',
      'name',
      'description',
      'distance',
      'travel',
      'image',
      'alt',
    ])
  }
}
