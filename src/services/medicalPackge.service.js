'use strict'

const MedicalPackage = require('../models/medicalPackage.model')
const ClinicMedicalPackage = require('../models/clinicMedicalPackge.model')

class MedicalPackageService{
    static getPackage = async (packageId) =>{
        try {
            const packageData = await MedicalPackage.findByPk(packageId)

            return packageData

        } catch (error) {
            throw error
        }
       
    }
}

module.exports = MedicalPackageService