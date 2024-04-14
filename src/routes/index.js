'use strict'

const express = require('express')
const {apiKey, permission} = require('../auth/checkAuth')
const router = express.Router()

// check apiKey
// router.use(apiKey)
// // check permissions
// router.use(permission('0000'))

router.use('/v1/api', require('./access'))
router.use('/v1/api/product', require('./product'))
router.use('/v1/api/staff', require('./staff'))
router.use('/v1/api/doctor', require('./doctor'))
router.use('/v1/api/medicalRecord', require('./medicalRecord'))
router.use('/v1/api/clinic', require('./clinic'))
router.use('/v1/api/waitingRoom', require('./waitingRoom'))
router.use('/v1/api/coordinator', require('./coordinator'))
router.use('/v1/api/examinationResult', require('./examinationResult'))







module.exports = router
