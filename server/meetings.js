const express = require('express')
const meetingsRouter = express.Router();

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db')


meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
  let newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

//BOTTOM OF PAGE
meetingsRouter.use(function (err, req, res, next) {
  res.status(404).send(err.message)
})

module.exports = meetingsRouter;