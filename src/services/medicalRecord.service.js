'use strict';

const MedicalRecord = require('../models/medicalRecord.model');

class MedicalRecordService {

    static async getFilteredMedicalRecords(filters) {
        try {
            // Xây dựng điều kiện lọc dựa trên thông tin từ `filters`
            const conditions = {};
    
            if (filters.user_id) {
                conditions.user_id = filters.user_id; 
            }
    
            if (filters.patient_name) {
                conditions.patient_name = filters.patient_name; 
            }
    
            if (filters.medicalRecord_status) {
                conditions.medicalRecord_status = filters.medicalRecord_status;
            }
    
            const records = await MedicalRecord.findAll({
                where: conditions,
            });
    
            return records;
        } catch (error) {
            // Nên xử lý các lỗi liên quan đến truy vấn cơ sở dữ liệu ở đây
            console.error("Lỗi trong getFilteredMedicalRecords:", error);
            throw error;
        }
    }

    static async createMedicalRecord(data) {
        console.log('data')

        console.log(data)
        try {
            // Tạo mới một record dựa trên dữ liệu được cung cấp
            const newRecord = await MedicalRecord.create(data);

            return newRecord;
        } catch (error) {
            console.error("Error creating new medical record:", error);
            throw error;
        }
    }
}

module.exports = MedicalRecordService;