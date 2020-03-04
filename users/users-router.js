const express = require('express');
const router = express.Router();
const Users = require('./users-model');
const States = require('../states/states-model')

const middleware = require('../auth/verify-middleware');
const verifyUser = middleware.verifyUser;

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
router.get('/:id', verifyUser, (req, res) => {
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
router.put('/:id', verifyUser, (req, res) => {
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

// Delete user
router.delete('/:id', verifyUser, (req, res) => {
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

// Get user states
router.get('/:id/states', verifyUser, (req, res) => {
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

// Add state to user
router.post('/:id/states', verifyUser, (req, res) => {
    const user_id = req.params.id;
    
    Users.addUserState(user_id, req.body.state_id)
        .then(states => {
            res.status(200).json(states)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to add state to user' })
        })
})
// Get a users state by id
router.get('/:id/states/:id2', verifyUser, (req, res) => {
    const user_id = req.params.id;
    const state_id = req.params.id2;
    
    States.getById(state_id)
        .then(state => {
            if(state) {
                Users.getUserState(user_id, state_id)
                    .then(user_state => {
                        if(user_state) {
                            res.status(200).json(user_state)
                        } else {
                            res.status(404).json({message: `User does not belong to ${state.name}`})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: 'Failed to get user state' })
                    })
            } else {
                res.status(404).json({message: 'State with given ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to find state'})
        })
})

router.delete('/:id/states/:id2', verifyUser, (req, res) => {
    const user_id = req.params.id;
    const state_id = req.params.id2;

    States.getById(state_id)
        .then(state => {
            if(state) {
                Users.removeUserState(user_id, state_id)
                    .then(state => {
                        res.status(200).json(state)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: 'Failed to remove user state' })
                    })
            } else {
                res.status(404).json({message: 'State with given ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to find state'})
        })
})

module.exports = router;