'use strict'

const ClinicService = require("../services/clinic.service")

const {SuccessResponse } = require("../core/success.response")

class ClinicController{

    // updateStaff = async (req, res, next) => {
    //     new SuccessResponse({
    //         message: 'Update staff success!',
    //         metadata: await StaffService.updateStaff(req.user,req.body)
    //     }).send(res)
    // }

    getByUserId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get clinic success!',
            metadata: await ClinicService.getByUserId(req.user)
        }).send(res)
    }
    // END QUERY //
}

module.exports = new ClinicController()