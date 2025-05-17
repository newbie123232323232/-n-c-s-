// server/testConnection.js
const sequelize = require('./config/database');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối thành công đến database!');
  } catch (error) {
    console.error('❌ Không thể kết nối database:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
