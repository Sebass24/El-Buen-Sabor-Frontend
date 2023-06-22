import React, { useState } from "react";
import "./TableUsers.scss";

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
import Users from "types/Users/User";
import { ModalAddUserAdmin } from "../ModalAddUserAdmin/ModalAddUserAdmin";
import { deleteData, postPutData } from "components/GenericFetch/GenericFetch";
import { useAppDispatch } from "@app/Hooks";
import { deleteEmpleoyee } from "@features/Empleoyees/empleoyeeSlice";
import User from "types/Users/User";

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
          key="Name"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={crearSortHandler("name")}
          >
            <Typography fontWeight="bold">Nombre</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="lastName"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "lastName"}
            direction={orderBy === "lastName" ? order : "asc"}
            onClick={crearSortHandler("lastName")}
          >
            <Typography fontWeight="bold">Nombre</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="userEmail"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <TableSortLabel
            active={orderBy === "userEmail"}
            direction={orderBy === "userEmail" ? order : "asc"}
            onClick={crearSortHandler("userEmail")}
          >
            <Typography fontWeight="bold">Email</Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell
          className="tableCell"
          key="Rol"
          style={{ backgroundColor: "#C6C6C6" }}
        >

          <Typography fontWeight="bold">Rol</Typography>

        </TableCell>

        <TableCell
          className="tableCell"
          key="Acciones"
          style={{ backgroundColor: "#C6C6C6" }}
        >
          <Typography fontWeight="bold">Acciones</Typography>
        </TableCell>
      </TableRow>
    </TableHead >
  );
}

interface myProps {
  Users: Users[];
  client: boolean
}

export default function TableUsers({ Users, client }: myProps) {
  const [showModal, setShowModal] = useState(false);
  const [UserEdit, setUserEdit] = useState<Users | undefined>(undefined)
  const handleClose = () => {
    setShowModal(false);
    setUserEdit(undefined)
  };
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
  const dispatch = useAppDispatch()
  function handleLogicDelete(empleoyee: User) {
    deleteData(`/api/user/deleteEmployee/${empleoyee.auth0Id}`).then(
      (response) => {
        dispatch(deleteEmpleoyee(empleoyee))
      }
    )
  }

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
                .map((user: Users, index) => {

                  return (
                    <TableRow key={index}>
                      <TableCell className="tableCell">{user.name}</TableCell>
                      <TableCell className="tableCell">{user.lastName}</TableCell>
                      <TableCell className="tableCell">
                        {user.userEmail}
                      </TableCell>
                      <TableCell className="tableCell">
                        {user.role?.description}
                      </TableCell>
                      <TableCell className="tableCell">
                        {
                          <button
                            data-title="Editar"
                            type="button"
                            className="btn btn-sm"
                          >
                            <i className="fa-solid fa-pen-to-square" onClick={() => { setUserEdit(user); setShowModal(true) }}></i>
                          </button>
                        }
                        {(!client) ?
                          <button
                            data-title="DarDeBaja"
                            type="button"
                            className="btn btn-sm"
                          >
                            <i className="fa-solid fa-trash" onClick={() => {
                              handleLogicDelete(user)
                            }}></i>
                          </button>
                          : <></>
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
          count={Users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ModalAddUserAdmin
        showModal={showModal}
        handleClose={handleClose}
        editing={true}
        user={UserEdit}
        Client={client}
      />
    </div>
  );
}
