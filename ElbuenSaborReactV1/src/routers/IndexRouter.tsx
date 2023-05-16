import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./UserRouter";
import Admin from "../screens/Admin";
import Cashier from "../screens/Cashier";
import Detail from "../screens/Detail";
import Delivery from "../screens/Delivery";
import NotFound from "components/404/NotFound";
import ProductDetail from "../screens/ProductDetail";
const IndexRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserRouter />} />
        <Route path="/productDetail">
          <Route path=":idproduct" element={<ProductDetail />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/detail/:IdPedido" element={<Detail />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRouter;
