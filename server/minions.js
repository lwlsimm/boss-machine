const express = require('express')
const minionsRouter = express.Router();

//Helper functions imported from the database
const {createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,} = require('./db')

//Displays all minions on the front minions page
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions)
})

//Create a new minions
minionsRouter.post('/', (req, res, next) => {
  const newId = getAllFromDatabase('minions').length + 1;
  const minion = req.body;
  minion.id = newId;
  addToDatabase('minions', minion);
  res.status(201).send(minion);
})

//Getting a single minion from the database
minionsRouter.param('minionId', (req, res, next, id) => {
  const numberOfIds = getAllFromDatabase('minions').length;
  const minionId = id;
  
  if(isNaN(minionId) || minionId > numberOfIds) {
    const error = new Error('Error')
    return next(error);
  }

  const minion = getFromDatabaseById('minions', id);
  req.minion = minion;
  next()
});

minionsRouter.get('/:minionId', (req, res, next) => {
  const minion = req.minion;
  res.send(minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  const newMinion = req.body;
  updateInstanceInDatabase('minions', newMinion);
  res.send(newMinion)
})

minionsRouter.delete('/:minionId', (req, res, next) => {
  deleteFromDatabasebyId('minions', req.minion.id);
  res.status(204).send();
})

minionsRouter.use(function (err, req, res, next) {
  res.status(404).send(err.message)
})

module.exports = minionsRouter;