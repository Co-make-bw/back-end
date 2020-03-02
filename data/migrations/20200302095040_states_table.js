
exports.up = function(knex) {
    return knex.schema.createTable('states', table => {
        table.increments()

        table.string('name', 128)
            .notNullable()
            .unique()
            .index();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('states');
};
