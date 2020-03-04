const db = require('../data/dbConfig');

module.exports = {
    add,
    get,
    getBy,
    getById,
    update,
    remove,
    getStates,
    addUserState,
    getUserState,
    removeUserState
}

function get() {
    return db('users').select('id', 'username', 'points', 'about').orderBy('id')
}

function getBy(filter) {
    return db('users')
        .where(filter)
}

function getById(id) {
    return db('users')
        .where({ id })
        .first()
        .select('id', 'username', 'points', 'about')
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
        .select('states.name as state', 'user_states.state_id')
}

function addUserState(user_id, state) {
    return db('user_states')
        .insert({user_id: user_id, state_id: state})
        .then(res => {
            
            return getStates(user_id)
        })
}

function getUserState(user_id, state_id) {
    return db('user_states')
        .join('states', 'user_states.state_id', 'states.id')
        .join('users', 'user_states.user_id', 'users.id')
        .where({user_id, state_id})
        .select('states.name as state', 'user_states.state_id',)
        .first()
}

function removeUserState(user_id, state_id) {
    return db('user_states')
        .where({user_id, state_id})
        .del()
}