import React from 'react'
import "./TableUsers.scss"

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
import { Users } from "@Models/types";

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

const stableSort = (array: Users[], comparator: any, orderBy: any) => {
  const stabilizedThis = array.map((product: any, index: number) => [product, index]);
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
          key="Name"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Name"}
            direction={orderBy === "Name" ? order : "asc"}
            onClick={crearSortHandler("Name")}
          >
            <Typography fontWeight="bold">
              Nombre rubro
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="Email"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Email"}
            direction={orderBy === "Email" ? order : "asc"}
            onClick={crearSortHandler("Email")}
          >
            <Typography fontWeight="bold">
              Email
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="Phone"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "Phone"}
            direction={orderBy === "Phone" ? order : "asc"}
            onClick={crearSortHandler("Phone")}
          >
            <Typography fontWeight="bold">
              Teléfono
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="Adress"
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
          className="tableCell"
          key="Location"
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
          className="tableCell" key="State"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "State"}
            direction={orderBy === "State" ? order : "asc"}
            onClick={crearSortHandler("State")}
          >
            <Typography fontWeight="bold">
              Estado
            </Typography>
          </TableSortLabel>
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
  Users: Users[];
}

export default function TableUsers({ Users }: myProps) {
  const formatoMonedaLocal = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Name");
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
    rowsPerPage - Math.min(rowsPerPage, Users.length - page * rowsPerPage);

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
              rowCount={Users.length}
            />

            <TableBody>
              {stableSort(Users, getComparador(order, orderBy), orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  if (user.State === "Baja") {
                    return (
                      <TableRow key={index} style={{ backgroundColor: '#F0B1B1' }}>
                        <TableCell className="tableCell">
                          {user.Name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.Email}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.Phone}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.Adress}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.Location}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.State}
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
                                <i className="fa-solid fa-trash"></i>
                              </button>
                              <button
                                data-title="Editar"
                                type="button"
                                className="btn btn-sm"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                            </>
                          }
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    return (
                      <TableRow key={index}>
                        <TableCell className="tableCell">
                          {user.Name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.Email}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.Phone}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.Adress}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.Location}
                        </TableCell>
                        <TableCell className="tableCell">
                          {user.State}
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
                                <i className="fa-solid fa-trash"></i>
                              </button>
                              <button
                                data-title="Eliminar"
                                type="button"
                                className="btn btn-sm"
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
          count={Users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Paper>
    </div>
  );
}
