const express = require('express');
const projectsDB = require('../data/helpers/projectModel');
const router = express.Router();

//Middleware

function validatePostId(req, res, next) {
    const id = req.params.id
    postDb.getById(Number(id))
        .then(response => {
            if(response) {
                req.post = response
                next();
            }
            else {
                res.status(400).json({ message: 'Invalid post id'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot fetch post data'})
        })
};

module.exports = router;