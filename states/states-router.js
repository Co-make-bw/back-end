const router = require('express').Router();

const States = require('./states-model');

router.get('/', (req, res) => {
    States.get()
        .then(states => {
            res.status(200).json(states)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error getting states' })
        })
})

// router.post('/', (req, res) => {
//     let newState = req.body;

//     States.add(newState)
//         .then(state => {
//             res.status(201).json(state)
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({ message: 'Failed to add state' })
//         })
// })

router.get('/:id', (req, res) => {
    const {id} = req.params;
    console.log(req.decodedToken.subject)

    States.getById(id)
        .then(state => {
            res.status(200).json(state)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get state'})
        })
})

router.get('/:id/issues', (req, res) => {
    const {id} = req.params;

    States.getIssues(id)
        .then(issues => {
            res.status(200).json(issues)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get issues' })
        })

})

router.get('/:id/issues/:id2', (req, res) => {
    const id = req.params.id2
    States.getIssueById(id)
        .then(issue => {
            res.status(200).json(issue)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get issue' })
        })
})

router.post('/:id/issues', (req, res) => {
    req.body.state_id = req.params.id;
    req.body.user_id = req.decodedToken.subject

    States.addIssue(req.params.id, req.body)
        .then(issue => {
            res.status(201).json(issue)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Failed to add issue' })
        })
})

router.delete('/:id/issues/:id2', (req, res) => {
    const id = req.params.id2;

    States.removeIssue(id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to remove issue' })
        })
})

router.put('/:id/issues/:id2', (req, res) => {
    const id = req.params.id2;

    States.updateIssue(id, req.body)
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to edit issue' })
        })
})

module.exports = router;