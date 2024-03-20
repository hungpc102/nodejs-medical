'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const router = express.Router()
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication, authenticationV2 } = require('../../auth/authUtils')

// signUp
router.post('/user/signup', asyncHandler(accessController.signUp))
router.post('/user/login', asyncHandler(accessController.login))

// authentication //
router.use(authenticationV2)
////////////////////
router.post('/user/logout', asyncHandler(accessController.logout))
router.post('/user/handlerRefreshToken', asyncHandler(accessController.handlerRefreshToken))


module.exports = router