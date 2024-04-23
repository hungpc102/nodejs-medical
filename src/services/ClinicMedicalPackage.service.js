'use strict'

const Clinic = require('../models/clinic.model');
const ClinicMedicalPackage = require('../models/clinicMedicalPackge.model')

class ClinicMedicalPackageService{


    static async getClinicsPackage(packageId) {
        try {
            const clinicsPackage = await ClinicMedicalPackage.findAll({
                where: { package_id: packageId }
            });
            const clinics = clinicsPackage.map(clinicPackage => clinicPackage.clinic_id);
            return clinics
        } catch (error) {
            console.error('Error in getClinicsPackage:', error);
            throw error;
        }
    }

}

module.exports = ClinicMedicalPackageService