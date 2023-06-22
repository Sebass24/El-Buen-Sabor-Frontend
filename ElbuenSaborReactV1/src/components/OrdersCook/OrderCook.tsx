import Orders from "types/order/Order";
import { getData } from "components/GenericFetch/GenericFetch";
import React, { useEffect, useState } from "react";
import OrderCookTable from "./OrderCookTable/OrderCookTable";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setOrders } from "@features/Orders/OrderSlice";
import { fetchOrdersCook } from "@features/OrderCook/OrderCookThunk";
import { setOrdersCook } from "@features/OrderCook/OrderCookSlice";

export default function OrderCook() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orderCook);

  async function getOrders() {
    dispatch(fetchOrdersCook() as any);
  }

  useEffect(() => {
    getOrders();
  }, []);

  setInterval(getOrders, 60000);

  const [search, setSearch] = useState<number>(NaN as any);

  async function getOrdersSearch(id: number) {
    if (id) {
      const data: Orders[] = await getData<Orders[]>(
        `/api/order/byIDCook?id=${isNaN(id) ? 0 : id}`
      );
      dispatch(setOrdersCook(data));
    } else {
      dispatch(fetchOrdersCook() as any);
    }
  }


  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <div
        className="Filter_Container"
        style={{ display: "flex", justifyContent: "end" }}
      >
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
      <div className="Container_Cashier_Table">
        <OrderCookTable orders={orders} getOrders={getOrders} />
      </div>
    </div>
  );
}
