exports.up = function(knex) {
    return knex.schema.table('favorites', function(t) {
        t.integer('playlist_id').unsigned()
		t.foreign('playlist_id')
		  .references('playlists.id');
    });
};

exports.down = function(knex) {
    return knex.schema.table('favorites', function(t) {
        t.dropColumn('playlist_id');
    });
};