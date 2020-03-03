const Users = require('../users/users-model');
const States = require('../states/states-model');

module.exports.verifyUser = (req, res, next) => {
    const {id} = req.params;

    Users.getById(id)
        .then(user => {
            if(user) {
                next()
            } else {
                res.status(404).json({message: 'User with given ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to find user'})
        })
}

module.exports.verifyState = (req, res, next) => {
    const {id} = req.params;

    States.getById(id)
        .then(state => {
            if(state) {
                next()
            } else {
                res.status(404).json({message: 'State with given ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to find state'})
        })
}

module.exports.verifyIssue = (req, res, next) => {
    const id = req.params.id2

    States.getIssueById(id)
        .then(issue => {
            if(issue) {
                next()
            } else {
                res.status(404).json({message: 'Issue with given ID does not exist' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get issue' })
        })
}