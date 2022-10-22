const Koa = require('koa');
const Router = require('koa-router');
const logger = require('./logger');
const Session = require('./models/Session');
const jwt = require('jsonwebtoken');
const config = require('./config/config');

const app = new Koa();
app.use(require('koa-bodyparser')());
const router = new Router();

app.use(async (ctx, next) => {
  logger.info();
  next();
});

router.get('/ping', async (ctx, next) => {
  ctx.body = 'ok';
});

router.get('/session', async (ctx, next) => {
  // const token = await jwt.sign(
  //   {
  //     exp: Math.floor(Date.now() / 1000) + 60,
  //     data: 'foobar',
  //   },
  //   'secret'
  // );

  const token = '3';
  await Session.create({ token: token, lastVisit: new Date() });

  ctx.status = 200;
  ctx.body = 'token';

  logger.info(typeof token);
});

app.use(router.routes());

module.exports = app;
