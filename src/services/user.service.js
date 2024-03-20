'use strict'

const UserModel = require('../models/user.model'); 

const findByEmail = async ({email}, attributes = ['user_id','email', 'password', 'name', 'status', 'roles']) => {
    const user = await UserModel.findOne({
        where: { email }, 
        attributes 
    });
    return user; 
}

module.exports = {
    findByEmail
}
