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
    removeUserState,
    getUserIssues,
    getUserIssue
}

function get() {
    return db('users').select('id', 'username', 'points', 'about').orderBy('id')
}

function getBy(filter) {
    return db('users')
        .where(filter)
        .first()
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

function getUserIssues(user_id) {
    return db('issues')
        .join('users', 'issues.user_id', 'users.id')
        .select('issues.id', 'issues.title', 'issues.description', 'issues.location', 'issues.upvotes', 'issues.user_id', 'issues.created_at', 'issues.updated_at', 'users.username as posted_by')
        .where({user_id})
}

function getUserIssue(user_id, issue_id) {
    return db('issues')
        .where({'issues.id': issue_id, 'users.id': user_id})
        .join('users', 'issues.user_id', 'users.id')
        .select('issues.id', 'issues.title', 'issues.description', 'issues.location', 'issues.upvotes', 'issues.user_id', 'issues.created_at', 'issues.updated_at', 'users.username as posted_by')
        .first()
}
