
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments()

        table.string('username', 128)
            .notNullable()
            .unique()

        table.string('password', 128).notNullable()

        table.text('about').notNullable().defaultTo('')

        table.integer('points').notNullable().defaultTo(0)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
