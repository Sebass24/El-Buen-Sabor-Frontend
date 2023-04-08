import React from 'react';
import CashierPage from '../components/CashierPage/CashierPage';
import AdminBar from '../components/NavBar/AdminBar';

const Cashier = () => {
  return (
    <div>
      <AdminBar title={"Cajero"} />

      <CashierPage />
    </div>
  );
}

export default Cashier;
