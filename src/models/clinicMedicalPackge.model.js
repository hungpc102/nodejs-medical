const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql');
const Clinic = require('./clinic.model')
const MedicalPackage = require('./medicalPackage.model')

class ClinicMedicalPackage extends Model {}

ClinicMedicalPackage.init({
  
    clinic_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Clinics', 
            key: 'clinic_id', 
          }
    },
    package_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'MedicalPackages', 
            key: 'package_id', 
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