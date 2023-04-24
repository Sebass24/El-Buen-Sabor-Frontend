import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import "./Users.scss";
import Empleoyees from './Employees/Empleoyees';
import Clients from './Clients/Clients';
export default function Users() {
  return (
    <div className="container_Card">
      <Tabs
        defaultActiveKey="Empleoyees"
        id="justify-tab-example"
        className="stock_navegator"
        justify
      >
        <Tab eventKey="Empleoyees" title="Empleados" >
          <Empleoyees />
        </Tab>
        <Tab eventKey="Clients" title="Clientes">
          <Clients />
        </Tab>
      </Tabs>

    </div>
  )
}
