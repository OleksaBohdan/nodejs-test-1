const logger = require('pino')({
  name: 'nodejs-task',
  transport: {
    target: 'pino-pretty',
  },
});

module.exports = logger;
