'use strict'
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbs/init.mysql'); 
const UserModel = require('./user.model')


class RefreshTokenUsedModel extends Model {}

RefreshTokenUsedModel.init({
  refreshTokenUsed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: 'Users', 
        key: 'user_id', 
      }
  }
}, {
  sequelize,
  modelName: 'RefreshTokenUsed',
  tableName: 'RefreshTokensUsed', 
  timestamps: true
});

RefreshTokenUsedModel.belongsTo(UserModel, {
    foreignKey: 'user_id', 
    as: 'User', 
  });

module.exports = RefreshTokenUsedModel
