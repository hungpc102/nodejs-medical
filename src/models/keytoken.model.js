// "use strict";

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../dbs/init.mysql')
// const UserModel = require('./user.model')

//   class Keytoken extends Model {}

//   Keytoken.init({
//     user_id: {
//       type: DataTypes.INTEGER.UNSIGNED, 
//       allowNull: false,
//       require:true,
//       references: {
//         model: 'Users', 
//         key: 'user_id', 
//       }
//     },
//     privateKey: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     publicKey: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     }
//   }, {
//     sequelize,
//     modelName: 'Keytoken',
//     tableName: 'Keytokens', 
//     timestamps: true, 
//   });

//   Keytoken.belongsTo(UserModel, {
//     foreignKey: 'user_id', 
//     as: 'user', 
//   });

// module.exports = Keytoken;
