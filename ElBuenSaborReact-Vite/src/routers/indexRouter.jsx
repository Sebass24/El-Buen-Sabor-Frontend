import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRouter from './userRouter';
import Admin from '../screens/admin';

const IndexRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserRouter />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default IndexRouter;
