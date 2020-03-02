const express = require('express');
const router = express.Router();
const Users = require('./users-model');

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

router.get('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
    const {id} = req.params;

    Users.update(id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            console.log(err)
        })

})

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Users.remove(id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to delete user' })
        })
})

router.get('/:id/states', (req, res) => {
    const {id} = req.params;

    Users.getStates(id)
        .then(states => {
            res.status(200).json(states)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to get user states' })
        })
})

module.exports = router;