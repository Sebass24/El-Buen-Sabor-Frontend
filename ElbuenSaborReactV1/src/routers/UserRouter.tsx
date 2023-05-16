import { Route, Routes } from "react-router-dom";
import NavigationBar from "components/NavBar/Navbar";
import LandingCatalogue from "../screens/LandingCatalogue";
import ProductDetail from "../screens/ProductDetail";

const UserRouter = () => {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingCatalogue />} />
        <Route path="/productDetail">
          <Route path=":idproduct" element={<ProductDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default UserRouter;
