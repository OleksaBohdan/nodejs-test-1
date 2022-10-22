const config = require('./config/config');
const User = require('./models/User');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const sessionRouter = require('./routes/session');
const mustBeAuthenticated = require('./controllers/mustBeAuthenticated');
const path = require('path');
const views = require('koa-views');
const fs = require('fs');
const cheerio = require('cheerio');
const Validator = require('jsonschema').Validator;
const getGrades = require('./services/getGrades');

const app = new Koa();
const render = views(path.join(__dirname, './views'));
const router = new Router();

app.use(require('koa-bodyparser')());
app.use(render);

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

app.use(async (ctx, next) => {
  const token = ctx.request.get('Authorization');
  jwt.verify(token, config.privateKey, function (err, decoded) {
    if (err) {
      return;
    }
    console.log('decoded.data', decoded.data);
    ctx.userId = decoded.data;
  });
  return next();
});

router.get('/grades/fetch', mustBeAuthenticated, async (ctx, next) => {
  const id = ctx.userId;
  console.log('id', id);
  const user = await User.findOne({ userId: id });
  console.log('user', user);

  const $ = cheerio.load(fs.readFileSync(path.join(__dirname, './views/list.html')));
  const htmlBody = $('body').text();
  const grades = htmlBody
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  const gradesObj = JSON.parse(grades).grades;
  gradesObj.forEach((obj) => {
    user.courses.push(obj.name);
  });

  await user.save();

  ctx.body = grades;
});

app.use(sessionRouter.routes());
app.use(router.routes());

module.exports = app;
