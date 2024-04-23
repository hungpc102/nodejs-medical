const { update } = require("lodash");
const { BadRequestError} = require("../core/error.response")
const db = require('../dbs/init.firebase');
const ClinicService = require('./clinic.service')
const WaitingRoomService = require('./waitingRoom.service')
const ExaminationResultService = require('./examinationResult.service')
const MedicalRecordService = require('./medicalRecord.service')
const ClinicMedicalPackageService = require('./ClinicMedicalPackage.service')



const clinicRoomsRef = db.ref('clinicRooms');

// Lắng nghe sự kiện 'child_changed' trên ref này để phát hiện thay đổi trạng thái
clinicRoomsRef.on('child_changed', async (snapshot) => {
  const roomStatus = snapshot.val();
  const roomName = snapshot.key;

  // Log ra để debug
  console.log(`Phòng khám được cập nhật (${roomName}):`, roomStatus);

  // Kiểm tra nếu trạng thái phòng khám là 'ready'
  if (roomStatus.clinic_status === 'ready') {
    console.log(`Phòng khám ${roomName} sẵn sàng cho bệnh nhân.`);
    patientToClinic(roomName)
  }
});




// ClinicService.createClinicRooms().then(() => {
//   console.log('Tất cả phòng khám đã được tạo.');
// });

async function patientToClinic(clinicId) {
  const patient = await WaitingRoomService.getHighestScorePatient(clinicId); // Sử dụng await
  if (patient) {
    // const clinicId = roomName.replace("waitingRoom", ""); // Xóa "waitingRoom" khỏi tên để lấy clinicId
    try {
      await ClinicService.update({ // Đảm bảo ClinicService.update là hàm async hoặc trả về Promise
        clinic_id: clinicId,
        patient_id: patient.patientId,
        score: patient.patientScore,
        clinic_status: 'examining'
      });
      console.log('Clinic room updated with patient data.');
      const roomName = `waitingRoom${clinicId}`
      await WaitingRoomService.removePatientFromWaitingRoom({ roomName:roomName, patientId: patient.patientId }); 
      await MedicalRecordService.updateMedicalRecord(patient.patientId,{
        medicalRecord_status: 'examining'
      })
    } catch (err) {
      console.error('Failed to update clinic room:', err);
    }
  } else {
    console.log('No highest score patient found for updating clinic room.');
  }
}

   async function HandleAddPatientToWaitingRoom({patientId, score, package_id}) {
    
    const  clinicsPackage = await ClinicMedicalPackageService.getClinicsPackage(package_id)
    const roomExamined = await findRoomExamined({patient_id: patientId})
    
    const roomName = await WaitingRoomService.findQuietestRoom(roomExamined, clinicsPackage)
    if(roomName){
      await MedicalRecordService.updateMedicalRecord(patientId,{
        medicalRecord_status: 'pending'
      })
      return WaitingRoomService.addPatientToWaitingRoom({roomName, patientId, score})
    }else{
      MedicalRecordService.updateMedicalRecord(patientId,{
        medicalRecord_status: 'finish'
      })
    }
   }

   async function updateStatusClinic({ clinicId, status }) {
    try {
      await ClinicService.update({ clinic_id: clinicId, clinic_status: status });
      console.log('Clinic status updated.');
    } catch (error) {
      console.error('Error updating clinic status:', error);
      throw new BadRequestError('Error update status failure');
    }
   }


  async function findRoomExamined({patient_id}) {
    try {
      const results = await ExaminationResultService.findResult({ patient_id:patient_id });
      if (results.length > 0) {
        const roomExamined = results.map(result => result.clinic_id);
        return roomExamined;
      } else {
        console.log('Không có kết quả nào cho bệnh nhân này.');
        return [];
      }
    } catch (error) {
      console.error('Error finding examined room:', error);
      throw error;
    }
  }

  async function recordAndQueuePatient({user_id, patient_id, clinic_id, result}){
    const record = await MedicalRecordService.getFilteredMedicalRecords({patient_id:patient_id})
    const score = record[0].score
    const package_id = record[0].package_id
    const resultMedical = await ExaminationResultService.createResult({user_id, result:result, clinic_id:clinic_id, patient_id:patient_id})
    if(resultMedical){
      try { 
        await HandleAddPatientToWaitingRoom({patientId:patient_id, score:score, package_id:package_id})
        await ClinicService.update({
          clinic_id: clinic_id,
          patient_id:"",
          score:"",
          clinic_status: 'empty'
        });
        console.log('Clinic room updated with patient data.');
        
      } catch (err) {
        console.error('Failed to update clinic room:', err);
      }
    }
  }





module.exports = { patientToClinic, HandleAddPatientToWaitingRoom, updateStatusClinic, recordAndQueuePatient};
