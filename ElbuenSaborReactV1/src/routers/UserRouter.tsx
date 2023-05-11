import { Route, Routes } from "react-router-dom";
import NavigationBar from "components/NavBar/Navbar";
import LandingCatalogue from "../screens/LandingCatalogue";

const UserRouter = () => {
  return(
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingCatalogue />} />
      </Routes>
    </div>
  );
}

export default UserRouter;
