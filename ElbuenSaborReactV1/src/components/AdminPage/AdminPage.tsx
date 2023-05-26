import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./AdminPage.scss";
import Stock from "../../components/Stock/Stock";
import Categories from "components/Categories/Categories";
import Users from "components/Users/Users";
import Billing from "components/BIlling/Billing";
import Statistics from "components/Statistics/Statistics";

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
          <Statistics />
        </Tab>
        <Tab eventKey="Facturacion" title="Facturación">
          <Billing />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminPage;
