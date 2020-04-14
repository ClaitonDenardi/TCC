
exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table){
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('holder');

        table.string('professor_id').notNullable();
        table.foreign('professor_id').references('id').inTable('professors');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects');

};
