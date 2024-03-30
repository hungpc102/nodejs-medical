'use strict'

const client = require('../dbs/init.redis');

class KeyTokenService {
    
  static async createKeyToken({ userId, privateKey, publicKey, refreshToken = '' }) {
    const keytokenData = JSON.stringify({ publicKey, privateKey, refreshToken });
      
    try {
      const result = await client.set(userId.toString(), keytokenData, 'EX', 7 * 24 * 60 * 60);
      
      if (result == 'OK') {
        return JSON.parse(keytokenData)
      } else {
        throw new Error(`No data found for userId ${userId}`);
      }
    } catch (error) {
      console.error(`Error saving key token for userId ${userId}:, error`);
      throw error;
    }
  }

    static findByUserId = async (userId) => {

        const data = await client.get(userId);
            if (data !== null) {
                
              const parsedData = JSON.parse(data);
              return parsedData; 
                
            } else {
            return null;
            }
    }

    static async removeKeyById(userId) {
        return  await client.del(userId);
      }
}

module.exports = KeyTokenService;
