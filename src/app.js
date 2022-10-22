const config = require('./config/config');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('./logger');
const sessionRouter = require('./routes/session');
const mustBeAuthenticated = require('./controllers/mustBeAuthenticated');
const Session = require('./models/Session');
const User = require('./models/User');
const createSession = require('./controllers/createSession');

const app = new Koa();
app.use(require('koa-bodyparser')());
const router = new Router();

app.use(async (ctx, next) => {
  logger.info();
  return next();
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = { error: err.message };
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = { error: err.message };
    }
  }
});

router.get('/grades/fetch', mustBeAuthenticated, async (ctx, next) => {
  ctx.body = 'grades/fetch';
});

app.use(sessionRouter.routes());
app.use(router.routes());

module.exports = app;
