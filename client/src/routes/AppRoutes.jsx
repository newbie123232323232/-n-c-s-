import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
      <Route path="/me/*" element={<UserRoutes />} />
    </Routes>
  );
}

export default AppRoutes;
