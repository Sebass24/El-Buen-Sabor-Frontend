import Categories from 'components/Categories/Categories'
import OrderCook from 'components/OrdersCook/OrderCook'
import Stock from 'components/Stock/Stock'
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

export default function CookPage() {
  return (
    <div>
      <Tabs
        defaultActiveKey="Pedidos"
        id="justify-tab-example"
        className="admin_navegator"
        justify
      >
        <Tab eventKey="Pedidos" title="Pedidos">
          <OrderCook />
        </Tab>
        <Tab eventKey="Stock" title="Stock">
          <Stock />
        </Tab>
        <Tab eventKey="Rubros" title="Rubros">
          <Categories />
        </Tab>
      </Tabs>
    </div>
  )
}
