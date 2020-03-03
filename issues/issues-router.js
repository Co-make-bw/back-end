const router = require('express').Router();
const Issues = require('./issues-model');

router.get('/', (req, res) => {
    Issues.get()
        .then(issues => {
            res.status(200).json(issues)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to get issues' })
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Issues.getById(id)
        .then(issue => {
            if(issue) {
                res.status(200).json(issue)
            } else {
                res.status(404).json({ message: 'Failed to find issue with given ID' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to get issue' })
        })
})

module.exports = router;