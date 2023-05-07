import React, { useEffect, useState } from "react";
import TableHead from "@mui/material/TableHead";
import { Link } from "react-router-dom";
import "./TableIngredients.scss";
import { Ingredient } from "@Models/types";

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
import ModalAddIngrediente from "../ModalAddIngrediente/ModalAddIngrediente";

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

const stableSort = (array: Ingredient[], comparator: any, orderBy: any) => {
  const stabilizedThis = array.map((ingrediente: any, index: number) => [
    ingrediente,
    index,
  ]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((ingrediente) => ingrediente[0]);
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
          key="Ingrediente"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Nombre"}
            direction={orderBy === "Nombre" ? order : "asc"}
            onClick={crearSortHandler("Nombre")}
          >
            <Typography fontWeight="bold">Ingrediente</Typography>
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
            <Typography fontWeight="bold">Rubro</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="PrecioDeCosto"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "PrecioDeCosto"}
            direction={orderBy === "PrecioDeCosto" ? order : "asc"}
            onClick={crearSortHandler("PrecioDeCosto")}
          >
            <Typography fontWeight="bold">Precio De Costo</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="StockMinimo"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "StockMinimo"}
            direction={orderBy === "StockMinimo" ? order : "asc"}
            onClick={crearSortHandler("StockMinimo")}
          >
            <Typography fontWeight="bold">Stock mínimo</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="StockActual"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "StockActual"}
            direction={orderBy === "StockActual" ? order : "asc"}
            onClick={crearSortHandler("StockActual")}
          >
            <Typography fontWeight="bold">Stock actual</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="UnidadMedida"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "UnidadMedida"}
            direction={orderBy === "UnidadMedida" ? order : "asc"}
            onClick={crearSortHandler("UnidadMedida")}
          >
            <Typography fontWeight="bold">Unidad medida</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="NivelStock"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">Nivel de stock</Typography>
        </TableCell>

        {/* <TableCell
          className="tableCell"
          key="Estado"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Estado"}
            direction={orderBy === "Estado" ? order : "asc"}
            onClick={crearSortHandler("Estado")}
          >
            <Typography fontWeight="bold">Estado</Typography>
          </TableSortLabel>
        </TableCell> */}

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
  Ingredients: Ingredient[];
}

const TableIngredients = ({ Ingredients }: MyProps) => {
  const formatoMonedaLocal = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nombreObra");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showModal, setShowModal] = React.useState(false);
  const [ingredientEdit, setIngredientEdit] = React.useState<Ingredient>();


  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleShowModal = (Ingredient: Ingredient) => {
    setShowModal(true)
    setIngredientEdit(Ingredient)
  }
  const handleClose = () => {
    setShowModal(false)
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, Ingredients.length - page * rowsPerPage);

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
              rowCount={Ingredients.length}
            />

            <TableBody>
              {stableSort(Ingredients, getComparador(order, orderBy), orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ingrediente, index) => {
                  if (ingrediente.Estado !== "Baja") {
                    return (
                      <TableRow key={index}>
                        <TableCell className="tableCell">
                          {ingrediente.Nombre}
                        </TableCell>
                        <TableCell className="tableCell">
                          {ingrediente.Rubro}
                        </TableCell>
                        <TableCell className="tableCell">
                          {formatoMonedaLocal.format(ingrediente?.PrecioCosto)}{" "}
                        </TableCell>
                        <TableCell className="tableCell">
                          {ingrediente.StockMinimo}
                        </TableCell>
                        <TableCell className="tableCell">
                          {ingrediente.StockActual}
                        </TableCell>
                        <TableCell className="tableCell">
                          {ingrediente.UnidadMedida}
                        </TableCell>
                        <TableCell className="tableCell">
                          {ingrediente.NivelStock}
                        </TableCell>
                        {/* <TableCell className="tableCell">
                          {ingrediente.Estado}
                        </TableCell> */}
                        <TableCell className="tableCell">
                          {
                            <>
                              {/* <button
                                data-title="Eliminar"
                                type="button"
                                className="btn btn-sm"
                                onClick={() => console.log("eliminar")}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button> */}
                              <button
                                data-title="Eliminar"
                                type="button"
                                className="btn btn-sm"
                                onClick={() => (handleShowModal(ingrediente))}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
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
          count={Ingredients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <ModalAddIngrediente
        showModal={showModal}
        handleClose={handleClose}
        editing={true}
        ingrediente={ingredientEdit}
      />


    </div>
  );
};
export default TableIngredients;
