exports.up = function(knex) {
	return Promise.all([
	  knex.schema.createTable('users', function(table) {
		table.increments('id').primary();
		table.string('email');
		table.string('password_hash');
		table.string('api_key');

		table.timestamps(true, true);
	  }),

	  knex.schema.createTable('favorites', function(table) {
		table.increments('id').primary();
		table.string('title');
		table.string('artistName');
		table.string('genre').defaultTo("Unknown");
		table.integer('rating');
		table.integer('user_id').unsigned()
		table.foreign('user_id')
		  .references('users.id');

		table.timestamps(true, true);
	  })
	])
  };


  exports.down = function(knex) {
	return Promise.all([
	  knex.schema.dropTable('favorites'),
	  knex.schema.dropTable('users')
	]);
  }
