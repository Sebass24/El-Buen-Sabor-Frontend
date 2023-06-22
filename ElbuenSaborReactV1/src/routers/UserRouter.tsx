import { Route, Routes } from "react-router-dom";
import NavigationBar from "components/NavBar/Navbar";
import LandingCatalogue from "../screens/LandingCatalogue";
import ProductDetail from "../screens/ProductDetail";
import ShoppingCart from "../screens/ShoppingCart";
import AboutUs from "components/Ecommerce/AboutUs/AboutUs";
import ContactUs from "components/Ecommerce/ContactUs/ContactUs";
import ClientOrderDetail from "components/OrderDetail/ClientOrderDetail";
import ClientOrderList from "components/OrderDetail/ClientOrderList";
import { PrivateRoute } from "./PrivateRoute";
import { useAppSelector } from "@app/Hooks";

const UserRouter = () => {
  const { user } = useAppSelector(state => state.users)

  return (
    <div>
      {<NavigationBar />}
      <Routes>
        <Route path="/" element={<LandingCatalogue />} />
        <Route path="/productDetail">
          <Route path=":idproduct" element={<ProductDetail />} />
        </Route>
        <Route path="/orderDetail">
          <Route path=":idorder" element={
            <PrivateRoute
              isRolPermited={user?.role?.id === 2 || user?.role?.id === 1}
              path="/"
            >
              <ClientOrderDetail />
            </PrivateRoute>} />
        </Route>
        <Route path="/myOrders" element={
          <PrivateRoute
            isRolPermited={user?.role?.id === 2 || user?.role?.id === 1}
            path="/"
          >
            <ClientOrderList />
          </PrivateRoute>} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
