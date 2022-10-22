const { app, runRedis } = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');
const logger = require('./logger');

try {
  runRedis();

  mongoose.connect(config.DB, () => {
    logger.info(`Conencted to MongoDB ${config.DB}`);
    app.listen(config.PORT, async () => {
      logger.info(`App started on port ${config.PORT}`);
    });
  });
} catch (e) {
  logger.info(e.message);
}
