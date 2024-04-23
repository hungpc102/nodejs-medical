const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql');
const MedicalRecord = require('./medicalRecord.model')

class MedicalPackage extends Model {}

MedicalPackage.init({
  // Cấu hình cho khóa chính package_id
  package_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  // Cấu hình cho cột package_name
  package_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  // Các trường khác có thể thêm ở đây
  // ...
}, {
  sequelize,
  modelName: 'MedicalPackage',
  tableName: 'MedicalPackages',
  timestamps: false
});




module.exports = MedicalPackage;