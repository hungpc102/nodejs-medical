const apikeyModel = require('../models/apikey.model');
const crypto = require('crypto');

const findById = async (key) => {
    try{
        // const newKey = await apikeyModel.create({
        //     key: crypto.randomBytes(64).toString('hex'),
        //     permissions: '0000'
        // });
        // console.log(newKey);
    
        // Uncomment and adjust the following lines if needed
        // const objKey = await apikeyModel.findOne({key, status: true}).lean();
        const objKey = await apikeyModel.findOne({
            where: {
                key, // Trường bạn muốn tìm kiếm
                status: true  // Bất kỳ điều kiện truy vấn bổ sung nào
            }
        });
        return objKey;
        
    }catch(error){
        console.error(error);
    }
   

};

// findById();

module.exports = {
    findById
};
