// 'use strict'

const UserModel = require("../models/user.model")
const RefreshTokensUsedModel = require('../models/refreshTokenUsed')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require("./keytoken_redis")
const RefreshTokenUsed = require('./refreshTokenUssed.service')
const { createTokenPair, verifyJWT } = require("../auth/authUtils")
const { getInfoData } = require("../utils")
const { BadRequestError, ForbiddenError, AuthFailureError } = require("../core/error.response")


// service
const {findByEmail} = require('./user.service')

 
class AccessService {

    static handlerRefreshTokenV2 = async({keyStore, user, refreshToken}) => {
        const {userId, email} = user;

        // if(keyStore.refreshTokensUsed.includes(refreshToken)) {
        //     await KeyTokenService.deleteKeyById(userId)
        //     throw new ForbiddenError('Something wrong happend !! Pls relogin')
        // }
        const refreshTokenUsed = await RefreshTokenUsed.findDuplicatesRefreshToken(userId, refreshToken)
        if(refreshTokenUsed){
            await KeyTokenService.removeKeyById(userId.toString())
            throw new ForbiddenError('Something wrong happend !! Pls relogin')
        }
        

        if(keyStore.refreshToken !== refreshToken) throw new AuthFailureError('User not registeted')

        const foundUser = await findByEmail({email})

        if(!foundUser) throw new AuthFailureError('Shop not registeted')

        // create 1 cap moi
        const tokens = await createTokenPair({userId, email}, keyStore.publicKey, keyStore.privateKey)

        await RefreshTokensUsedModel.create({user_id:userId, refreshTokenUsed: refreshToken})
        await KeyTokenService.createKeyToken({  
            userId,
            privateKey:keyStore.privateKey, publicKey:keyStore.publicKey, 
            refreshToken: tokens.refreshToken
        })



        return {
            user,
            tokens
        }
    }

   
    static logout = async(user) => {
        console.log('user')

        console.log(user)
        const delKey = await KeyTokenService.removeKeyById(user.userId.toString())
        console.log(delKey)
        return delKey
    }

    /*
        1 - check email in dbs
        2 - match password
        3 - create AT vs RT and save
        4 - generate tokens
        5 - get data return login
    */
    static login = async({email, password, refreshToken = null}) => {

        // 1.
        const foundUser = await findByEmail({email})
        if (!foundUser) throw new BadRequestError('Shop not registered')

        // 2.
        const match = await bcrypt.compare(password, foundUser.password)
        if(!match) throw new AuthFailureError('Authentication error')

        // 3.
        // create privateKey, publicKey
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        // 4 - generate tokens
        const userId = foundUser.user_id
        const role =  foundUser.roles
        const status = foundUser.status
        console.log(":::::::role[[[[[[")

        console.log(role)

        const tokens = await createTokenPair({userId, email, role, status}, publicKey, privateKey)
        console.log('Created Token Success::', tokens)

        await KeyTokenService.createKeyToken({  
            userId,
            privateKey, publicKey, 
            refreshToken: tokens.refreshToken
        })

        return {
            user: getInfoData({ fileds: ['user_id', 'name', 'email'], object: foundUser}),
            tokens 
        }
    }
    
    static signUp = async ({name, email, password, role ,referralCode}) => {
            if(role !== 'patient'){
                if(referralCode !== process.env.REFERRAL_CODE){
                    throw new AuthFailureError('Authentication error')
                }
            }
            const holderUser = await UserModel.findOne({where:{email}})
            if(holderUser){
                throw new  BadRequestError('Error: Shop already registered!')
            }

            const passwordHash = await bcrypt.hash(password, 10)


            const newUser = await UserModel.create({
                name, email, password: passwordHash, roles: role
            })

            if (newUser){

                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes (64).toString('hex')

                // Public key CryptoGraphy Standards   

                console.log({privateKey, publicKey}) 

                const keyToken = {
                    userId: newUser.user_id,
                    publicKey: publicKey, 
                    privateKey: privateKey, 
                    refreshToken: '' 
                }

                const keyStore = await KeyTokenService.createKeyToken(keyToken);

                if(!keyStore){
                    return {
                        code: 'xxxx',
                        message: 'keyStore error'
                    }
                }

                // created token pair
                const tokens = await createTokenPair({userId: newUser.user_id, email}, publicKey, privateKey)
                console.log('Created Token Success::', tokens)

                return {
                    code: 201,
                    metadata: {
                        user: getInfoData({ fileds: ['user_id', 'name', 'email'], object: newUser}),
                        tokens
                    }
                }
                // const token = await
            }

            return {
                code: 200,
                metadata: null
            }

    }
}

module.exports = AccessService