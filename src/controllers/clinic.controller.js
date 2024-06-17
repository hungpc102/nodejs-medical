'use strict'

const ClinicService = require("../services/clinic.service")

const {SuccessResponse } = require("../core/success.response")

class ClinicController{


    getByUserId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get clinic success!',
            metadata: await ClinicService.getByUserId(req.user)
        }).send(res)
    }

}

module.exports = new ClinicController()