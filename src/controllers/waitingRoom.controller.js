'use strict'

const WaitingRoomService = require("../services/waitingRoom.service")

const {SuccessResponse } = require("../core/success.response")

class WaitingRoomController{

    
    addPatientToWaitingRoom = async (req, res, next) => {
        new SuccessResponse({
            message: 'Add medical record success!',
            metadata: await WaitingRoomService.addPatientToWaitingRoom(req.body)
        }).send(res)
    }


    getFilteredMedicalRecords = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get medical record with the highest score success!',
            metadata: await WaitingRoomService.getHighestScorePatient(req.body)
        }).send(res)
    }
}

module.exports = new WaitingRoomController()