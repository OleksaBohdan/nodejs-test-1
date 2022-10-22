const logger = require('../logger');
const Router = require('koa-router');
const User = require('../models/User');
const createUser = require('../controllers/createUser');
const createSession = require('../controllers/createSession');

const sessionRouter = new Router({ prefix: '/session' });

sessionRouter.get('/create/', async (ctx, next) => {
  const newUser = await createUser();
  const jwtToken = await createSession(newUser);
  logger.info(`created new user`);
  ctx.body = jwtToken;
});

sessionRouter.get('/create/:id', async (ctx, next) => {
  const id = ctx.params.id;

  const user = await User.findOne({ userId: id });
  if (!user) {
    ctx.status = 404;
    ctx.body = 'user not found';
    return next();
  }

  user.lastVisit = new Date();
  await user.save();

  logger.info(`searched ${user}`);
  ctx.body = user;
});

module.exports = sessionRouter;
