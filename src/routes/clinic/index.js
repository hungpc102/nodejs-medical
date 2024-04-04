'use strict'

const express = require('express')
const clinicController = require('../../controllers/clinic.controller')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const {authenticationV2 } = require('../../auth/authUtils')

// authentication //
router.use(authenticationV2)
////////////////////
// router.patch('', asyncHandler(clinicController.updateDoctor))
router.get('', asyncHandler(clinicController.getByUserId))


module.exports = router