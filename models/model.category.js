const sequelize = require('../database/orm/sequelize');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT('long') },
  replies: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
});

module.exports = { Category, Comment };
