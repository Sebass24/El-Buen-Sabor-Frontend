import React from 'react'
import "./DeliveryTable.scss"

import {
  createTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { DeliveryOrder } from '@Models/types';
import { Link } from 'react-router-dom';



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

const stableSort = (array: DeliveryOrder[], comparator: any, orderBy: any) => {
  const stabilizedThis = array.map((producto: any, index: number) => [producto, index]);
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
          key="IdOrder"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "IdOrder"}
            direction={orderBy === "IdOrder" ? order : "asc"}
            onClick={crearSortHandler("IdOrder")}
          >
            <Typography fontWeight="bold">
              Pedido
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="OrderDate"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "OrderDate"}
            direction={orderBy === "OrderDate" ? order : "asc"}
            onClick={crearSortHandler("OrderDate")}
          >
            <Typography fontWeight="bold">
              Fecha/Hora
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell" key="Client"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Client"}
            direction={orderBy === "Client" ? order : "asc"}
            onClick={crearSortHandler("Client")}
          >
            <Typography fontWeight="bold">
              Cliente
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell" key="Adress"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Adress"}
            direction={orderBy === "Adress" ? order : "asc"}
            onClick={crearSortHandler("Adress")}
          >
            <Typography fontWeight="bold">
              Dirección
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell" key="Location"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Location"}
            direction={orderBy === "Location" ? order : "asc"}
            onClick={crearSortHandler("Location")}
          >
            <Typography fontWeight="bold">
              Departamento
            </Typography>
          </TableSortLabel>
        </TableCell>
        <TableCell
          className="tableCell" key="Phone"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">
            Teléfono
          </Typography>
        </TableCell>
        <TableCell
          className="tableCell" key="Detalle"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">
            Detalle
          </Typography>
        </TableCell>
        <TableCell
          className="tableCell" key="Acciones"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">
            Acciones
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface myProps {
  orders: DeliveryOrder[]
}

function DeliveryTable({ orders }: myProps) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nombreObra");
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
                .map((order: DeliveryOrder, index: number) => {
                  return (
                    <TableRow key={index} >
                      <TableCell
                        className="tableCell"
                      >
                        {order.IdOrder}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.OrderDate}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.Client}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.Adress}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.Location}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.Phone}
                      </TableCell>
                      <TableCell className="tableCell_Detalle">
                        {
                          <Link to={`/detail/${order.IdOrder}`}>
                            <Button
                              className=""
                              variant="warning"
                            >
                              Ver detalle
                            </Button>
                          </Link>

                        }
                      </TableCell>
                      <TableCell className="tableCell">
                        <div className="tableCell_ActionsDelivery">
                          <Button
                            className="ACocina"
                            variant="warning"
                          >
                            Entregado
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
    </div >
  );
}

export default DeliveryTable
