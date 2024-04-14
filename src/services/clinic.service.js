const admin = require('firebase-admin');
const db = require('../dbs/init.firebase');
const MedicalRecordService = require ('./medicalRecord.service');

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
  static update(data) {
    const ref = db.ref('clinicRooms/' + data.clinic_id);
    return ref.update(data);
  }

  static async getByUserId(user) {
    const ref = db.ref('clinicRooms');
    let patient;
    try {
      const snapshot = await ref.orderByChild('user_id').equalTo(user.userId).once('value');
      const rooms = snapshot.val();
      if (rooms && rooms[1]) {
        const patient_id = rooms[1].patient_id;
        if (patient_id) {
          patient = await MedicalRecordService.getFilteredMedicalRecords({ patient_id });
        }
  
        return { clinic: rooms[1], patient };
      }
      throw new Error('No clinic rooms found for the given user ID.');
      
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

  // static async function createClinicRooms() {
//     // Tạo danh sách các phòng khám
//     let clinicRooms = [
//       new ClinicRoom('1', 'empty', 'Phòng cân đo', '', '', ''),
//       new ClinicRoom('2', 'empty', 'Phòng xét nghiệm', '', '', ''),
//       new ClinicRoom('3', 'empty', 'Phòng tai mũi họng', '', '', ''),
//       new ClinicRoom('4', 'empty', 'Phòng siêu âm', '', '', ''),
//       new ClinicRoom('5', 'empty', 'Phòng khám mắt', '', '', ''),
//       new ClinicRoom('6', 'empty', 'Phòng khám nội - da liễu', '', '', ''),
//       new ClinicRoom('7', 'empty', 'Phòng Khám ngoại', '', ''),
//       new ClinicRoom('8', 'empty', 'Phòng Khám răng hàm mặt', '', '', ''),
//     ];
  
//     // Dùng vòng lặp qua danh sách và lưu mỗi phòng vào database
//     for (let clinicRoom of clinicRooms) {
//       try {
//         await clinicRoom.save();
//         console.log(`Phòng ${clinicRoom.name} đã được tạo thành công!`);
//       } catch (error) {
//         console.error(`Không thể tạo phòng ${clinicRoom.name}: ${error}`);
//       }
//     }
// }
}

module.exports = ClinicService;
