const { validationResult } = require('express-validator');
const { hashPassword } = require('../utils/hash');
const { User } = require('../models');
const jwt = require('jsonwebtoken');


// hàm đăng ký
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });

    const passwordHash = await hashPassword(password);

    const newUser = await User.create({
      email,
      passwordHash,
      name,
      provider: 'local',
    });

    res.status(201).json({ message: 'Đăng ký thành công', userId: newUser.id });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

// hàm đăng nhập
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { comparePassword } = require('../utils/password.util');
const { User } = require('../models');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.isDisabled || user.deletedAt) {
      return res.status(400).json({ message: 'Tài khoản không hợp lệ hoặc bị vô hiệu hóa' });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: 'Đăng nhập thành công',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
          isTwoFactorEnabled: user.isTwoFactorEnabled,
        },
      });

    console.log(`[LOGIN] User ${user.email} đăng nhập lúc ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};


  // hàm đăng xuất
  exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Đăng xuất thành công' });
  };
  