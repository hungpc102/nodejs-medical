'use strict'

const ExaminationResultService = require("../services/examinationResult.service")

const {SuccessResponse } = require("../core/success.response")

class ExaminationResultController{


    createResult = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create result success!',
            metadata: await ExaminationResultService.createResult(req.body)
        }).send(res)
    }

    findResult = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get result success!',
            metadata: await ExaminationResultService.findResult(req.body)
        }).send(res)
    }
    // END QUERY //
}

module.exports = new ExaminationResultController()