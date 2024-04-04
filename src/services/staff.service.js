'use strict'

const Staff = require('../models/staff.model');

class StaffService {

    static async getByUserId(user) {
        const staff = await Staff.findOne({
            where: { user_id: user.userId }
        });

        if (!staff) {
            throw new Error(`Staff with user_id=${user.userId} not found.`);
        }

        return staff; 
    }

    static async updateStaff(user, updateFields) {
      
        // Tìm hoặc tạo đối tượng Staff mới nếu không tìm thấy
        const [staff, wasCreated] = await Staff.findOrCreate({
          where: { user_id: user.userId },
          defaults: { ...updateFields }
        });
      
        if (!wasCreated) {
          // Nếu nhân viên đã tồn tại, cập nhật thông tin
          await staff.update(updateFields);
        }
      
        // Trả về thông tin nhân viên sau khi cập nhật hoặc tạo mới
        return staff.reload();
      }

    static async deleteStaff(user) {
        const staff_id = user.userId
        const count = await Staff.destroy({
            where: { id: staff_id }
        });

        if (count === 0) {
            throw new Error(`Staff with id=${staff_id} not found.`);
        }

        return count; 
    }
}

module.exports = StaffService;