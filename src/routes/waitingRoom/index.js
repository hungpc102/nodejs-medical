'use strict'

const express = require('express')
const waitingRoomController = require('../../controllers/waitingRoom.controller')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const {authenticationV2 } = require('../../auth/authUtils')

// authentication //
router.use(authenticationV2)
////////////////////
router.post('/addMedicalRecord', asyncHandler(waitingRoomController.addPatientToWaitingRoom))
router.post('/getMedicalRecord', asyncHandler(waitingRoomController.getFilteredMedicalRecords))



module.exports = router