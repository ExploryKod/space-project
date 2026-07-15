import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'destinations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('slug', 50).notNullable()
      table.string('locale', 5).notNullable()

      table.string('name', 100).notNullable()
      table.text('description').notNullable()
      table.string('distance', 50).notNullable()
      table.string('travel', 50).notNullable()
      table.string('image', 255).notNullable()
      table.string('alt', 100).notNullable()

      table.unique(['slug', 'locale'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}