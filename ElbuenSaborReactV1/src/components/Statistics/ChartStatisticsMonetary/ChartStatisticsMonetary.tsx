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

interface data {
  name: string;
  revenues: number;
  costs: number;
  profits: number;
}

const prueba: data[] = [
  {
    name: "franco",
    revenues: 100,
    costs: 90,
    profits: 10,
  },
  {
    name: "Seba",
    revenues: 900,
    costs: 110,
    profits: 790,
  },
  {
    name: "Emi",
    revenues: 800,
    costs: 450,
    profits: 350,
  },
  {
    name: "Lucio",
    revenues: 800,
    costs: 250,
    profits: 550,
  },
  {
    name: "giani",
    revenues: 700,
    costs: 232,
    profits: 468,
  },
];



export function ChartStatisticsMonetary() {


  const [RankingOrder, setRankingOrder] = useState<boolean>(true)
  // if RankingOrder is true, show the orders first
  const [labels, setLabels] = useState<string[]>([])
  const [revenues, setRevenues] = useState<number[]>([])
  const [costs, setCosts] = useState<number[]>([])
  const [profits, setProfits] = useState<number[]>([])

  useEffect(() => {
    const revenue = prueba.map((pr) => {
      return pr.revenues
    })
    setRevenues(revenue)

    const cost = prueba.map((pr) => {
      return pr.costs
    })
    setCosts(cost)

    const profit = prueba.map((pr) => {
      return pr.profits
    })
    setProfits(profit)

    const label = prueba.map((pr) => {
      return pr.name
    })
    setLabels(label)

  }, [prueba])


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
          <input type="date" className='Select_nivelStock' />
        </div>
        <div>
          <span>Hasta: </span>
          <input type="date" className='Select_nivelStock' />
        </div>

      </div>

      <Line options={options} data={data} style={{ marginTop: "1rem" }} />
    </div>
  );

}


