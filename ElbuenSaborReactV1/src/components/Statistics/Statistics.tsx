import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

export default function Statistics() {
  return (
    <div className="container_Card">
      <Tabs
        defaultActiveKey="RankingProducts"
        id="justify-tab-example"
        className="stock_navegator"
        justify
      >
        <Tab eventKey="RankingProducts" title="Ranking Productos" >
          {/* <Empleoyees /> */}
        </Tab>
        <Tab eventKey="RankingClients" title="Ranking Clientes">
          {/* <Clients /> */}
        </Tab>
        <Tab eventKey="MoneyMovs" title="Movimientos Monetarios" >
          {/* <Empleoyees /> */}
        </Tab>
      </Tabs>

    </div>
  )
}
