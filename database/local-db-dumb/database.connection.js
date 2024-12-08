const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
});

module.exports = database;
