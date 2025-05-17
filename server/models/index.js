const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);

// Associations nếu có sẽ viết ở đây

module.exports = db;

sequelize.authenticate()
  .then(() => {
    console.log('✅ Kết nối database thành công');
  })
  .catch(err => {
    console.error('❌ Kết nối thất bại:', err);
  });