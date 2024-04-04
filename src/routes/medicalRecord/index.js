'use strict'

const express = require('express')
const medicalRecordController = require('../../controllers/medicalRecord.controller')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const {authenticationV2 } = require('../../auth/authUtils')

// authentication //
router.use(authenticationV2)
////////////////////
router.post('', asyncHandler(medicalRecordController.createMedicalRecord))
router.post('/getByFilter', asyncHandler(medicalRecordController.getFilteredMedicalRecords))


module.exports = router