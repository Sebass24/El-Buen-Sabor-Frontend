import { cashierOrder } from '@Models/types';
import React, { useState, useEffect } from 'react'
import BillingTable from './BillingTable/BillingTable';
import Orders from '@Models/orders/Orders';
import { getData } from 'components/GenericFetch/GenericFetch';

export default function Billing() {

  // const productosPrueba: cashierOrder[] = [
  //   {
  //     IdPedido: 123456,
  //     FechaPedido: "12/03/23/ 12:30",
  //     FormaEntrega: "Delivery",
  //     FormaPago: "Efectivo",
  //     Pagado: "No",
  //     Estado: "A Confirmar"
  //   },
  //   {
  //     IdPedido: 123456,
  //     FechaPedido: "12/03/23/ 12:30",
  //     FormaEntrega: "Delivery",
  //     FormaPago: "Efectivo",
  //     Pagado: "Si",
  //     Estado: "Delivery"
  //   },
  //   {
  //     IdPedido: 123456,
  //     FechaPedido: "12/03/23/ 12:30",
  //     FormaEntrega: "Delivery",
  //     FormaPago: "Efectivo",
  //     Pagado: "Si",
  //     Estado: "Listo"
  //   },
  //   {
  //     IdPedido: 1,
  //     FechaPedido: "12/03/23/ 12:30",
  //     FormaEntrega: "Delivery",
  //     FormaPago: "Efectivo",
  //     Pagado: "No",
  //     Estado: "A Confirmar"
  //   },
  //   {
  //     IdPedido: 123456999,
  //     FechaPedido: "12/03/23/ 12:30",
  //     FormaEntrega: "Delivery",
  //     FormaPago: "Efectivo",
  //     Pagado: "Si",
  //     Estado: "Delivery"
  //   },
  //   {
  //     IdPedido: 123456,
  //     FechaPedido: "12/03/23/ 12:30",
  //     FormaEntrega: "Delivery",
  //     FormaPago: "Efectivo",
  //     Pagado: "Si",
  //     Estado: "Listo"
  //   }
  // ]



  const [order, setOrder] = useState<Orders[]>([]);
  async function getOrders() {
    const data: Orders[] = await getData<Orders[]>("/api/order");
    setOrder(data)
  }

  useEffect(() => {
    getOrders()
  }, [])

  const [search, setSearch] = useState("");


  // const [orderComplete, setOrderComplete] = useState<cashierOrder[]>(productosPrueba);
  // const handleChange = (e: any) => {
  //   setSearch(e.target.value);
  //   filter(e.target.value);
  // };


  // const filter = (serchParam: string) => {
  //   var serchResult = orderComplete.filter((productVal: cashierOrder) => {
  //     if (
  //       productVal.IdPedido.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       productVal.FechaPedido?.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       productVal.FormaEntrega.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       productVal.FormaPago.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       productVal.Pagado.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       productVal.Estado.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase())
  //     )
  //       return productVal;
  //   });
  //   setOrder(serchResult);
  // };


  return (
    <div >
      <div className='Filter_Container'>
        <div>
          <span>Estado: </span>
          <select className='Select_nivelStock'>
            <option>Todos</option>
            <option>Faltante</option>
            <option>Optimo</option>
            <option>Pedir</option>
          </select>
        </div>
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
        <BillingTable orders={order} />
      </div>
    </div>
  )
}
