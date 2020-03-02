const db = require('../data/dbConfig');

module.exports = {
    add,
    get,
    getBy,
    getById,
    update,
    remove,
    getStates,
    // addState
}

function get() {
    return db('users').select('id', 'username', 'points', 'about');
}

function getBy(filter) {
    return db('users').where(filter)
}

function getById(id) {
    return db('users')
        .where({ id })
        .first();
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id')

    return getById(id);
}

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('users')
        .where({id})
        .del()
}

function getStates(user_id) {
    return db('user_states')
        .join('states', 'user_states.state_id', 'states.id')
        .join('users', 'user_states.user_id', 'users.id')
        .where({user_id: user_id})
}

// function addState(state_id) {
//     return db('user_states')
// }