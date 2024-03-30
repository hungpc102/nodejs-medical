const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql');
const Clinic = require('./clinic.model')
const MedicalPackage = require('./medicalPackage.model')

class ClinicMedicalPackage extends Model {}

ClinicMedicalPackage.init({
  
    clind_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'user_id', 
          }
    },
    package_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: 'Users', 
        key: 'user_id', 
        }
    }
}, {
  sequelize,
  modelName: 'ClinicMedicalPackage',
  tableName: 'ClinicMedicalPackages',
  timestamps: false
});

ClinicMedicalPackage.belongsTo(Clinic, {
    foreignKey: 'clinic_id', 
    as: 'Clinic', 
  });

  ClinicMedicalPackage.belongsTo(MedicalPackage, {
    foreignKey: 'package_id', 
    as: 'Package', 
});

module.exports = ClinicMedicalPackage;