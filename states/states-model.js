const db = require("../data/connection.js");

module.exports = {
    get,
    getById,
    add,
    addIssue,
    getIssueById,
    getIssues
};

function get() {
    return db('states')
}

function getById(id) {
    return db('states')
        .where({id})
        .first()
}

function add(state) {
    return db('states')
        .insert(state, 'id')
        .then(ids => {
            const [id] = ids;
            return getById(id)
        })
}

function addIssue(state_id, issue) {
    return db('issues')
        .where({state_id})
        .insert(issue, 'id')
        .then(ids => {
            const [id] = ids;

            return getIssueById(id)
        })
}

function getIssueById(id) {
    return db('issues')
        .where({id})
        .first()
}

function getIssues(state_id) {
    return db('issues')
        .join('states', 'issues.state_id', 'states.id')
        .where({state_id: state_id})
}