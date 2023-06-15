import Orders from '@Models/Orders/Order';
import { getData } from 'components/GenericFetch/GenericFetch';
import React, { useEffect, useState } from 'react'
import OrderCookTable from './OrderCookTable/OrderCookTable';

export default function OrderCook() {

  const [order, setOrder] = useState<Orders[]>([]);
  async function getOrders() {
    const data: Orders[] = await getData<Orders[]>("/api/order/byStatus/En cocina");
    setOrder(data)
  }

  useEffect(() => {
    getOrders()
  }, [])

  setInterval(getOrders, 60000)

  const [search, setSearch] = useState("");

  return (
    <div >
      <div className='Filter_Container' style={{ display: "flex", justifyContent: 'end' }}>
        <div className="Container_input">
          <input
            placeholder="Busqueda"
            className="busqueda_comida"
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                // handleChange(event);
              }
            }}></input>
          <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
        </div>
      </div>
      <div className='Container_Cashier_Table'>
        <OrderCookTable orders={order} />
      </div>
    </div>
  )
}
