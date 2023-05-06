import React from "react";
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
import { faker } from "@faker-js/faker";

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
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
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

const labels = ["Sebastian", "Emilia", "Franco", "Lucio", "Giani"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 10),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function ChartStatistic() {
  return <Bar options={options} data={data} />;
}
