const { DataTypes } = require('sequelize');
const sequelize = require('../database/orm/sequelize');
const slugify = require('slugify');
const Category = require('./model.category');

const Blog = sequelize.define(
  'Blog',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT('medium'), allowNull: false },
    coverImage: { type: DataTypes.STRING, allowNull: true },
    imagePublicId: { type: DataTypes.STRING, allowNull: true },
    slug: { type: DataTypes.STRING },
  },
  {
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ['title'],
      },
    ],

    hooks: {
      beforeCreate: async function (Blog, option) {
        if (Blog.title) {
          Blog.slug = slugify(Blog.title, { lower: true });
        }
      },
    },
  }
);

Blog.belongsTo(Category, {
  foreignKey: 'categoryId',
  onUpdate: 'CASCADE',
});

Category.hasMany(Blog, {
  foreignKey: 'categoryId',
  onUpdate: 'CASCADE',
});
module.exports = Blog;
