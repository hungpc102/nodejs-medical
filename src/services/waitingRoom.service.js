'use strict'

const redisClient = require('../dbs/init.redis');

class WaitingRoomService {
    // Phương thức để tạo nhiều phòng chờ.
    static async createWaitingRooms() {
        const numberOfWaitingRooms = 8; // Số lượng phòng chờ bạn muốn tạo.

        for (let i = 1; i <= numberOfWaitingRooms; i++) {
            const roomKey = `waitingRoom${i}`;
            // Dùng zAdd thay vì zadd
            await redisClient.zAdd(roomKey, [{ score: 1, value: "temp_member" }]);
            // await redisClient.zRem(roomKey, "temp_member");
        }

        console.log('All waiting rooms have been created.');
    }

    static async addPatientToWaitingRoom({ roomName, patientId, score }) {
        try {
            await redisClient.zAdd(roomName, [
                { score: score, value: patientId.toString() }
            ]);
            console.log(`Added patient ${patientId} to ${roomName} with score ${score}`);
        } catch (error) {
            console.error(`Error adding patient to waiting room: ${error}`);
        }
    }

    static async getHighestScorePatient(clinic_id) {
        const roomName = `waitingRoom${clinic_id}`
        try {
          const patients = await redisClient.sendCommand(['ZREVRANGE', roomName, '0', '0', 'WITHSCORES']);
      
          if (patients.length > 0) {
            const patientId = patients[0];
            const patientScore = patients[1];
            return { patientId, patientScore };
          } else {
            console.log('No patients found in ${roomName}.');
            return null;
          }
        } catch (error) {
          console.error('Error retrieving patient with the highest score: ${error}');
          return null;
        }
    }

    static async findQuietestRoom(roomExamined) {
      const numberOfWaitingRooms = 8; 
      let minCount = Infinity;
      let leastOccupiedRoom = null;
      let examinedRoomsCount = 0;
    
      for (let i = 1; i <= numberOfWaitingRooms; i++) {
        const roomKey = `waitingRoom${i}`;
        // Kiểm tra xem phòng hiện tại có trong roomExamined không
        if (roomExamined.includes(i)) {
          examinedRoomsCount++
          continue; // Nếu có, bỏ qua và tiếp tục vòng lặp
        }
        const patientCount = await redisClient.zCard(roomKey);
        
        if (patientCount < minCount) {
          minCount = patientCount;
          leastOccupiedRoom = roomKey;
        }
      }

      if (examinedRoomsCount === numberOfWaitingRooms) {
        console.log(`Bệnh nhân đã khám qua tất cả các phòng khám.`);
        return null;
      }
    
      if (leastOccupiedRoom !== null) {
        console.log(`Phòng chờ có ít bệnh nhân nhất là: ${leastOccupiedRoom} với ${minCount} bệnh nhân.`);
      } else {
        console.log('Không có phòng chờ nào có sẵn.');
      }
      
      return leastOccupiedRoom;
    }

    static async removePatientFromWaitingRoom({ roomName, patientId }) {
      try {
          const result = await redisClient.zRem(roomName, patientId.toString());
          if (result === 1) {
              console.log(`Bệnh nhân ${patientId} đã được xóa khỏi ${roomName}.`);
          } else {
              console.log(`Không có bệnh nhân nào với ID ${patientId} trong ${roomName} hoặc đã xảy ra lỗi.`);
          }
          return result;
      } catch (error) {
          console.error(`Lỗi khi xóa bệnh nhân khỏi phòng chờ: ${error}`);
          throw error;
      }
  }
}

module.exports = WaitingRoomService;