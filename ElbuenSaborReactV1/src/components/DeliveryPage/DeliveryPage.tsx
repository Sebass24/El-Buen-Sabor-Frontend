import React, { useEffect, useState } from 'react'
import "./DeliveryPage.scss"
import DeliveryTable from './DeliveryTable/DeliveryTable'
import { useAppDispatch, useAppSelector } from '@app/Hooks'
import { fetchOrdersDelivery } from '@features/OrderDelivery/OrderDeliveryThunk'
import Orders from '@Models/order/Order'
import { getData } from 'components/GenericFetch/GenericFetch'
import { setOrdersDelivery } from '@features/OrderDelivery/OrderDelivery'


export default function DeliveryPage() {
  const dispatch = useAppDispatch()
  const { orders } = useAppSelector(state => state.orderDelivery)

  async function getOrders() {
    dispatch(fetchOrdersDelivery() as any)
  }

  useEffect(() => {
    getOrders()
  }, [])
  const [search, setSearch] = useState<number>(NaN as any);

  async function getOrdersSearch(id: number) {
    if (id) {
      const data: Orders[] = await getData<Orders[]>(
        `/api/order/byIDDelivery?id=${isNaN(id) ? 0 : id}`
      );
      dispatch(setOrdersDelivery(data));
    } else {
      dispatch(fetchOrdersDelivery() as any);
    }
  }


  useEffect(() => {
    getOrders();
  }, []);


  return (
    <div >
      <div className='Filter_Container d-flex justify-content-end'>
        <div className="Container_input ">
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
        <DeliveryTable
          orders={orders}
        />
      </div>
    </div>
  )
}
