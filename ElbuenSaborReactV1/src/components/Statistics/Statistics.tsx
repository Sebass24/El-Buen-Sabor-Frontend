import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ChartStatistic } from "./ChartStatistics/ChartStatistics";
import { ChartStatisticsProducts } from "./ChartStatisticsProducts/ChartStatisticsProducts";
import { ChartStatisticsMonetary } from "./ChartStatisticsMonetary/ChartStatisticsMonetary";
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

        >
          <ChartStatisticsProducts></ChartStatisticsProducts>
        </Tab>
        <Tab eventKey="RankingClients" title="Ranking Clientes">
          <ChartStatistic></ChartStatistic>
        </Tab>
        <Tab eventKey="MoneyMovs" title="Movimientos Monetarios">
          <ChartStatisticsMonetary></ChartStatisticsMonetary>
        </Tab>
      </Tabs>
    </div>
  );
}
