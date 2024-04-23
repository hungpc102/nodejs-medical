'use strict'

const express = require('express')
const userController = require('../../controllers/user.controller')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const {authenticationV2 } = require('../../auth/authUtils')


// authentication //
router.use(authenticationV2)
////////////////////
router.post('/getAllUser', asyncHandler(userController.findAllUser))
router.post('/delete', asyncHandler(userController.deleteUserByID))
router.post('/updateStatus', asyncHandler(userController.updateUserStatus))


module.exports = router