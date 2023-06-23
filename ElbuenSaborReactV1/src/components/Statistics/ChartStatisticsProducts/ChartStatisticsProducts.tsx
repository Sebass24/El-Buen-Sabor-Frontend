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
import { getData } from "components/GenericFetch/GenericFetch";
import Product from "types/Product/Product";
import { useAppSelector } from "@app/Hooks";
import NotResult from "components/404/NotResult";
import exportFromJSON from 'export-from-json';
import { Button } from "react-bootstrap";

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



export function ChartStatisticsProducts() {

  const { ProductCategory } = useAppSelector(state => state.productCategories)
  // if RankingOrder is true, show the orders firs
  const [labels, setLabels] = useState<string[]>([])
  const [orders, setOrders] = useState<number[]>([])
  const [category, setCategory] = useState("Pizza")
  const [Products, setProducts] = useState([])
  const [dateStart, setDateStart] = useState("")
  const [dateEnd, setDateEnd] = useState("")

  useEffect(() => {
    const order = Products.map((pr) => {
      return pr[1]
    })
    setOrders(order)

    const label = Products.map((pr) => {
      const prod: Product = pr[0]
      return prod.name
    })
    setLabels(label)
  }, [Products])

  useEffect(() => {
    getOrders()
  }, [dateStart, dateEnd, category])

  async function getOrders() {
    if (dateStart != "" && dateEnd != "") {
      const data = await getData<[]>(`/api/product/topProducts/${category}?startDate=${dateStart}&endDate=${dateEnd}`);
      setProducts(data)

    } else if (dateStart != "" && dateEnd == "") {
      const data = await getData<[]>(`/api/product/topProducts/${category}?startDate=${dateStart}`);
      setProducts(data)

    } else if (dateStart == "" && dateEnd != "") {
      const data = await getData<[]>(`/api/product/topProducts/${category}?endDate=${dateEnd}`);
      setProducts(data)

    } else if (category != "") {
      const data = await getData<[]>(`/api/product/topProducts/${category}`);
      setProducts(data)

    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: "ordenes",
        data: orders,
        backgroundColor: "#F37E12",
      },
    ],
  };
  const exportToExcel = () => {
    var arrayData = []
    for (var i = 0; i < labels.length; i++) {
      const data = {
        "Producto": labels[i],
        "Cant.vendida": orders[i]
      }
      arrayData.push(data)
    }

    exportFromJSON({ data: arrayData, exportType: "xls", fileName: "product-Data" });
  };


  return (
    <div className="container">
      <div className="filters_Client">
        <div >
          <span>Categorias: </span>
          <select className='Select_nivelStock' value={category} onChange={(e) => (setCategory(e.target.value))}>
            {ProductCategory.map((option, index) => {
              return <option key={index}>{option.description}</option>
            }
            )}
          </select>
        </div>
        <div>
          <span>Desde: </span>
          <input type="Date" className='Select_nivelStock' onChange={(e) => (setDateStart(e.target.value))} />
        </div>
        <div>
          <span>Hasta: </span>
          <input type="Date" className='Select_nivelStock' onChange={(e) => (setDateEnd(e.target.value))} />
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
        </div>
        {Products.length !== 0 ? <Bar options={options} data={data} /> : <NotResult />}
        <div className="d-flex justify-content-end" style={{ margin: "1rem" }}>
          <Button variant="primary" onClick={exportToExcel}>export data</Button>
        </div>
      </div>
    </div>
  );

}


