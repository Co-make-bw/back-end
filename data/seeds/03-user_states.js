
exports.seed = function(knex) {
      return knex('user_states').insert([
        {user_id: 1, state_id: 21},
        {user_id: 2, state_id: 21},
        {user_id: 2, state_id: 29},
        {user_id: 3, state_id: 21},
        {user_id: 3, state_id: 29},
      ]);
};
