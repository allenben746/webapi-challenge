const express = require('express')

const actionDB = require('../data/helpers/actionModel')

const router = express.Router()

//Middleware

//no middleware needed for Actions

//Requests

router.get('/', (req, res) => {
    actionDB.get()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(500).json({ message: 'Error retrieving server data.'})
    })
})

router.post('/', (req, res) => {
    let reqBody = req.body
    actionDB.insert(reqBody)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(error => {
        res.status(500).json({ message: 'Error retrieving server data.'})
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    actionDB.remove(id)
    .then(result => {
        res.status(200).json({message: 'Action removed.'})
    })
    .catch(error => {
        res.status(500).json({ message: 'Error retrieving server data.'})
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const updatedInfo = req.body
    actionDB.update(id, updatedInfo)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(error => {
        res.status(500).json({ message: 'Error retrieving server data.'})
    })
})
module.exports = router