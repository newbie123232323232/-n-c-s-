import React, { useState } from 'react';
import { login } from '../api/authApi';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      setMessage(res.data.message || 'Đăng nhập thành công!');
      // Có thể redirect sang trang chủ, hoặc lưu trạng thái user tại đây
    } catch (err) {
      setMessage(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mật khẩu</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Đăng nhập</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default LoginPage;
