'use strict'

const RefreshTokenUsedModel = require('../models/refreshTokenUsed'); 

class RefreshTokenUsed {
    static findDuplicatesRefreshToken= async(userId, refreshToken) => {
         const tokens = await RefreshTokenUsedModel.findAll({ where: { user_id : userId, refreshTokenUsed:refreshToken } });
         console.log(typeof tokens)
         return tokens
    }


}



module.exports = RefreshTokenUsed

