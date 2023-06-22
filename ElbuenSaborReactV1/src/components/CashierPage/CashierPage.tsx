import React, { useState, useEffect } from 'react';
import "./CashierPage.scss";
import CahierTable from './CashierTable/CashierTable';
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { fetchOrders } from '@features/Orders/OrderThunks';
import { getData } from 'components/GenericFetch/GenericFetch';
import Orders from '@Models/order/Order';
import { setOrders } from '@features/Orders/OrderSlice';

const CashierPage = () => {

  const dispatch = useAppDispatch()
  const { orders } = useAppSelector(state => state.Order)

  async function getOrders() {
    dispatch(fetchOrders() as any)
  }

  useEffect(() => {
    getOrders()
  }, [])
  const [search, setSearch] = useState<number>(NaN as any);
  const [estado, setEstado] = useState("");

  async function getOrdersSearch(id: number) {
    if (id || estado !== "") {
      const data: Orders[] = await getData<Orders[]>(
        `/api/order/byStatusAndID?status=${estado}&id=${isNaN(id) ? 0 : id}`
      );
      dispatch(setOrders(data));
    } else {
      dispatch(fetchOrders() as any);
    }
  }
  useEffect(() => {
    getOrdersSearch(search);
  }, [estado]);

  useEffect(() => {
    getOrders();
  }, []);




  return (
    <div >
      <div className='Filter_Container'>
        <div>
          <span>Estado: </span>
          <select
            className="Select_nivelStock"
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
            }}
          >
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
              setSearch(parseInt(event.target.value));
              if (event.target.value === "") {
                getOrdersSearch(search);
              }
            }}
            type="number"
            className="busqueda_comida"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                getOrdersSearch(search);
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              getOrdersSearch(search);
            }}
            style={{ color: "black", cursor: "pointer" }}
          ></i>
        </div>
      </div>
      <div className='Container_Cashier_Table'>
        <CahierTable orders={orders} />
      </div>
    </div >
  );
}

export default CashierPage;
