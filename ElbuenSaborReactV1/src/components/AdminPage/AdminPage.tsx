import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import AdminTab from "../AdminTab/AdminTab";
import "./AdminPage.scss";
// import Stock from "../Stock/Stock";

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
          <AdminTab />
        </Tab>
        <Tab eventKey="Stock" title="Stock">
          <AdminTab />
          {/* <Stock /> */}
        </Tab>
        <Tab eventKey="Rubros" title="Rubros">
          <AdminTab />
        </Tab>
        <Tab eventKey="Estadisticas" title="estadísticas">
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
