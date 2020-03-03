const db = require("../data/dbConfig");

module.exports = {
    get,
    getById
};

function get() {
    return db('issues')
}

function getById(id) {
    return db('issues')
        .where({id})
        .first()
}