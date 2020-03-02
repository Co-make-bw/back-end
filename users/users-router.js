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
            res.json(500),json(err)
        })
})

router.get('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;