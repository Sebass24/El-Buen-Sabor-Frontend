import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./OrderDetail.scss"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Button } from 'react-bootstrap';
import Orders from '@Models/Orders/Order';
import { getData } from 'components/GenericFetch/GenericFetch';


const OrderDetail = () => {
  const { IdPedido } = useParams();
  var subtotal = 0
  const [Order, setOrder] = useState<Orders>()

  async function getOrderByID() {
    const data: Orders = await getData<Orders>(`/api/order/${IdPedido}`)
    setOrder(data)
  }

  useEffect(() => {
    getOrderByID()
  }, [])
  return (
    <>

      <div className='Container_OrderDetail'>
        <h2 className='title'> Pedido: {Order?.id}</h2>
        <div className='Order_Data'>
          <li>Fecha: {Order?.date?.toLocaleString()}</li>
          <li>Estado: {Order?.orderStatus.description}</li>
          <li>Nombre y Apellido: {Order?.user.name + " " + Order?.user.lastName}</li>
          {/* <li>Télefono: {Order?.user.}</li>
          <li>Dirección: {Order.IdPedido}</li> */}
          {/* <li>Departamento: {Order.user.}</li> */}
          <li>Forma de Entrega: {Order?.deliveryMethod.description}</li>
          <li>Forma de Pago: {Order?.paymentMethod.description}</li>
          <li>Hora Estimada: {Order?.estimatedTime.toLocaleString()}</li>
        </div>
      </div>

      <div className='Container_OrderDetail' style={{ marginTop: 0 }}>

        <Table className='table_container' >
          <TableHead className='table_head'>
            <TableRow>
              <TableCell >Producto</TableCell>
              <TableCell >cantidad</TableCell>
              <TableCell >Precio</TableCell>
              <TableCell >SubTotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Order?.orderDetails.map((row, index) => {
              subtotal += (row.product.sellPrice * row.quantity)
              return (
                <TableRow
                  className='table_row'
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >{row.product.name}</TableCell>
                  <TableCell >{row.quantity}</TableCell>
                  <TableCell >${row.product.sellPrice}</TableCell>
                  <TableCell >${row.product.sellPrice * row.quantity}</TableCell>
                </TableRow>
              )

            })}
          </TableBody>
        </Table>
        <span className='SubTotal_order'>Sub Total: ${subtotal}</span>
        <span className='Descuentos'>Descuentos: ${Order?.discount}</span>
        <span className='Total'>Total: ${subtotal - (Order?.discount ?? 0)}</span>
      </div>
      <div className='Button_Back'>
        <Button
          variant='warning'
          onClick={() => (window.history.back())}
        >
          volver
        </Button >
      </div>
    </>
  );
}

export default OrderDetail;
