'use strict'

const ExaminationResult = require('../models/examinationResult.model');
const clinic = require('../models/clinic.model')

class ExaminationResultService{

    static async createResult(data) {
        try {
          const result = await ExaminationResult.create(data);
          return result;
        } catch (error) {
          console.error('Create Result Error:', error);
          throw error; // Ném lại error để bên ngoài xử lý
        }
      }

      static async findResult(data) {
        try {
          const results = await ExaminationResult.findAll({
            where: data,
            include: [{
              model: clinic,
              as: 'Clinic',
              attributes: ['clinic_name'],
            }]
          });
          console.log(`result:#########${results}`)
          return results;
        } catch (error) {
          console.error('Find Results Error:', error);
          throw error; 
        }
      }
    
}

module.exports = ExaminationResultService;
