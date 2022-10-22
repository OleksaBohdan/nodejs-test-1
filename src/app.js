const Koa = require('koa');
const Router = require('koa-router');
const logger = require('./logger');
const Session = require('./models/Session');

const app = new Koa();
app.use(require('koa-bodyparser')());

const router = new Router();

app.use(async (ctx, next) => {
  logger.info();
});

router.get('/session', async (ctx, next) => {
  const token = '123';

  await Session.create({ token: token, lastVisit: new Date() });

  ctx.body = token;
});

app.use(router.routes());

module.exports = app;
