
import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Landing from '../components/LandingPhoto/LandingPhoto';
import { Route, Routes } from 'react-router-dom';


const UserRouter = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
