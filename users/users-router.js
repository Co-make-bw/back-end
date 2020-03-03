const express = require('express');
const router = express.Router();
const Users = require('./users-model');

const middleware = require('../auth/verify-middleware');
const verify = middleware.verifyUser;
// Get all users
router.get('/', (req, res) => {

    Users.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.log(err)
            res.json(500).json(err)
        })
})

// Get user by id
router.get('/:id', verify, (req, res) => {
    const {id} = req.params;

    Users.getById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'Failed to find user with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get user' })
        })
})

// Update user
router.put('/:id', verify, (req, res) => {
    const {id} = req.params;

    Users.update(id, req.body)
        .then(updated => {
            Users.getById(id)
                .then(user => {
                    res.status(201).json(user)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: 'Failed to get user' })
                })
        })
        .catch(err => {
            console.log(err)
        })

})

router.delete('/:id', verify, (req, res) => {
    const {id} = req.params;

    Users.getById(id)
        .then(user => {
            Users.remove(id)
                .then(deleted => {
                    res.status(200).json({message: `You deleted username: ${user.username}`})
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: 'Failed to delete user' })
                })
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to find user' })
        })
})

router.get('/:id/states', verify, (req, res) => {
    const {id} = req.params;

    Users.getStates(id)
        .then(states => {
            if(states.length < 1) {
                res.status(404).json({message: 'User does not follow any states' })
            } else {
                res.status(200).json(states)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to get user states' })
        })
})
module.exports = router;