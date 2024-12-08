/**
 * Check the sequelize documentations here -> https://sequelize.org/docs/v6/core-concepts/model-basics/
 *
 */

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Disable logging; use `console.log` for enabling
  }
);

module.exports = sequelize;
