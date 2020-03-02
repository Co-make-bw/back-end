const db = require('../data/dbConfig');

module.exports = {
    add,
    get,
    getBy,
    getById
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
    const [id] = await db('user').intersect(user)

    return getById(id)
}