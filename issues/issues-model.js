const db = require("../data/connection.js");

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