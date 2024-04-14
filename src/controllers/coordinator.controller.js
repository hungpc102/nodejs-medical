'use strict'

const {HandleAddPatientToWaitingRoom, updateStatusClinic, recordAndQueuePatient} = require("../services/coordinator.service")

const {SuccessResponse } = require("../core/success.response")

class CoordinatorController{

    
    HandleAddPatientToWaitingRoom = async (req, res, next) => {
        new SuccessResponse({
            message: 'patient to waiting room success!',
            metadata: await HandleAddPatientToWaitingRoom(req.body)
        }).send(res)
    }
    

    updateStatusClinic = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update clinic status success!',
            metadata: await updateStatusClinic(req.body)
        }).send(res)
    }

    recordAndQueuePatient = async (req, res, next) => {
        new SuccessResponse({
            message: 'save result success!',
            metadata: await recordAndQueuePatient(req.body)
        }).send(res)
    }

}

module.exports = new CoordinatorController() 