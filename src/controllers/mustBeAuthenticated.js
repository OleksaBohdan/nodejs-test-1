const logger = require('../logger');

module.exports = async function (ctx, next) {
  if (!ctx.userId) {
    ctx.status = 400;
    ctx.body = { message: 'user not authorised' };
    return;
  }
  return next();
};
