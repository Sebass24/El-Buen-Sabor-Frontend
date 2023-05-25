import React from "react";
import AdminPage from "../components/AdminPage/AdminPage";
import Footer from "../components/Footer/Footer";
import AdminBar from "../components/NavBar/AdminBar";
import Loading from "components/Loading/Loading";

const Admin = () => {
  return (
    <div>
      <Loading />
      <AdminBar title={"Admin"} />
      <AdminPage />
    </div>
  );
};

export default Admin;
