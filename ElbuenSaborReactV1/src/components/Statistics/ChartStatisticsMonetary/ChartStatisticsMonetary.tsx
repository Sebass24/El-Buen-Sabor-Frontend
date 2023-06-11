import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./ChartStatisticsMonetary.scss"
import { getData } from "components/GenericFetch/GenericFetch";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

// interface data {
//   name: string;
//   revenues: number;
//   costs: number;
//   profits: number;
// }

// const prueba: data[] = [
//   {
//     name: "franco",
//     revenues: 100,
//     costs: 90,
//     profits: 10,
//   },
//   {
//     name: "Seba",
//     revenues: 900,
//     costs: 110,
//     profits: 790,
//   },
//   {
//     name: "Emi",
//     revenues: 800,
//     costs: 450,
//     profits: 350,
//   },
//   {
//     name: "Lucio",
//     revenues: 800,
//     costs: 250,
//     profits: 550,
//   },
//   {
//     name: "giani",
//     revenues: 700,
//     costs: 232,
//     profits: 468,
//   },
// ];



export function ChartStatisticsMonetary() {


  const [RankingOrder, setRankingOrder] = useState<boolean>(true)
  // if RankingOrder is true, show the orders first
  const [labels, setLabels] = useState<string[]>([])
  const [revenues, setRevenues] = useState<number[]>([])
  const [costs, setCosts] = useState<number[]>([])
  const [profits, setProfits] = useState<number[]>([])
  const [dateStart, setDateStart] = useState("")
  const [dateEnd, setDateEnd] = useState("")

  async function getDataBilling() {

    const costs = await getData<[]>(`/api/bill/GetBillingStatisticsCosts${dateStart != "" && dateEnd != "" ? `?startDate=${dateStart}&endDate=${dateEnd}` : ""}${dateStart != "" && dateEnd == "" ? `?startDate=${dateStart}` : ""}${dateStart == "" && dateEnd != "" ? `endDate=${dateEnd}` : ""}`);

    const revenues = await getData<[]>(`/api/bill/GetBillingStatisticsRevenue${dateStart != "" && dateEnd != "" ? `?startDate=${dateStart}&endDate=${dateEnd}` : ""}${dateStart != "" && dateEnd == "" ? `?startDate=${dateStart}` : ""}${dateStart == "" && dateEnd != "" ? `endDate=${dateEnd}` : ""}`);


    const revenue = revenues.map((pr) => {
      return pr[1]
    })
    setRevenues(revenue)

    const cost = costs.map((pr) => {
      return pr[1]
    })
    setCosts(cost)

    const profit = revenues.map((pr, index) => {
      return pr[1] - cost[index] ? cost[index] : 0
    })
    setProfits(profit)


    const label = revenues.map((pr) => {
      return pr[0]
    })
    setLabels(label)
  }

  useEffect(() => {
    getDataBilling()
  }, [dateStart, dateEnd])


  const data = {
    labels,
    datasets: [
      {
        label: "Ingresos",
        data: revenues,
        backgroundColor: "#4C73BE",
        borderColor: "#4C73BE",
      },
      {
        label: "Costos",
        data: costs,
        backgroundColor: "#DF8244",
        borderColor: "#DF8244",
      },
      {
        label: "Ganancia",
        data: profits,
        backgroundColor: "#01D601",
        borderColor: "#01D601",
      },
    ],
  };


  return (
    <div className="container">
      <div className="filters_Client">
        <div>
          <span>Desde: </span>
          <input type="Date" className='Select_nivelStock' onChange={(e) => (setDateStart(e.target.value))} />
        </div>
        <div>
          <span>Hasta: </span>
          <input type="Date" className='Select_nivelStock' onChange={(e) => (setDateEnd(e.target.value))} />
        </div>

      </div>
      <Line options={options} data={data} style={{ marginTop: "1rem" }} />
    </div>
  );

}


