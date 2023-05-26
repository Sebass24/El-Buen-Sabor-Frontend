import React, { useState, useEffect } from 'react';
import "./CashierPage.scss";
import CahierTable from './CashierTable/CashierTable';
import { cashierOrder } from '@Models/types';
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { fetchOrders } from '@features/Orders/OrderThunks';

const CashierPage = () => {

  const dispatch = useAppDispatch()
  const { orders } = useAppSelector(state => state.Order)

  // const [order, setOrder] = useState<cashierOrder[]>();
  // const [orderComplete, setOrderComplete] = useState<cashierOrder[]>();

  async function getOrders() {
    dispatch(fetchOrders())
    console.log("pepe")
  }

  useEffect(() => {
    getOrders()
  }, [])


  const [search, setSearch] = useState("");


  setInterval(getOrders, 60000)

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
          <span>Nivel de stock: </span>
          <select className='Select_nivelStock'>
            <option>Todos</option>
            <option>Faltante</option>
            <option>Optimo</option>
            <option>Pedir</option>
          </select>
        </div>
        <div className="Container_input">
          <input placeholder="Busqueda" className="busqueda_comida" value={search} onChange={(e) => (setSearch(e.target.value))}></input>
          <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
        </div>
      </div>
      <div className='Container_Cashier_Table'>
        <CahierTable orders={orders} />
      </div>
    </div >
  );
}

export default CashierPage;
