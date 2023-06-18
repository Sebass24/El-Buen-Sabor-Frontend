import Order from "@Models/Orders/Order";
import { useAppSelector } from "@app/Hooks";
import { getUserOrders } from "@services/order";
import HeaderEcommerce from "components/Ecommerce/HeaderEcommerce/HeaderEcommerce";
import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
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

export default function ClientOrderList() {

    const { id } = useAppSelector(state => state.users.user);
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
        }
    }

    const handleCreditNoteDownload = (orderId: number) => {
        try {
            const url = `${import.meta.env.VITE_BILL_DOWNLOAD}/api/credit-note/download-credit-note/${orderId}`;
            window.location.href = url;
        } catch (error) {
            console.log(error);
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
    }, [orders])

    return (
        <div>
            <HeaderEcommerce />
            <Row><label className="page-name">MIS PEDIDOS</label></Row>
            <div className="my-orders-container">
                {orders.length > 0 ?
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
                                <TableBody>
                                    {orders
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((order: Order) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                                                    <TableCell>{formatDate(order.date as string)}</TableCell>
                                                    <TableCell>{order.id}</TableCell>
                                                    <TableCell>{order.total}</TableCell>
                                                    <TableCell>{order.orderStatus.description}</TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>
                                                        <Button
                                                            className="btn-order-list"
                                                            onClick={() => {
                                                                navigate(`/orderdetail/${order.id}`);
                                                            }}>
                                                            Ver detalle
                                                        </Button>
                                                        {order.paid ? (
                                                            order.orderStatus.description === "Cancelado" ? (
                                                                <Button
                                                                    className={"btn-order-list"}
                                                                    style={{ width: "100%" }}
                                                                    onClick={() => {
                                                                        handleCreditNoteDownload(order.id as number);
                                                                    }}>
                                                                    Ver nota de crédito
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    className={"btn-order-list"}
                                                                    style={{ width: "100%" }}
                                                                    onClick={() => {
                                                                        handleBillDownload(order.id as number);
                                                                    }}>
                                                                    Ver factura
                                                                </Button>
                                                            )
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
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
                    :
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Fecha y Hora</TableCell>
                                        <TableCell>Nro pedido</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={5}>Aun no has realizado ningún pedido.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>}
            </div>
        </div>
    )
}
