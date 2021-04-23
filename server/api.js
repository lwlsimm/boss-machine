const express = require('express');
const apiRouter = express.Router();

//Minions Router
const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter)

//Ideas Router
const ideasRouter = require('./ideas');
apiRouter.use('/ideas', ideasRouter)

//Meetings Router
const meetingsRouter = require('./meetings');
apiRouter.use('/meetings', meetingsRouter)

module.exports = apiRouter;
