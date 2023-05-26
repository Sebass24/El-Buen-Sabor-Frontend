import CookPage from 'components/CookPage/CookPage'
import AdminBar from 'components/NavBar/AdminBar'
import React from 'react'

export default function Cook() {
  return (
    <div>
      <AdminBar title={"Cocinero"} />
      <CookPage />
    </div>
  )
}
