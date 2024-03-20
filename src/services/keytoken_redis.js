const client = require('../dbs/init.redis')

class KeyTokenService {
    static createKeyToken = async({userId, privateKey, publicKey, refreshToken}) => {
       
        try {
            const keytokenData = JSON.stringify({
                publicKey,
                privateKey,
                refreshToken: refreshToken || ''
            })

            const tokens = await client.set(userId, keytokenData, 'EX', 7 * 24 * 60 * 60);

            if(tokens === true) {
                return publicKey 
            }else{
                return null
            }
            
        } catch(error) {
            return error
        }
    };


    static findByUserId = async (userId) => {

        const data = await client.get(userId);

        if (data !== null) {
            return JSON.parse(data);
        } else {
            return null;
        }
    }

    static deleteKeyById = async (userId) => {
        const result = await client.del(userId);
        
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = KeyTokenService;
