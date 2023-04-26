import React from 'react'
import "./DeliveryPage.scss"
import DeliveryTable from './DeliveryTable/DeliveryTable'
import { DeliveryOrder } from '@Models/types'

const productosPrueba: DeliveryOrder[] = [
  {
    IdOrder: 1234658,
    Adress: "hipolito",
    Client: "Franco",
    Location: "Godoy Cruz",
    OrderDate: "24/04/2023",
    Phone: 2615654
  },
  {
    IdOrder: 1234658,
    Adress: "hipolito",
    Client: "Franco",
    Location: "Godoy Cruz",
    OrderDate: "24/04/2023",
    Phone: 2615654
  },
  {
    IdOrder: 1234658,
    Adress: "hipolito",
    Client: "Franco",
    Location: "Godoy Cruz",
    OrderDate: "24/04/2023",
    Phone: 2615654
  },
  {
    IdOrder: 1234658,
    Adress: "hipolito",
    Client: "Franco",
    Location: "Godoy Cruz",
    OrderDate: "24/04/2023",
    Phone: 2615654
  },
  {
    IdOrder: 1234658,
    Adress: "hipolito",
    Client: "Franco",
    Location: "Godoy Cruz",
    OrderDate: "24/04/2023",
    Phone: 2615654
  },
  {
    IdOrder: 1234658,
    Adress: "hipolito",
    Client: "Franco",
    Location: "Godoy Cruz",
    OrderDate: "24/04/2023",
    Phone: 2615654
  }
]

export default function DeliveryPage() {
  return (
    <div >
      <div className='Filter_Container d-flex justify-content-end'>
        <div className="Container_input ">
          <input placeholder="Busqueda" className="busqueda_comida"></input>
          <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
        </div>
      </div>
      <div className='Container_Cashier_Table'>
        <DeliveryTable
          orders={productosPrueba}
        />
      </div>
    </div>
  )
}
