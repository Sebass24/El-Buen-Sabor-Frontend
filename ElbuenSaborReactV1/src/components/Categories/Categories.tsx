import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import ProductsCategories from './Products/ProductsCategories'
import "./Categories.scss"
import IngredientsCategories from './Ingredients/IngredientsCategories'
export default function Categories() {
  return (
    <div className="container_Card">
      <Tabs
        defaultActiveKey="Productos"
        id="justify-tab-example"
        className="stock_navegator"
        justify
      >
        <Tab eventKey="Productos" title="Productos" >
          <ProductsCategories />
        </Tab>
        <Tab eventKey="Ingredientes" title="Ingredientes">
          <IngredientsCategories />
        </Tab>
      </Tabs>

    </div>
  )
}

