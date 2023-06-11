import { cashierOrder } from '@Models/types';
import React, { useState, useEffect } from 'react'
import BillingTable from './BillingTable/BillingTable';
import Orders from '@Models/orders/Orders';
import { getData } from 'components/GenericFetch/GenericFetch';

export default function Billing() {

  const [order, setOrder] = useState<Orders[]>([]);
  async function getOrders() {
    const data: Orders[] = await getData<Orders[]>("/api/order");
    setOrder(data)
  }
  const [estado, setEstado] = useState("")

  async function getOrdersSearch(id: number) {
    if (id || estado !== "") {
      const data: Orders[] = await getData<Orders[]>(`/api/order/byStatusAndID?status=${estado}&id=${isNaN(id) ? 0 : id}`);
      setOrder(data)
    } else {
      getOrders()
    }
  }
  useEffect(() => {
    getOrdersSearch(search)
  }, [estado]);

  useEffect(() => {
    getOrders()
  }, [])

  const [search, setSearch] = useState<number>("" as any);

  return (
    <div >
      <div className='Filter_Container'>
        <div>
          <span>Estado: </span>
          <select className="Select_nivelStock" value={estado} onChange={(e) => { setEstado(e.target.value) }}>
            <option value={""}>Todos</option>
            <option value={"A Confirmar"}>A Confirmar</option>
            <option value={"En Cocina"}>En Cocina</option>
            <option value={"En Delivery"}>En Delivery</option>
            <option value={"Listo"}>Listo</option>
            <option value={"Entregado"}>Entregado</option>
            <option value={"Cancelado"}>Cancelado</option>
          </select>
        </div>
        <div className="Container_input">
          <input
            placeholder="Busqueda por id"
            onChange={(event) => {
              setSearch(parseInt(event.target.value))
              if (event.target.value === "") {
                getOrdersSearch(search)
              }
            }}
            type='number'
            className="busqueda_comida"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                getOrdersSearch(search)
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              getOrdersSearch(search)
            }}
            style={{ color: "black", cursor: "pointer" }}
          ></i>

        </div>
      </div>
      <div className='Container_Cashier_Table'>
        <BillingTable orders={order} />
      </div>
    </div>
  )
}
