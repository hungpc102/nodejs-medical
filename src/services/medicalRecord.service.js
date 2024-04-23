'use strict';

const MedicalRecord = require('../models/medicalRecord.model');
const MedicalPackage = require('../models/medicalPackage.model')

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

            if (filters.patient_id) {
                conditions.patient_id = filters.patient_id; 
            }
    
            if (filters.medicalRecord_status) {
                conditions.medicalRecord_status = filters.medicalRecord_status;
            }

            
    
            const records = await MedicalRecord.findAll({
                where: conditions,
                include: [{
                    model: MedicalPackage,
                    as: 'MedicalPackage',
                    attributes: ['package_name'],
                }]
            });
            
          
    
            return records;
        } catch (error) {
            // Nên xử lý các lỗi liên quan đến truy vấn cơ sở dữ liệu ở đây
            console.error("Lỗi trong getFilteredMedicalRecords:", error);
            throw error;
        }
    }

    static async getByPatientId(patient_id){
        const record = await MedicalRecord.findByPk(patient_id)
        return record
    }

    static async createMedicalRecord(data) {
        try {
            // Tạo mới một record dựa trên dữ liệu được cung cấp
            const newRecord = await MedicalRecord.create(data);

            return newRecord;
        } catch (error) {
            console.error("Error creating new medical record:", error);
            throw error;
        }
    }

    static async updateMedicalRecord(patient_id, updateData) {
        try {
            // Tìm record bằng ID và cập nhật nó với dữ liệu mới
            const record = await MedicalRecord.findByPk(patient_id);
            if (record) {
                // Cập nhật với các thông tin trong `updateData`
                const updatedRecord = await record.update(updateData);
                return updatedRecord;
            } else {
                // Nếu không tìm thấy bản ghi, có thể ném một lỗi hoặc trả về null
                console.error(`MedicalRecord not found for id: ${patient_id}`);
                return null;
            }
        } catch (error) {
            console.error("Error updating medical record:", error);
            throw error;
        }
    }
}

module.exports = MedicalRecordService;