import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import AdminTab from "../AdminTab/AdminTab";
import "./AdminPage.scss";
import Stock from "../Stock/Stock";
import Categories from "components/Categories/Categories";
import Users from "components/Users/Users";

const AdminPage = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="Usuarios"
        id="justify-tab-example"
        className="admin_navegator"
        justify
      >
        <Tab eventKey="Usuarios" title="Usuarios">
          <Users />
        </Tab>
        <Tab eventKey="Stock" title="Stock">
          <Stock />
        </Tab>
        <Tab eventKey="Rubros" title="Rubros">
          <Categories />
        </Tab>
        <Tab eventKey="Estadisticas" title="Estadisticas">
          <AdminTab />
        </Tab>
        <Tab eventKey="Facturacion" title="Facturación">
          <AdminTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminPage;
