const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} = require('../validations/auth.validation');

const authMiddleware = require('../middlewares/auth.middleware');

// Đăng ký tài khoản
router.post('/register', registerValidator, authController.register);

// Đăng nhập
router.post('/login', loginValidator, authController.login);

// Đăng xuất
router.post('/logout', authController.logout);

// Yêu cầu đặt lại mật khẩu
router.post('/forgot-password', forgotPasswordValidator, authController.forgotPassword);

// Đặt lại mật khẩu
router.post('/reset-password', resetPasswordValidator, authController.resetPassword);

// Đổi mật khẩu (cần đăng nhập)
router.post('/change-password', authMiddleware, changePasswordValidator, authController.changePassword);

module.exports = router;
