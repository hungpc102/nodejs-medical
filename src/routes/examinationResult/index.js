'use strict'

const express = require('express')
const examinationResultController = require('../../controllers/examinationResult.Controller')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const {authenticationV2 } = require('../../auth/authUtils')

// authentication //
router.use(authenticationV2)
////////////////////
router.post('', asyncHandler(examinationResultController.createResult))


module.exports = router