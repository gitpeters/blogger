const { DataTypes } = require('sequelize');
const sequelize = require('../database/orm/sequelize');

const Blog = sequelize.define(
  'Blog',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    content: { type: DataTypes.TEXT('medium'), allowNull: false },
    coverImage: { type: DataTypes.STRING, allowNull: true },
    imagePublicId: { type: DataTypes.STRING, allowNull: true },
  },
  { timestamps: true }
);
module.exports = Blog;
