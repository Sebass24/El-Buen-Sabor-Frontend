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
import "./ChartStatistics.scss"
import { Button } from "react-bootstrap";
import { getData } from "components/GenericFetch/GenericFetch";
import User from "@Models/Users/User";
import NotResult from "components/404/NotResult";
import exportFromJSON from 'export-from-json';

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



export function ChartStatistic() {


  const [RankingOrder, setRankingOrder] = useState<boolean>(true)
  // if RankingOrder is true, show the orders first
  const [labels, setLabels] = useState<string[]>([])
  const [totalAmount, setTotalAmount] = useState<number[]>([])
  const [orders, setOrders] = useState<number[]>([])
  const [dateStart, setDateStart] = useState("")
  const [dateEnd, setDateEnd] = useState("")
  const [orderBy, setOrderBy] = useState("price")
  const [Users, setUsers] = useState([])
  const [top, setTop] = useState(5)



  async function getOrders() {
    const data = await getData<[]>(`/api/user/getTop5UsersActual?limit=${top}&orderBy=${orderBy}`);
    setUsers(data)
  }

  async function getOrdersWithData() {
    if (dateEnd && dateStart) {
      const data = await getData<[]>(`/api/user/getTopUsersByOrderDateRange?startDate=${dateStart}&endDate=${dateEnd}&limit=${top}&orderBy=${orderBy}`);
      setUsers(data)
    } else {
      getOrders()
    }
  }

  useEffect(() => {
    const Amount = Users.map((pr) => {
      return pr[2]
    })
    setTotalAmount(Amount)

    const order = Users.map((pr) => {
      return pr[1]
    })
    setOrders(order)

    const label = Users.map((pr) => {
      const user: User = pr[0]
      return user.name
    })
    setLabels(label)


  }, [Users])


  useEffect(() => {
    if (dateEnd && dateStart) {
      getOrdersWithData()
    } else {
      getOrders()
    }
  }, [RankingOrder])

  const data = {
    labels: labels,
    datasets: [
      {
        label: RankingOrder ? "Total de pagos" : "Ordenes",
        data: RankingOrder ? totalAmount : orders,
        backgroundColor: RankingOrder ? "#F37E12" : "#FFD600",
      },
    ],
  };



  const exportToExcel = () => {
    var arrayData = []
    for (var i = 0; i < labels.length; i++) {
      const data = {
        label: labels[i],
        order: orders[i],
        totalAmount: totalAmount[i]
      }
      arrayData.push(data)
    }

    exportFromJSON({ data: arrayData, exportType: "xls", fileName: "client-Data" });
  };



  return (
    <div className="container">
      <div className="filters_Client">
        <div >
          <span>Mostrar: </span>
          <select className="Select_nivelStock" value={top} onChange={(e) => { setTop(parseInt(e.target.value)) }}>
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>

          </select>
        </div>
        <div>
          <span>Desde: </span>
          <input type="Date" className='Select_nivelStock' onChange={(e) => (setDateStart(e.target.value.replace(/-/g, '/')))} />
        </div>
        <div>
          <span>Hasta: </span>
          <input type="Date" className='Select_nivelStock' onChange={(e) => (setDateEnd(e.target.value.replace(/-/g, '/')))} />
        </div>
        <Button variant="success" onClick={getOrdersWithData}>Buscar</Button>
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
          <div className="ChangeType">
            <div className="OrangeCircle"></div>
            <span onClick={() => {
              setRankingOrder(true)
              setOrderBy("price")
            }}  >
              Monto Final
            </span>
          </div>
          <div className="ChangeType">
            <div className="yellowCircle"></div>
            <span onClick={() => {
              setRankingOrder(false)
              setOrderBy("orders")
            }} >
              Cantidad de Pedidos
            </span>
          </div>
        </div>
        {Users.length !== 0 ? <Bar options={options} data={data} /> : <NotResult />}

      </div>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={exportToExcel} style={{ margin: "1rem" }}>export data</Button>
      </div>
    </div>
  );

}


