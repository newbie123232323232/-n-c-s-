const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  updateProfileValidator,
} = require('../validations/auth.validation');

// Cập nhật thông tin cá nhân
router.put('/me', authMiddleware, updateProfileValidator, userController.updateProfile);

// Vô hiệu hóa tài khoản
router.patch('/me/disable', authMiddleware, userController.disableAccount);

// Xóa mềm tài khoản
router.delete('/me', authMiddleware, userController.softDeleteAccount);

module.exports = router;
