const config = require('./config/config');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('./logger');
const sessionRouter = require('./routes/session');
const mustBeAuthenticated = require('./controllers/mustBeAuthenticated');
const path = require('path');
const views = require('koa-views');
const fs = require('fs');
const cheerio = require('cheerio');
const Validator = require('jsonschema').Validator;

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
// mustBeAuthenticated
router.get('/grades/fetch', async (ctx, next) => {
  const $ = cheerio.load(fs.readFileSync(path.join(__dirname, './views/list.html')));
  const htmlBody = $('body').text();
  const grades = htmlBody
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  console.log(JSON.parse(grades).grades[0]);

  ctx.body = grades;
});

app.use(sessionRouter.routes());
app.use(router.routes());

module.exports = app;
