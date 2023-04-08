import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRouter from './userRouter';
import Admin from '../screens/Admin';
import Cashier from '../screens/Cashier';
import Detail from "../screens/Detail"
const IndexRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserRouter />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/cashier' element={<Cashier />} />
        <Route path='/detail/:IdPedido' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default IndexRouter;
