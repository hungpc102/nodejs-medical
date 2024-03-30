const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql');
const UserModel = require('./user.model')

class Doctor extends Model {}

Doctor.init({
  user_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
        model: 'Users', 
        key: 'user_id', 
      }
  },
  doctor_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  doctor_name:{
    type: DataTypes.STRING(150),
    allowNull:true
  },
  doctor_department:{
    type: DataTypes.STRING(150),
    allowNull:true
  },
  doctor_describe:{
    type: DataTypes.TEXT, 
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Doctor',
  tableName: 'Doctors',
  timestamps: true
});

Doctor.belongsTo(UserModel, {
    foreignKey: 'user_id', 
    as: 'User', 
  });


module.exports = Doctor;