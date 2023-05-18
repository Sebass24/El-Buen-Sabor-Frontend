import React, { useEffect, useState } from "react";
import TableHead from "@mui/material/TableHead";
import { Link } from "react-router-dom";
import "./TableProducts.scss";

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
import Products from "@Models/Product/Product";
import ModalAddProducts from "../ModalAddProduct/ModalAddProducts";

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

const stableSort = (array: Products[], comparator: any, orderBy: any) => {
  const stabilizedThis = array.map((product: any, index: number) => [
    product,
    index,
  ]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((product) => product[0]);
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
          key="Nombre"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={crearSortHandler("name")}
          >
            <Typography fontWeight="bold">Producto</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="Rubro"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">Rubro</Typography>
        </TableCell>

        <TableCell
          className="tableCell"
          key="PrecioDeVenta"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "sellPrice"}
            direction={orderBy === "sellPrice" ? order : "asc"}
            onClick={crearSortHandler("sellPrice")}
          >
            <Typography fontWeight="bold">Precio De Venta</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="TiempoCocina"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "cookingTime"}
            direction={orderBy === "cookingTime" ? order : "asc"}
            onClick={crearSortHandler("cookingTime")}
          >
            <Typography fontWeight="bold">Tiempo en cocina</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="Estado"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "available"}
            direction={orderBy === "available" ? order : "asc"}
            onClick={crearSortHandler("available")}
          >
            <Typography fontWeight="bold">Estado</Typography>
          </TableSortLabel>
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

interface MyProps {
  products: Products[];
}

const TableProducts = ({ products }: MyProps) => {
  const formatoMonedaLocal = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nombreObra");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showModal, setShowModal] = React.useState(false);
  const [productEditing, setProductEditing] = React.useState<Products>();

  const handleShowModal = (prod: Products) => {
    setShowModal(true);
    setProductEditing(prod);
  };
  const handleClose = () => {
    setShowModal(false);
  };

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
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

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
              rowCount={products.length}
            />

            <TableBody>
              {stableSort(products, getComparador(order, orderBy), orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product: Products, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="tableCell">
                        {product.name}
                      </TableCell>
                      <TableCell className="tableCell">
                        {product.productCategory.description}
                      </TableCell>
                      <TableCell className="tableCell">
                        {formatoMonedaLocal.format(product?.sellPrice)}{" "}
                      </TableCell>
                      <TableCell className="tableCell">
                        {product.cookingTime}
                      </TableCell>
                      <TableCell className="tableCell">
                        {product.available ? "Disponible" : "No Disponible"}
                      </TableCell>
                      <TableCell className="tableCell">
                        {
                          <button
                            data-title="Eliminar"
                            type="button"
                            className="btn btn-sm"
                            onClick={() => handleShowModal(product)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        }
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <ModalAddProducts
        handleClose={handleClose}
        showModal={showModal}
        editing={true}
        product={productEditing}
      />
    </div>
  );
};
export default TableProducts;
