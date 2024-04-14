'use strict'

const express = require('express')
const coordinatorController = require('../../controllers/coordinator.controller')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const {authenticationV2 } = require('../../auth/authUtils')

// authentication //
router.use(authenticationV2)
////////////////////

router.post('/patientToWaitingRoom', asyncHandler(coordinatorController.HandleAddPatientToWaitingRoom))

router.patch('/updateStatusClinic', asyncHandler(coordinatorController.updateStatusClinic))

router.post('/saveResultMedical',  asyncHandler(coordinatorController.recordAndQueuePatient))


module.exports = router