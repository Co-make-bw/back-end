
exports.seed = function(knex) {
      return knex('user_states').insert([
        {user_id: 4, state_id: 21},
        {user_id: 5, state_id: 21},
        {user_id: 5, state_id: 29},
        {user_id: 6, state_id: 21},
        {user_id: 6, state_id: 29},
      ]);
};
