import React from "react";
import AdminPage from "../components/AdminPage/AdminPage";
import Footer from "../components/Footer/Footer";
import AdminBar from "../components/NavBar/AdminBar";

const Admin = () => {
  return (
    <div>
      <AdminBar title={"Admin"} />
      <AdminPage />
    </div>
  );
};

export default Admin;
