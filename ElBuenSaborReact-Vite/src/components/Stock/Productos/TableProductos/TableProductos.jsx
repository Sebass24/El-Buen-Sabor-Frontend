import React, { useEffect, useState } from "react";
import TableHead from "@mui/material/TableHead";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./TableProductos.scss";

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
          key="Nombre"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Nombre"}
            direction={orderBy === "Nombre" ? order : "asc"}
            onClick={crearSortHandler("Nombre")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Producto
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="Rubro"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Rubro"}
            direction={orderBy === "Rubro" ? order : "asc"}
            onClick={crearSortHandler("Rubro")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Rubro
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell" key="PrecioDeVenta"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "PrecioDeVenta"}
            direction={orderBy === "PrecioDeVenta" ? order : "asc"}
            onClick={crearSortHandler("PrecioDeVenta")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Precio De Venta
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell" key="TiempoCocina"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "TiempoCocina"}
            direction={orderBy === "TiempoCocina" ? order : "asc"}
            onClick={crearSortHandler("TiempoCocina")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Tiempo en cocina
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell" key="Estado"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Estado"}
            direction={orderBy === "Estado" ? order : "asc"}
            onClick={crearSortHandler("Estado")}
          >
            <Typography variant="subtitle" fontWeight="bold">
              Estado
            </Typography>
          </TableSortLabel>
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



const TableProductos = () => {
  const productosPrueba = [
    {
      Nombre: "Hamburguesa con queso",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Baja"
    },
    {
      Nombre: "Hamburguesa veggi",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Alta"
    },
    {
      Nombre: "Hamburguesa con queso y jamon",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Baja"
    },
    {
      Nombre: "Hamburguesa veggi y lechuga",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Alta"
    }, {
      Nombre: "Hamburguesa con queso y panceta",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Baja"
    },
    {
      Nombre: "Hamburguesa veggi y tomate",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Alta"
    },
  ]
  const formatoMonedaLocal = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
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
                .map((producto, index) => {
                  if (producto.Estado === "Baja") {
                    return (
                      <TableRow key={index} style={{ backgroundColor: '#F0B1B1' }}>
                        <TableCell
                          className="tableCell"
                        >
                          {producto.Nombre}
                        </TableCell>
                        <TableCell className="tableCell">
                          {producto.Rubro}
                        </TableCell>
                        <TableCell className="tableCell">
                          {formatoMonedaLocal.format(producto?.PrecioVenta)}{" "}
                        </TableCell>
                        <TableCell className="tableCell">
                          {producto.TiempoCocina}
                        </TableCell>
                        <TableCell className="tableCell">
                          {producto.Estado}
                        </TableCell>
                        <TableCell className="tableCell">
                          {
                            <>
                              <button
                                data-title="Eliminar"
                                type="button"
                                className="btn btn-sm"
                                onClick={() =>
                                  console.log("eliminar")
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                              <button
                                data-title="Eliminar"
                                type="button"
                                className="btn btn-sm"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                            </>
                          }
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    return (
                      <TableRow key={index}>
                        <TableCell
                          className="tableCell"
                        >
                          {producto.Nombre}
                        </TableCell>
                        <TableCell className="tableCell">
                          {producto.Rubro}
                        </TableCell>
                        <TableCell className="tableCell">
                          {formatoMonedaLocal.format(producto?.PrecioVenta)}{" "}
                        </TableCell>
                        <TableCell className="tableCell">
                          {producto.TiempoCocina}
                        </TableCell>
                        <TableCell className="tableCell">
                          {producto.Estado}
                        </TableCell>
                        <TableCell className="tableCell">
                          {
                            <>
                              <button
                                data-title="Eliminar"
                                type="button"
                                className="btn btn-sm"
                                onClick={() =>
                                  console.log("eliminar")
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                              <button
                                data-title="Eliminar"
                                type="button"
                                className="btn btn-sm"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                            </>
                          }
                        </TableCell>
                      </TableRow>
                    );
                  }

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
    </div>
  );
};
export default TableProductos;