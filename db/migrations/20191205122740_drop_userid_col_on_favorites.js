exports.up = function(knex) {
    return knex.schema.table('favorites', function(t) {
        t.dropColumn('user_id');
    });
};

exports.down = function(knex) {
    return knex.schema.table('favorites', function(t) {
        t.integer('user_id').unsigned()
		t.foreign('user_id')
		  .references('users.id');
    });
};
