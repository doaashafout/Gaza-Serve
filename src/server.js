const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 

const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 4242;
const USE_MONGODB = process.env.USE_MONGODB === 'true' && process.env.MONGO_URI;

const start = async () => {
  try {
    if (USE_MONGODB) {
      const dbConnection = require('./config/db');
      await dbConnection();
      logger.info('Running with MongoDB');
    } else {
      logger.info('Running with JSON file storage');
    }

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info('API available at: http://localhost:' + PORT);
    });
  } catch (err) {
    logger.error('Failed to start server', { error: err.message });
    process.exit(1);
  }
};

start();
