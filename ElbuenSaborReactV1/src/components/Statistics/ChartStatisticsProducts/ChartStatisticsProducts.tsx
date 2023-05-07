import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./ChartStatisticsProducts.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
};

interface data {
  name: string;
  orders: number;
  totalAmount: number;
}

const prueba: data[] = [
  {
    name: "franco",
    orders: 10,
    totalAmount: 10,
  },
  {
    name: "Seba",
    orders: 9,
    totalAmount: 110,
  },
  {
    name: "Emi",
    orders: 8,
    totalAmount: 45,
  },
  {
    name: "Lucio",
    orders: 8,
    totalAmount: 250,
  },
  {
    name: "giani",
    orders: 7,
    totalAmount: 232,
  },
];



export function ChartStatisticsProducts() {


  const [RankingOrder, setRankingOrder] = useState<boolean>(true)
  // if RankingOrder is true, show the orders first
  const [optionsCategory, setoptionsCategory] = useState<string[]>(["verdura", "carne", "bebidas"])
  const [labels, setLabels] = useState<string[]>([])
  const [totalAmount, setTotalAmount] = useState<number[]>([])
  const [orders, setOrders] = useState<number[]>([])

  useEffect(() => {
    const Amount = prueba.map((pr) => {
      return pr.totalAmount
    })
    setTotalAmount(Amount)

    const order = prueba.map((pr) => {
      return pr.orders
    })
    setOrders(order)

    const label = prueba.map((pr) => {
      return pr.name
    })
    setLabels(label)

  }, [prueba])


  const data = {
    labels,
    datasets: [
      {
        label: RankingOrder ? "ordenes" : "Total de pagos",
        data: orders,
        backgroundColor: "#F37E12",
      },
    ],
  };


  return (
    <div className="container">
      <div className="filters_Client">
        <div >
          <span>Categorias: </span>
          <select className='Select_nivelStock'>
            {optionsCategory.map((option) => (
              <option>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <span>Desde: </span>
          <input type="date" className='Select_nivelStock' />
        </div>
        <div>
          <span>Hasta: </span>
          <input type="date" className='Select_nivelStock' />
        </div>

      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: "1rem"
      }}>
        <div className="filters_Client_chart">
          <span>
            Clientes
          </span>
          <span>
            Cantidad
          </span>
        </div>

        <Bar options={options} data={data} />
      </div>
    </div>
  );

}


