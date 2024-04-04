'use strict'

const DoctorService = require("../services/doctor.service")

const {SuccessResponse } = require("../core/success.response")

class DoctorController{

    updateDoctor = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update doctor success!',
            metadata: await DoctorService.updateDoctor(req.user,req.body)
        }).send(res)
    }

    getByUserId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get doctor success!',
            metadata: await DoctorService.getByUserId(req.user)
        }).send(res)
    }
    // END QUERY //
}

module.exports = new DoctorController()