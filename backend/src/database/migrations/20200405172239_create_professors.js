
exports.up = function(knex) {
    return knex.schema.createTable('professors', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('siape').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('professors');
};
