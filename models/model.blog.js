const { DataTypes } = require('sequelize');
const sequelize = require('../database/orm/sequelize');
const slugify = require('slugify');

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

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

Blog.hasMany(Category, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Category.belongsTo(Blog, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
module.exports = Blog;
