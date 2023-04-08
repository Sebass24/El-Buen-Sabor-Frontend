import React, { useEffect, useState } from "react";
import TableHead from "@mui/material/TableHead";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./CashierTable.scss";

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
import * as locales from "@mui/material/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

library.add(faPen);
library.add(faTrash);

function comparadorDescendiente(a, b, orderBy) {
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

function getComparador(order, orderBy) {
  return order === "desc"
    ? (a, b) => comparadorDescendiente(a, b, orderBy)
    : (a, b) => -comparadorDescendiente(a, b, orderBy);
}

const stableSort = (array, comparator, orderBy) => {
  const stabilizedThis = array.map((producto, index) => [producto, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((producto) => producto[0]);
};

function CabeceraMejorada(props) {
  const { order, orderBy, rowCount, handleRequestSort } = props;

  const crearSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          className="tableCell"
          key="IdPedido"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "IdPedido"}
            direction={orderBy === "IdPedido" ? order : "asc"}
            onClick={crearSortHandler("IdPedido")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Pedido
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="FechaPedido"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "FechaPedido"}
            direction={orderBy === "FechaPedido" ? order : "asc"}
            onClick={crearSortHandler("FechaPedido")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Fecha/Hora
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell" key="FormaEntrega"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "FormaEntrega"}
            direction={orderBy === "FormaEntrega" ? order : "asc"}
            onClick={crearSortHandler("FormaEntrega")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Forma de entrega
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell" key="FormaPago"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "FormaPago"}
            direction={orderBy === "FormaPago" ? order : "asc"}
            onClick={crearSortHandler("FormaPago")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Forma de pago
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell" key="Pagado"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Pagado"}
            direction={orderBy === "Pagado" ? order : "asc"}
            onClick={crearSortHandler("Pagado")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Pagado
            </Typography>
          </TableSortLabel>
        </TableCell>
        <TableCell
          className="tableCell" key="Estado"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography variant="subtitle" fontWeight="bold">
            Estado
          </Typography>
        </TableCell>
        <TableCell
          className="tableCell" key="Detalle"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography variant="subtitle" fontWeight="bold">
            Detalle
          </Typography>
        </TableCell>
        <TableCell
          className="tableCell" key="Acciones"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography variant="subtitle" fontWeight="bold">
            Acciones
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}



const CahierTable = () => {
  const productosPrueba = [
    {
      IdPedido: 123456,
      FechaPedido: "12/03/23/ 12:30",
      FormaEntrega: "Delivery",
      FormaPago: "Efectivo",
      Pagado: "No",
      Estado: "A Confirmar"
    },
    {
      IdPedido: 123456,
      FechaPedido: "12/03/23/ 12:30",
      FormaEntrega: "Delivery",
      FormaPago: "Efectivo",
      Pagado: "Si",
      Estado: "Delivery"
    },
    {
      IdPedido: 123456,
      FechaPedido: "12/03/23/ 12:30",
      FormaEntrega: "Delivery",
      FormaPago: "Efectivo",
      Pagado: "Si",
      Estado: "Listo"
    }
  ]
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nombreObra");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, productosPrueba.length - page * rowsPerPage);

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
              rowCount={productosPrueba.length}
            />

            <TableBody>
              {stableSort(productosPrueba, getComparador(order, orderBy), orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => {
                  return (
                    <TableRow key={index} >
                      <TableCell
                        className="tableCell"
                      >
                        {order.IdPedido}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.FechaPedido}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.FormaEntrega}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.FormaPago}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.Pagado}
                      </TableCell>
                      <TableCell className="tableCell">
                        {order.Estado}
                      </TableCell>
                      <TableCell className="tableCell_Detalle">
                        {
                          <Link to={`/detail/${order.IdPedido}`}>
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
                        <div className="tableCell_Actions">
                          {order.Estado === "A Confirmar" ?
                            <Button
                              className="ACocina"
                              variant="warning"
                            >
                              A Cocina
                            </Button>
                            :
                            order.Estado === "Listo" ?
                              <Button
                                className="ACocina"
                                variant="warning"
                              >
                                Delivery
                              </Button>
                              : <></>
                          }
                          {order.Pagado === "No" ?
                            <Button
                              className="Pagado"
                              variant="Success"
                            >
                              Pagar
                            </Button>
                            : <></>}
                          {order.Pagado === "Si" ?
                            <Button
                              className="verFactura"
                              variant="warning"
                            >
                              Ver Factura
                            </Button>
                            : <></>}
                          <Button
                            className="Anular"
                            variant="danger"
                          >
                            Anular
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
          count={productosPrueba.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Paper>
    </div >
  );
};
export default CahierTable;