const db = require("../data/connection.js");

module.exports = {
    get,
    getById
};

function get() {
    return db('states')
}

function getById(id) {
    return db('states')
        .where({id})
        .first()
}