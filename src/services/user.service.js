'use strict'

const UserModel = require('../models/user.model'); 

const findByEmail = async ({email}, attributes = ['user_id','email','password', 'name', 'status', 'roles']) => {
    const user = await UserModel.findOne({
        where: { email }, 
        attributes
    });
    return user; 
}

const findAllUser = async (filters, attributes = ['user_id','email', 'name', 'status', 'roles']) => {
    const conditions = {};
    
    if (filters.user_id) {
        conditions.user_id = filters.user_id; 
    }

    if (filters.name) {
        conditions.name = filters.name; 
    }

    if (filters.roles) {
        conditions.roles = filters.roles; 
    }

    const users = await UserModel.findAll({
        where: conditions, 
        attributes 
    });

    return users; 
}

const deleteUserByID = async (user_id) => {
    const result = await UserModel.destroy({ where: user_id });

    if (result) {
        return `User with id ${user_id} has been deleted successfully.`;
    } else {
        return `Error! No user found with the id ${user_id}.`;
    }
};

const updateUserStatus = async ({ user_id, status }) => {
    const rowsUpdate = await UserModel.update(
        { status },
        {
            where: { user_id }
        }
    );

    if (rowsUpdate[0] > 0) {
        return `Status for user with id ${user_id} has been updated to "${status}".`;
    } else {
        return `Error! No user found with the id ${user_id}.`;
    }
};

module.exports = {
    findByEmail,
    findAllUser,
    deleteUserByID,
    updateUserStatus
}
