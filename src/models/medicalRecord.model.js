'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql'); 
const UserModel = require('./user.model')
const MedicalPackage = require('./medicalPackage.model')

class MedicalRecord extends Model {

}

MedicalRecord.init({
  patient_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: 'Users', 
        key: 'user_id', 
      }
  },
  patient_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  patient_sex: {
    type: DataTypes.ENUM('male', 'female', 'other'), 
    allowNull: false
  },
  patient_address: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  patient_age: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  patient_dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  patient_job: {
    type: DataTypes.STRING,
    allowNull: true
  },
  patient_phone: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  package_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: 'MedicalPackages', 
        key: 'package_id', 
      }
  },
  medicalRecord_status:{
    type: DataTypes.ENUM('pending', 'examining', 'finish'),
    defaultValue: 'pending'
  },
  exam_results:{
    type: DataTypes.STRING, 
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'MedicalRecord',
  tableName: 'MedicalRecords',
  timestamps: true,
});

MedicalRecord.belongsTo(UserModel, {
    foreignKey: 'user_id', 
    as: 'user', 
});

MedicalRecord.belongsTo(MedicalPackage, {
    foreignKey: 'packege_id', 
    as: 'MedicalPackage', 
});

module.exports = MedicalRecord;
