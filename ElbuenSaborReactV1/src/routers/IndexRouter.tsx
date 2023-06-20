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
import { useAppSelector } from "@app/Hooks";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth0 } from "@auth0/auth0-react";
const IndexRouter = () => {
  const { user } = useAppSelector(state => state.users)
  const { isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/*" element={
          <PrivateRoute
            isRolPermited={user?.role?.id === 1 || user?.role?.id === 2}
            path={user?.role?.id === 4 ? "/cashier" : (user?.role?.id === 5 ? "/Delivery" : "/Cook")}
          >
            <UserRouter />
          </PrivateRoute>
        } />




        <Route path="/admin" element={
          <PrivateRoute
            isRolPermited={user?.role?.id === 1}
            path="/"
          >
            <Admin />
          </PrivateRoute>
        } />


        <Route path="/cashier" element={
          <PrivateRoute
            isRolPermited={user?.role?.id === 1 || user?.role?.id === 4}
            path="/"
          >
            <Cashier />
          </PrivateRoute>
        } />

        <Route path="/Delivery" element={
          <PrivateRoute
            isRolPermited={user?.role?.id === 1 || user?.role?.id === 5}
            path="/"
          >
            <Delivery />
          </PrivateRoute>
        } />

        <Route path="/Cook" element={
          <PrivateRoute
            isRolPermited={user?.role?.id === 1 || user?.role?.id === 3}
            path="/"
          >
            <Cook />
          </PrivateRoute>
        } />

        <Route path="/detailCook/:IdPedido" element={
          <PrivateRoute
            isRolPermited={user?.role?.id === 1 || user?.role?.id === 3}
            path="/"
          >
            <DetailCook />
          </PrivateRoute>
        } />

        <Route path="/detail/:IdPedido" element={<Detail />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRouter;
