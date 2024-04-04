const admin = require('firebase-admin');

let serviceAccount = require('../configs/clinic-real-time-firebase-adminsdk-8anbr-3ed2ad0eb5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clinic-real-time-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

const db = admin.database();
const ref = db.ref('testConnection');
ref.once('value', (snapshot) => {
  console.log("Kết nối tới Firebase Realtime Database thành công!", snapshot.val());
}, (errorObject) => {
  console.error("Kết nối tới Firebase Realtime Database thất bại: ", errorObject);
});

module.exports = db