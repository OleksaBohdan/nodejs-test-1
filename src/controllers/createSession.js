const config = require('../config/config');
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');

module.exports = async function (user) {
  const newToken = jwt.sign({ data: user.userId }, config.privateKey, { expiresIn: 60 });

  const session = new Session({ token: newToken, lastVisit: new Date(), user: user });
  await session.save();

  return newToken;
};
