const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbs/init.mysql');
const UserModel = require('./user.model')

class Staff extends Model {}

Staff.init({
  user_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
        model: 'Users', 
        key: 'user_id', 
      }
  },
  staff_id:{
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  staff_name:{
    type: DataTypes.STRING(150),
    allowNull:true
  },
  staff_age:{
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  staff_department:{
    type: DataTypes.STRING(150),
    allowNull:true
  },
  staff_describe:{
    type: DataTypes.TEXT, 
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Staff',
  tableName: 'Staffs',
  timestamps: true
});

Staff.belongsTo(UserModel, {
    foreignKey: 'user_id', 
    as: 'User', 
  });


module.exports = Staff;