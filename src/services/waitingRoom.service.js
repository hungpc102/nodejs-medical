'use strict'

const redisClient = require('../dbs/init.redis');

class WaitingRoomService {
    // Phương thức để tạo nhiều phòng chờ.
    static async createWaitingRooms() {
        const numberOfWaitingRooms = 9; // Số lượng phòng chờ bạn muốn tạo.

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

    static async getHighestScorePatient({roomName}) {
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
}

module.exports = WaitingRoomService;