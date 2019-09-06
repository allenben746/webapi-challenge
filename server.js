const express = require('express')

const server = express();
server.use(express.json());
server.use(logger);

//Routes
server.use('/projects', projectsRouter)
server.use('/actions', actionsRouter)
//Sanity test
server.get('/', (req, res) => {
  res.status(200).json({message: 'api running!'})
})

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  )
  next();
}

module.exports = server;