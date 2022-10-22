const User = require('../models/User');

module.exports = async function () {
  const id = (await User.collection.find().count()) + 1;
  const user = new User({ userId: id, lastVisit: new Date() });
  await user.save();

  return user;
};
