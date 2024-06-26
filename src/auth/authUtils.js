'use strict'

const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError} = require('../core/error.response')
const client = require('../dbs/init.redis')

// service
const {findByUserId} = require('../services/keytoken_redis')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'athorization',
    REFRESHTOKEN: 'x-rtoken-id'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        }) 


        //
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log('error verify::', err)
            } else {
                console.log('decode verify::', decode)
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        
    }
}

const authenticationV2 = asyncHandler(async (req, res, next) => {
    /*
        1 - Checck userId missing???
        2 - get accessToken
        3 - verifyToken
        4 - Check user in dbs?
        5 - Check keyStore with this userId?
        6 - Ok all => return next()
    */

        const userId = req.headers[HEADER.CLIENT_ID]
        if(!userId) throw new AuthFailureError('Invalid Request')

        //2
        const keyStore = await findByUserId(userId)
        if(!keyStore) throw new NotFoundError('Not found keyStore')

        // 3
        if(req.headers[HEADER.REFRESHTOKEN]){
            try {
                const refreshToken = req.headers[HEADER.REFRESHTOKEN]
                const decodeUser = JWT.verify(refreshToken, keyStore.privateKey)
                if(userId !== decodeUser.userId.toString()) throw new AuthFailureError('Invalid Userid')
                req.keyStore = keyStore
                req.user = decodeUser
                req.refreshToken = refreshToken
                return next()
            } catch (error) {
                throw error
            }
        }

        const accessToken = req.headers[HEADER.AUTHORIZATION]
        if(!accessToken) throw new AuthFailureError('Invalid Request')

        try {
            const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
            const user_id = decodeUser.userId.toString()

            if(userId !== user_id) throw new AuthFailureError('Invalid Userid')
            if(decodeUser.status === 'block') throw new AuthFailureError('Invalid Userid')
            req.keyStore = keyStore
            req.user = decodeUser // {userId, email}
            return next()
        } catch (error) {
            throw error
        }
})

const verifyJWT = async(token, keySecret) =>{
    return await JWT.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    verifyJWT,
    authenticationV2
}