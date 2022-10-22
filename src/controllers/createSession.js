const config = require('../config/config');
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');

module.exports = async function (user) {
  const newToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: user.userId,
    },
    config.privateKey
  );

  const session = new Session({ token: newToken, lastVisit: new Date(), user: user });
  await session.save();

  return newToken;
};
