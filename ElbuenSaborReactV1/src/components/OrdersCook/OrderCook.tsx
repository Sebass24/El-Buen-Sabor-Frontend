import Orders from "types/orders/Order";
import { getData } from "components/GenericFetch/GenericFetch";
import React, { useEffect, useState } from "react";
import OrderCookTable from "./OrderCookTable/OrderCookTable";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setOrders } from "@features/Orders/OrderSlice";
import { fetchOrdersCook } from "@features/OrderCook/OrderCookThunk";

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

  const [search, setSearch] = useState("");

  return (
    <div>
      <div
        className="Filter_Container"
        style={{ display: "flex", justifyContent: "end" }}
      >
        <div className="Container_input">
          <input
            placeholder="Busqueda"
            className="busqueda_comida"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                // handleChange(event);
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "black" }}
          ></i>
        </div>
      </div>
      <div className="Container_Cashier_Table">
        <OrderCookTable orders={orders} />
      </div>
    </div>
  );
}
