import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ChartStatistic } from "./ChartStatistics/ChartStatistic";

export default function Statistics() {
  return (
    <div className="container_Card">
      <Tabs
        defaultActiveKey="RankingProducts"
        id="justify-tab-example"
        className="stock_navegator"
        justify
      >
        <Tab
          eventKey="RankingProducts"
          title="Ranking Productos"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem 0rem",
          }}
        >
          <ChartStatistic></ChartStatistic>
        </Tab>
        <Tab eventKey="RankingClients" title="Ranking Clientes">
          {/* <Clients /> */}
        </Tab>
        <Tab eventKey="MoneyMovs" title="Movimientos Monetarios">
          {/* <Empleoyees /> */}
        </Tab>
      </Tabs>
    </div>
  );
}
