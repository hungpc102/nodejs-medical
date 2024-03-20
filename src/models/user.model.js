'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql'); 

class UserModel extends Model {
  static beforeSave(user) {
    if (user.name) user.name = user.name.trim();
    if (user.email) user.email = user.email.trim();
  }
}

UserModel.init({
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: false
  },
  roles: {
    type: DataTypes.ENUM('admin', 'staff', 'patient', 'doctor'),
    allowNull: false
  },
  sex:{
    type: DataTypes.STRING,
    defaultValue: ''
  },
  date_of_birth:{
    type: DataTypes.DATE,
    defaultValue:null
  },
  status: {
    type: DataTypes.ENUM('active', 'block'),
    defaultValue: 'active'
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: true,
  
  hooks: {
    beforeSave: UserModel.beforeSave
  },
});

module.exports = UserModel;
