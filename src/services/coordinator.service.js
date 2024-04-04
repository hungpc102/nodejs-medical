const db = require('../dbs/init.firebase');
const ClinicRoom = require('./clinic.service')
const WaitingRoomService = require('./waitingRoom.service')

const clinicRoomsRef = db.ref('clinicRooms');

// Lắng nghe sự kiện 'child_changed' trên ref này để phát hiện thay đổi trạng thái
clinicRoomsRef.on('child_changed', (snapshot) => {
  // In ra thông tin trạng thái mới của phòng khám bị thay đổi
  console.log(`Phòng khám được cập nhật (${snapshot.key}):` , snapshot.val());
  
  // Thực hiện xử lý khi một phòng khám thay đổi trạng thái
  // ...
});


// async function createClinicRooms() {
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

// createClinicRooms().then(() => {
//   console.log('Tất cả phòng khám đã được tạo.');
// });

   async function createClinicRooms(roomName) {
    const patient = WaitingRoomService.getHighestScorePatient(roomName)
    if(patient){
      
    }
   }




module.exports = { clinicRoomsRef };
