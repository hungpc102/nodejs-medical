'use strict'

const express = require('express')
const doctorController = require('../../controllers/doctor.controller')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const {authenticationV2 } = require('../../auth/authUtils')

// authentication //
router.use(authenticationV2)
////////////////////
router.patch('', asyncHandler(doctorController.updateDoctor))
router.get('', asyncHandler(doctorController.getByUserId))


// QUERY //
// router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))

module.exports = router