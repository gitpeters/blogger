const sequelize = require('../database/orm/sequelize');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

module.exports = Category;
