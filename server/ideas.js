const express = require('express')
const ideasRouter = express.Router();

const checkMillionDollarIdea = require('./checkMillionDollarIdea')
//Helper functions imported from the database
const {createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,} = require('./db')


  //GET /api/ideas to get an array of all ideas.
  ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    //console.log(ideas)
    res.send(ideas)
  })

  //POST /api/ideas to create a new idea and save it to the database.
  ideasRouter.post('/', checkMillionDollarIdea)

  ideasRouter.post('/', (req, res, next) => {
    const newIdea = req.body;
    addToDatabase('ideas', newIdea);
    res.status(201).send(newIdea);
  })
  
  ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = req.idea;
    res.send(idea);
  })

  ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideaId = id;
    const numberOfIds = getAllFromDatabase('ideas').length;
    if(isNaN(ideaId) || ideaId > numberOfIds) {
      const error = new Error('Error')
      error.status = 404
      return next(error);
    }
    const idea = getFromDatabaseById('ideas', id);
    req.idea = idea;
    next()
  })

  

  ideasRouter.put('/:ideaId', checkMillionDollarIdea)

  ideasRouter.put('/:ideaId', (req, res, next) => {
    const revisedIdea = req.body;
    updateInstanceInDatabase('ideas', revisedIdea);
    res.send(revisedIdea)
  })

  ideasRouter.delete('/:ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.idea.id);
    res.status(204).send();
  })

  ideasRouter.use(function (err, req, res, next) {
      const status = err.status
      res.status(status).send(err.message)
  })

  module.exports = ideasRouter;
