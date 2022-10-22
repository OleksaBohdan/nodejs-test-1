module.exports = {
  PORT: process.env.PORT || 8080,
  DB: process.env.DB || 'mongodb://127.0.0.1:27017/nodejs-task-1',
  REDIS: process.env.REDIS || 'redis://localhost:6379',
  // it's not secure
  privateKey: 'nodejs-test',
};
