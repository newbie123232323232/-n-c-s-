import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/me" element={<ProfilePage />} />
      <Route path="/me/edit" element={<EditProfilePage />} />
    </Routes>
  );
}

export default UserRoutes;
