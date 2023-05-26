import AdminBar from 'components/NavBar/AdminBar'
import OrderDetailCook from 'components/OrdersCook/OrderDetailCook/OrderDetailCook'
import React from 'react'

export default function DetailCook() {
  return (
    <div>
      <AdminBar title={""} />
      <OrderDetailCook />
    </div>
  )
}
