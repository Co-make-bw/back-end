const db = require("../data/dbConfig");

module.exports = {
    get,
    getById,
    add,
    addIssue,
    getIssueById,
    getIssues,
    removeIssue,
    updateIssue
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
        .join('users', 'issues.user_id', 'users.id')
        .where({state_id: state_id})
        .select('issues.id', 'issues.title', 'issues.description', 'issues.location', 'issues.upvotes', 'issues.user_id', 'issues.created_at', 'issues.updated_at', 'users.username as posted_by')
}

function removeIssue(id) {
    return db('issues')
        .where({id})
        .del()
}

function updateIssue(id, changes) {
    return db('issues')
        .where({id})
        .update(changes)
}