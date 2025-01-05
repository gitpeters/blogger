const { DataTypes } = require('sequelize');
const sequelize = require('../database/orm/sequelize');
const Blog = require('./model.blog');
const bcrypt = require('bcrypt');
const { cleanPhoneNumber } = require('../utils/system.regex');
const crypto = require('crypto');

const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER', 'AUTHOR', 'EDITOR'),
      defaultValue: 'USER',
      allowNull: false,
    },
    username: { type: DataTypes.STRING },
    changedPasswordAt: { type: DataTypes.DATE, allowNull: true },
    lastFailedLoginAttempt: { type: DataTypes.DATE, allowNull: true },
    failedLoginAttempt: { type: DataTypes.INTEGER, allowNull: true },
    isAcountLocked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ['email', 'phone'],
      },
    ],
    hooks: {
      beforeCreate: async function (User, options) {
        if (User.password) {
          const salt = await bcrypt.genSalt(10);
          User.password = await bcrypt.hash(User.password, salt);
        }
        if (User.phone) {
          User.phone = cleanPhoneNumber(User.phone);
        }
        if (User.firstName) {
          const radByte = crypto.randomBytes(4);
          const secureNum = radByte.readUInt32BE(0) % 10000;
          User.username = 'user_' + User.firstName.toLowerCase() + secureNum;
        }
      },
    },
    beforeUpdate: async function (User, option) {
      if (User.changed('password')) {
        User.changedPasswordAt = new Date(Date.now());
      }
    },
  }
);

User.hasMany(Blog, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Blog.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = User;
