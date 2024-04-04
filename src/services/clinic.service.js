const admin = require('firebase-admin');
const db = require('../dbs/init.firebase'); // Đường dẫn tới file init đã tạo ở trên

// Cấu trúc dữ liệu dựa trên Realtime Database schema
class ClinicService {
  constructor(clinic_id, clinic_status, clinic_name, user_id, patient_id, score) {
    this.clinic_id = clinic_id;
    this.clinic_status = clinic_status;
    this.clinic_name = clinic_name;
    this.user_id = user_id;
    this.patient_id = patient_id;
    this.score = score;
  }

  // Lưu phòng khám vào database
  save() {
    const ref = db.ref('clinicRooms/' + this.clinic_id);
    return ref.set({
      clinic_id: this.clinic_id,
      clinic_status: this.clinic_status,
      clinic_name: this.clinic_name,
      user_id: this.user_id,
      patient_id: this.patient_id,
      score: this.score
    });
  }

  // Cập nhật thông tin phòng khám
  update(data) {
    const ref = db.ref('clinicRooms/' + this.clinic_id);
    return ref.update(data);
  }

  static async getByUserId(user) {
    const ref = db.ref('clinicRooms');
    try {
      const snapshot = await ref.orderByChild('user_id').equalTo(user.userId).once('value');
      const rooms = snapshot.val();
      return rooms;
    } catch (error) {
      console.error("Error finding room by user_id:", error);
      throw error;
    }
  }
  
  // Tải thông tin phòng khám
  static findById(clinic_id) {
    const ref = db.ref('clinicRooms/' + clinic_id);
    return new Promise((resolve, reject) => {
      ref.once('value', snapshot => {
        resolve(snapshot.val());
      }, reject);
    });
  }

  // Tải tất cả phòng khám
  static findAll() {
    const ref = db.ref('clinicRooms');
    return new Promise((resolve, reject) => {
      ref.once('value', snapshot => {
        resolve(snapshot.val());
      }, reject);
    });
  }
}

module.exports = ClinicService;
