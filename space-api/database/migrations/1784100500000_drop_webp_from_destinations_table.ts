import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'destinations'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('webp')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('webp', 255).notNullable()
    })
  }
}
