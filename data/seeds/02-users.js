
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Mario', password: 'peach', about: 'I enjoy long walks on the beach.', points: 0},
        {id: 2, username: 'Sara', password: 'sara', about: 'I travel all around the United States looking for adventure', points: 0},
        {id: 3, username: 'Bob', password: 'bobbo', about: 'I drive my Miata up and down the east coast weekly.', points: 0},
      ]);
};
