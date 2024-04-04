'use strict'

const express = require('express')
const staffController = require('../../controllers/staff.controller')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const {authenticationV2 } = require('../../auth/authUtils')

// authentication //
router.use(authenticationV2)
////////////////////
router.patch('', asyncHandler(staffController.updateStaff))
router.get('', asyncHandler(staffController.getByUserId))


// QUERY //
// router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))

module.exports = router