
exports.up = function(knex) {
    return knex.schema.createTable('user_states', table => {
        table.primary(['user_id', 'state_id'])

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
    return knex.schema.dropTableIfExists('user_states');
};
