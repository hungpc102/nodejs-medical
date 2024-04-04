'use strict'

const StaffService = require("../services/staff.service")

const {SuccessResponse } = require("../core/success.response")

class StaffController{

    updateStaff = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update staff success!',
            metadata: await StaffService.updateStaff(req.user,req.body)
        }).send(res)
    }

    getByUserId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get staff success!',
            metadata: await StaffService.getByUserId(req.user)
        }).send(res)
    }
    // END QUERY //
}

module.exports = new StaffController()