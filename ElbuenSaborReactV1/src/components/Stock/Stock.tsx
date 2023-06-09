import React from 'react';
import "./Stock.scss"
import { Tab, Tabs } from 'react-bootstrap';
import Ingredients from './Ingredientes/Ingredients';
import Productos from './Products/Productos';
const Stock = () => {
  return (
    <div className="container_Card">
      <Tabs
        defaultActiveKey="Productos"
        id="justify-tab-example"
        className="stock_navegator"
        justify
      >
        <Tab eventKey="Productos" title="Productos" >
          <Productos />
        </Tab>
        <Tab eventKey="Ingredientes" title="Ingredientes">
          <Ingredients />
        </Tab>
      </Tabs>

    </div>
  );
}

export default Stock;
