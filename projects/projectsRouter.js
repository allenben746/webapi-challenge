const express = require('express');

const projectsDB = require('../data/helpers/projectModel');

const router = express.Router();

//Middleware

function confirmProjectID(req, res, next) {
    const id = req.params.id
    postDb.getById(Number(id))
        .then(response => {
            if(response) {
                req.post = response
                next();
            }
            else {
                res.status(400).json({ message: 'ID does not exist - please try again.'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error retrieving server data.'})
        })
};

function confirmProject(req, res, next) {
    const project = req.body;
    console.log(project)
    if(!project.name) {
        res.status(400).json({message: "Name is required."})
    } else if(!project.description) {
        res.status(400).json({message: "Description is required."})
    } else if(!project){
        res.status(400).json({message: "Data of project is required."})
    } else {
        next();
    }
}

//Requests

router.get('/:id',confirmProjectID, (req, res) => {
    const id = req.params.id;
    projectsDB.get(id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.post('/', confirmProject, (req, res) => {
    const project = req.body;
    projectsDB.insert(project)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({ message: 'Error retrieving server data.'})
    })
})

router.put('/:id', confirmProjectID, confirmProject, (req, res) => {
    const id = req.params.id
    const project = req.body;
    projectsDB.update(id, project)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({ message: 'Error retrieving server data.'})
    })
})

module.exports = router;