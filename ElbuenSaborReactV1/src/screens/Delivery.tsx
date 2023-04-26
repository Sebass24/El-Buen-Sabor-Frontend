import DeliveryPage from 'components/DeliveryPage/DeliveryPage'
import AdminBar from 'components/NavBar/AdminBar'
import React from 'react'

export default function delivery() {
  return (
    <div>
      <AdminBar title={"Delivery"} />

      <DeliveryPage />
    </div>
  )
}
