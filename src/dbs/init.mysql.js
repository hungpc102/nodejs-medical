const { Sequelize } = require('sequelize');

// Thông tin kết nối MySQL (cập nhật các thông tin phù hợp)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Thêm dòng này nếu MySQL của bạn không chạy trên port mặc định (3306)
  dialect: 'mysql',
  // logging: console.log,
});

// Kết nối cơ sở dữ liệu
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch(err => {
    console.error('Error connecting to MySQL', err);
  });


sequelize.sync({ alter: true  }).then(() => {
  console.log("Tables have been successfully created");
}).catch(error => {
  console.error("Unable to create tables, shutting down...", error);
  process.exit(1);
});


process.on('SIGINT', async () => {
    await sequelize.close();
    console.log('Connection to MySQL closed.');
    process.exit(0);
});



module.exports = sequelize;


