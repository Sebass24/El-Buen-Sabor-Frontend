import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "../screens/Admin";
import Cashier from "../screens/Cashier";
import Detail from "../screens/Detail";
import Delivery from "../screens/Delivery";
import NotFound from "components/404/NotFound";
import Cook from "../screens/Cook";
import DetailCook from "../screens/DetailCook";
import UserRouter from "./UserRouter";
const IndexRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/Cook" element={<Cook />} />
        <Route path="/detailCook/:IdPedido" element={<DetailCook />} />
        <Route path="/detail/:IdPedido" element={<Detail />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRouter;
