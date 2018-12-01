
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', (table) => {
      table.increments('id').primary();
      table.string('project_name');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('palettes', (table) => {
      table.increments('id').primary();
      table.string('palette_name');
      table.string('hex1');
      table.string('hex2');
      table.string('hex3');
      table.string('hex4');
      table.string('hex5');
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('project_id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects')
  ]);
};

