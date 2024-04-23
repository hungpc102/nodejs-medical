'use strict'

const RefreshTokenUsedModel = require('../models/refreshTokenUsed'); 

class RefreshTokenUsed {
    static findDuplicatesRefreshToken= async(userId, refreshToken) => {
        try {
            const tokens = await RefreshTokenUsedModel.findOne({ where: { user_id : userId, refreshTokenUsed:refreshToken } });
            return tokens
            
        } catch (error) {
            console.error('There was an error fetching the tokens:', error);
        }
    }


}



module.exports = RefreshTokenUsed

