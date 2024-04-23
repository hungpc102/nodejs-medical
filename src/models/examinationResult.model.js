const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql');

const MedicalRecord = require('./medicalRecord.model')
const UserModel = require('./user.model')
const Clinic = require('./clinic.model')


class ExaminationResult extends Model {}

ExaminationResult.init({
  // Định nghĩa các trường cần thiết cho bảng kết quả khám
  result_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  patient_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'MedicalRecords', 
      key: 'patient_id', 
    }
  },
  user_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'user_id', 
    }
  },
  clinic_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  result: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  result_image:{
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ExaminationResult',
  tableName: 'ExaminationResults',
  timestamps: true 
});

// Định nghĩa mối quan hệ (nếu có model Patient đã tồn tại)
ExaminationResult.belongsTo(MedicalRecord, {
  foreignKey: 'patient_id', 
  as: 'MedicalRecord', 
});

ExaminationResult.belongsTo(UserModel, {
    foreignKey: 'user_id', 
    as: 'User', 
  });

ExaminationResult.belongsTo(Clinic, {
  foreignKey: 'clinic_id', 
  as: 'Clinic', 
});

module.exports = ExaminationResult;