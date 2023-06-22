import Orders from "types/order/Order";
import React from "react";
import TableHead from "@mui/material/TableHead";
import {
  createTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableSortLabel,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Button } from "react-bootstrap";
import "./OrderCookTable.scss";
import { Link } from "react-router-dom";
import OrderStatus from "types/order/OrderStatus";
import { useAppDispatch } from "@app/Hooks";
import { finishLoading, startLoading } from "@features/Loading/LoadingSlice";
import { postPutData } from "components/GenericFetch/GenericFetch";
import { updateOrderCook } from "@features/OrderCook/OrderCookSlice";
import { updateOrder } from "@features/Orders/OrderSlice";
import Order from "types/order/Order";

function comparadorDescendiente(a: any, b: any, orderBy: any) {
  if (typeof a[orderBy] == "string") {
    a = a[orderBy][0].toLowerCase();
    b = b[orderBy][0].toLowerCase();
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
}

function getComparador(order: string, orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => comparadorDescendiente(a, b, orderBy)
    : (a: any, b: any) => -comparadorDescendiente(a, b, orderBy);
}

const stableSort = (array: Orders[], comparator: any, orderBy: any) => {
  const stabilizedThis = array.map((producto: any, index: number) => [
    producto,
    index,
  ]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((producto: any) => producto[0]);
};

function CabeceraMejorada(props: any) {
  const { order, orderBy, rowCount, handleRequestSort } = props;

  const crearSortHandler = (property: any) => (event: any) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          className="tableCell"
          key="id"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "id"}
            direction={orderBy === "id" ? order : "desc"}
            onClick={crearSortHandler("id")}
          >
            <Typography fontWeight="bold">Pedido</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="FechaPedido"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "date"}
            direction={orderBy === "date" ? order : "asc"}
            onClick={crearSortHandler("date")}
          >
            <Typography fontWeight="bold">Fecha/Hora</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="estimatedTime"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "paid"}
            direction={orderBy === "paid" ? order : "asc"}
            onClick={crearSortHandler("paid")}
          >
            <Typography fontWeight="bold">tiempo de preparacion</Typography>
          </TableSortLabel>
        </TableCell>
        <TableCell
          className="tableCell"
          key="Pagado"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">Pagado</Typography>
        </TableCell>
        <TableCell
          className="tableCell"
          key="Estado"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">Estado</Typography>
        </TableCell>
        <TableCell
          className="tableCell"
          key="Detalle"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">Detalle</Typography>
        </TableCell>
        <TableCell
          className="tableCell"
          key="Acciones"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">Acciones</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface myProps {
  orders: Orders[];
  getOrders: any;
}

export default function OrderCookTable({ orders, getOrders }: myProps) {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const dispatch = useAppDispatch();

  function handleChangeState(order: Orders, status: OrderStatus) {
    const neworder = { ...order, orderStatus: status };
    dispatch(startLoading());
    postPutData(
      `/api/order/changeStatus/${order.id}/${status.id}`,
      "PUT",
      {}
    ).then(() => {
      dispatch(updateOrderCook(neworder));
    });
    dispatch(finishLoading());
  }
  return (
    <div className="container_tabla">
      <Paper className="paper">
        <TableContainer>
          <Table
            className="table"
          // aria-labelledby="tableTitle"
          // aria-label="enhanced table"
          >
            <CabeceraMejorada
              component="th"
              orderBy={orderBy}
              order={order}
              handleRequestSort={handleRequestSort}
              rowCount={orders.length}
            />

            <TableBody>
              {stableSort(orders, getComparador(order, orderBy), orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order: Orders, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="tableCell">{order.id}</TableCell>
                      <TableCell className="tableCell">
                        {order.date?.toString().substring(0, 10) +
                          " " +
                          order.date?.toString().substring(11, 19)}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.estimatedTime?.toString().substring(11, 19)}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.paid == true ? "pagado" : "Falta Pago"}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.orderStatus.description}
                      </TableCell>
                      <TableCell className="tableCell_Detalle">
                        {
                          <Link to={`/detailCook/${order.id}`}>
                            <Button className="" variant="warning">
                              Ver detalle
                            </Button>
                          </Link>
                        }
                      </TableCell>
                      <TableCell
                        className="tableCell"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="tableCell_Actions_billing">
                          <Button variant="warning"
                            onClick={() => {
                              postPutData(`/api/order/add10/${order.id}`, "PUT", {}).then((response) => {
                                console.log(response)
                                const order: Order = { ...response as Order }
                                dispatch(updateOrder(order))
                                getOrders()
                              }
                              )
                            }}
                          >+10 min</Button>
                          <Button
                            className="ACocina"
                            variant="warning"
                            onClick={() => {
                              handleChangeState(order, {
                                id: 4,
                                deleted: false,
                                description: "Listo",
                              });
                            }}
                          >
                            Listo
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            marginBottom: "0 !important",
            ".MuiTablePagination-selectLabel": {
              marginBottom: "0",
            },
            ".MuiTablePagination-displayedRows": {
              marginBottom: "0",
            },
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
