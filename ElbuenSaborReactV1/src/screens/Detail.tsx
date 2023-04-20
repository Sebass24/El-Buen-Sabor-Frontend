import React from 'react';
import OrderDetail from '../components/OrderDetail/OrderDetail';
import AdminBar from '../components/NavBar/AdminBar';

const Detail = () => {
  return (
    <div>
      <AdminBar title={""} />
      <OrderDetail />
    </div>
  );
}

export default Detail;
