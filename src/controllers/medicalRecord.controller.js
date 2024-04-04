'use strict'

const MedicalRecordService = require("../services/medicalRecord.service")

const {SuccessResponse } = require("../core/success.response")

class MedicalRecordController{

    getFilteredMedicalRecords = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get medical record success!',
            metadata: await MedicalRecordService.getFilteredMedicalRecords(req.body)
        }).send(res)
    }

    createMedicalRecord = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create medical record success!',
            metadata: await MedicalRecordService.createMedicalRecord(req.body)
        }).send(res)
    }
    // END QUERY //
}

module.exports = new MedicalRecordController()