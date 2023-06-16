import { Route, Routes } from "react-router-dom";
import NavigationBar from "components/NavBar/Navbar";
import LandingCatalogue from "../screens/LandingCatalogue";
import ProductDetail from "../screens/ProductDetail";
import ShoppingCart from "../screens/ShoppingCart";
import AboutUs from "components/Ecommerce/AboutUs/AboutUs";
import ContactUs from "components/Ecommerce/ContactUs/ContactUs";

const UserRouter = () => {
  return (
    <div>
      {<NavigationBar />}
      <Routes>
        <Route path="/" element={<LandingCatalogue />} />
        <Route path="/productDetail">
          <Route path=":idproduct" element={<ProductDetail />} />
        </Route>
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUS" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
