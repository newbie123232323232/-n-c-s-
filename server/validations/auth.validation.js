const { body } = require('express-validator');

// Đăng ký
const registerValidator = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password').isLength({ min: 6 }).withMessage('Mật khẩu ít nhất 6 ký tự'),
  body('name').notEmpty().withMessage('Tên là bắt buộc'),
];

// Đăng nhập
const loginValidator = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password').notEmpty().withMessage('Mật khẩu là bắt buộc'),
];

// Cập nhật thông tin cá nhân
const updateProfileValidator = [
  body('name').optional().notEmpty().withMessage('Tên không được trống nếu cung cấp'),
  body('avatarUrl').optional().isURL().withMessage('Avatar URL không hợp lệ'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio tối đa 500 ký tự'),
];

// Đổi mật khẩu
const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Mật khẩu hiện tại là bắt buộc'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu mới phải có ít nhất 6 ký tự'),
];

// Quên mật khẩu
const forgotPasswordValidator = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
];

// Đặt lại mật khẩu
const resetPasswordValidator = [
  body('token').notEmpty().withMessage('Token là bắt buộc'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu mới phải có ít nhất 6 ký tự'),
];

module.exports = {
  registerValidator,
  loginValidator,
  updateProfileValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};
