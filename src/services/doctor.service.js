'use strict'

const Doctor = require('../models/doctor.model');

class DoctorService {

    static async getByUserId(user) {
        const doctor = await Doctor.findOne({
            where: { user_id: user.userId }
        });

        if (!doctor) {
            throw new Error(`Doctor with user_id=${user.userId} not found.`);
        }

        return doctor; 
    }

    static async updateDoctor(user, updateFields) {
      
        // Tìm hoặc tạo đối tượng Doctor mới nếu không tìm thấy
        const [doctor, wasCreated] = await Doctor.findOrCreate({
          where: { user_id: user.userId },
          defaults: { ...updateFields }
        });
      
        if (!wasCreated) {
          // Nếu nhân viên đã tồn tại, cập nhật thông tin
          await doctor.update(updateFields);
        }
      
        // Trả về thông tin nhân viên sau khi cập nhật hoặc tạo mới
        return doctor.reload();
      }

    static async deleteDoctor(user) {
        const doctor_id = user.userId
        const count = await Doctor.destroy({
            where: { id: doctor_id }
        });

        if (count === 0) {
            throw new Error(`Doctor with id=${doctor_id} not found.`);
        }

        return count; 
    }
}

module.exports = DoctorService;