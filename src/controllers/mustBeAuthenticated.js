const config = require('../config/config');
const jwt = require('jsonwebtoken');
const logger = require('../logger');

module.exports = async function (ctx, next) {
  const token = ctx.request.get('Authorization');

  jwt.verify(token, config.privateKey, function (err, decoded) {
    if (err) {
      ctx.body = { err: err.message };
      return;
    }

    return next();
  });
};
