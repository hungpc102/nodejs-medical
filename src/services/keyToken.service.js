'use strict'

const KeyTokenModel = require("../models/keytoken.model")

class KeyTokenService {

    static createKeyToken = async ({ userId, publicKey, privateKey}) => {
        try {
            // Level xxx Sequelize version
            const tokens = await KeyTokenModel.findOrCreate({
                where: { user: userId },
                defaults: { publicKey, privateKey},
            });
            
            return tokens && tokens[0] ? tokens[0].publicKey : null;
        } catch (error) {
            return error;
        }
    }

    static findByUserId = async (userId) => {
        // Sequelize findOne
        return await KeyTokenModel.findOne({ where: { user: userId } });
    }
    
    static removeKeyById = async (id) => {
        // Sequelize destroy
        const deletedCount = await KeyTokenModel.destroy({
            where: { id: id }
        });
        return deletedCount;
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        // Sequelize findOne
        return await KeyTokenModel.findOne({ where: { refreshTokensUsed: refreshToken } });
    }

    static findByRefreshToken = async (refreshToken) => {
        // Sequelize findOne
        return await KeyTokenModel.findOne({ where: { refreshToken: refreshToken } });
    }

    static deleteKeyByUserId = async (userId) => {
        // Sequelize delete
        const deletedCount = await KeyTokenModel.destroy({
            where: { user: userId }
        });
        return deletedCount;
    }
}

module.exports = KeyTokenService;
