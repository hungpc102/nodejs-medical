'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql'); 

class ApiKeyModel extends Model {}

ApiKeyModel.init({
  key_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull:false
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  permissions: {
    type: DataTypes.ENUM('0000', '1111', '2222'),
    allowNull: false,
  }
}, {
  sequelize, 
  modelName: 'ApiKey', 
  tableName: 'Apikeys', 
  timestamps: true 
});

module.exports = ApiKeyModel;
