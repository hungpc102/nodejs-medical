'use strict'

const {findAllUser, deleteUserByID, updateUserStatus} = require("../services/user.service")

const {SuccessResponse } = require("../core/success.response")

class StaffController{

    findAllUser = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get user success!',
            metadata: await findAllUser(req.body)
        }).send(res)
    }

    deleteUserByID = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete user success!',
            metadata: await deleteUserByID(req.body)
        }).send(res)
    }

    updateUserStatus = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update status user success!',
            metadata: await updateUserStatus(req.body)
        }).send(res)
    }

}

module.exports = new StaffController()