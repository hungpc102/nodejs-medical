'use strict'

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'athorization'
}

const {findById} = require('../services/apikey.service')

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if(!key){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }

        // check objKey
        const objKey = await findById(key)
        if(!objKey){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        req.objKey = objKey
        return next()

    } catch (error) {
        
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if(!req.objKey.permissions){
            return res.status(403).json({
                message: 'Forbidden denied'
            })
        }
        console.log(req.objKey.permissions)
        const validPermssion = req.objKey.permissions.includes(permission)
        if(!validPermssion){
            return res.status(403).json({
                message: 'Forbidden denied'
            })
        }

        return next()
    }
}



module.exports = {
    apiKey,
    permission
}