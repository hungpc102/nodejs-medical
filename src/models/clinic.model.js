const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql');
const Doctor = require('./doctor.model')

class Clinic extends Model {}

Clinic.init({
  // Cấu hình cho khóa chính clinic_id
  clinic_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  // Cấu hình cho cột clinic_name
  clinic_name: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  clinic_status:{
    type: DataTypes.ENUM('empty', 'ready', 'active'),
    defaultValue: 'empty'
  },
  doctor_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
        model: 'Doctors', 
        key: 'doctor_id', 
      }
  }
}, {
  sequelize,
  modelName: 'Clinic',
  tableName: 'Clinics',
  timestamps: false
});

Clinic.belongsTo(Doctor, {
    foreignKey: 'doctor_id', 
    as: 'Doctor', 
});

module.exports = Clinic;