const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // địa chỉ frontend
  credentials: true, // để gửi cookie
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
