const sequelize = require('./database/orm/sequelize');
const app = require('./app');
const AppException = require('./exceptions/exception.app');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await sequelize.sync({ alter: true }); //update table if necessary
    const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () => {
      console.log(`Application started on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw new AppException(error.message, 500);
  }
})();
