const sequelize = require('./database/orm/sequelize');
const app = require('./app');
const AppException = require('./exceptions/exception.app');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Only sync in development
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('Database schema updated successfully.');
    }

    const port = process.env.SERVER_PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Application started on port ${port}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed.');
        sequelize.close().then(() => {
          console.log('Database connection closed.');
          process.exit(0);
        });
      });
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    throw new AppException(error.message || 'Internal Server Error', 500);
  }
})();
