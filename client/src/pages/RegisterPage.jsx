import React, { useState } from 'react';
import { register } from '../api/authApi';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      setMessage(res.data.message || 'Đăng ký thành công!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mật khẩu</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Đăng ký</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default RegisterPage;
