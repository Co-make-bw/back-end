
exports.up = function(knex) {
    return knex.schema.createTable('issues', table => {
        table.increments('id')

        table.string('title', 128)
            .notNullable()

        table.string('description', 250)
            .notNullable()

        table.string('location', 250)
            .notNullable()

        table.integer('upvotes').defaultTo(0)

        table.timestamp('created_at').defaultTo(knex.fn.now())

        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

        table.integer('state_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('states')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('issues')
};
