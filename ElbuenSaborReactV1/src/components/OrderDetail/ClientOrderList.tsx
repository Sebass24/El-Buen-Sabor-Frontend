import Order from "types/order/Order";
import { useAppSelector } from "@app/Hooks";
import { getUserOrders } from "@services/order";
import HeaderEcommerce from "components/Ecommerce/HeaderEcommerce/HeaderEcommerce";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
import "./ClientOrderList.scss";
import AlertMessage from "components/AlertMessage";
import { HiOutlineDocumentDownload, HiOutlineEye } from "react-icons/hi";

export default function ClientOrderList() {

  const { id } = useAppSelector(state => state.users.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getOrders = async () => {
    try {
      if (id) {
        const orders = await getUserOrders(id);
        setOrders(orders);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleBillDownload = (orderId: number) => {
    try {
      const url = `${import.meta.env.VITE_BILL_DOWNLOAD}/api/bill/download-bill/${orderId}`;
      window.location.href = url;
    } catch (error) {
      console.log(error);
      setShowMessage(true);
    }
  }

  const handleCreditNoteDownload = (orderId: number) => {
    try {
      const url = `${import.meta.env.VITE_BILL_DOWNLOAD}/api/credit-note/download-credit-note/${orderId}`;
      window.location.href = url;
    } catch (error) {
      console.log(error);
      setShowMessage(true);
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    const formatter = new Intl.DateTimeFormat('es-AR', options);
    return formatter.format(date);
  }

  useEffect(() => {
    getOrders();
  }, [id]);

  return (
    <div>
      <HeaderEcommerce />
      <Row><label className="page-name">MIS PEDIDOS</label></Row>
      <div className="my-orders-container">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "25%" }}>Fecha y Hora</TableCell>
                  <TableCell style={{ width: "15%" }}>Nro pedido</TableCell>
                  <TableCell style={{ width: "15%" }}>Total</TableCell>
                  <TableCell style={{ width: "15%" }}>Estado</TableCell>
                  <TableCell style={{ textAlign: "center", width: "30%" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center" }}>Cargando...</TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <>
                  {orders.length > 0 ? (
                    <TableBody>
                      {orders
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((order: Order) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                              <TableCell>{formatDate(order.date as string)}</TableCell>
                              <TableCell>{order.id}</TableCell>
                              <TableCell>${order.total}</TableCell>
                              <TableCell>{order.orderStatus.description}</TableCell>
                              <TableCell style={{ textAlign: "center" }}>
                                <HiOutlineEye size={20} onClick={() => { navigate(`/orderdetail/${order.id}`); }} style={{ cursor: "pointer", color: "black", margin: "1rem", textAlign: "left" }} />
                                {order.paid ? (
                                  order.orderStatus.description === "Cancelado" ? (
                                    <HiOutlineDocumentDownload size={26} onClick={() => { handleCreditNoteDownload(order.id as number); }} style={{ cursor: "pointer", color: "black", margin: "1rem", textAlign: "left" }} />
                                  ) : (
                                    <HiOutlineDocumentDownload size={26} onClick={() => { handleBillDownload(order.id as number); }} style={{ cursor: "pointer", color: "black", margin: "1rem", textAlign: "left" }} />
                                  )
                                ) : (
                                  <></>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} style={{ textAlign: "center" }}>Aun no has realizado ningún pedido.</TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      {showMessage ?
        <AlertMessage
          severity="error"
          onClose={(() => { setShowMessage(false) })}
          label={"Error al descargar el archivo."} />
        : ""}
    </div>
  )
}
