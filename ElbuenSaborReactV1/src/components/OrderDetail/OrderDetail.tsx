import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./OrderDetail.scss"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface PedidoDetail {
  IdPedido: number;
  FechaPedido: string;
  NombreApellido: string;
  Telefono: string;
  Direccion: string;
  Departamento: string;
  FormaEntrega: string;
  HoraEstimada: string;
  Descuentos: number;
  productos: Producto[];
}

interface Producto {
  Nombre: string;
  cantidad: number,
  Precio: number,
}

const OrderDetail = () => {
  const { IdPedido } = useParams();
  var subtotal = 0
  const productosPrueba: PedidoDetail =
  {
    IdPedido: 123456,
    FechaPedido: "12/03/23/ 12:30",
    NombreApellido: "Franco Gonzalez",
    Telefono: "2616172242",
    Direccion: "calle falsa 1234",
    Departamento: "Guaymallen",
    FormaEntrega: "Delivery",
    HoraEstimada: "22:00 - 22:20",
    Descuentos: 1000,
    productos: [
      {
        Nombre: "pizza",
        cantidad: 2,
        Precio: 250,
      },
      {
        Nombre: "hamburguesa",
        cantidad: 3,
        Precio: 500,
      },
      {
        Nombre: "agua",
        cantidad: 5,
        Precio: 120,
      },
    ]
  }
  return (
    <>

      <div className='Container_OrderDetail'>
        <h2 className='title'> Pedido: {productosPrueba.IdPedido}</h2>
        <div className='Order_Data'>
          <li>Fecha: {productosPrueba.IdPedido}</li>
          <li>Estado: {productosPrueba.FechaPedido}</li>
          <li>Nombre y Apellido: {productosPrueba.IdPedido}</li>
          <li>Télefono: {productosPrueba.IdPedido}</li>
          <li>Dirección: {productosPrueba.IdPedido}</li>
          <li>Departamento: {productosPrueba.IdPedido}</li>
          <li>Forma de Entrega: {productosPrueba.IdPedido}</li>
          <li>Forma de Pago: {productosPrueba.IdPedido}</li>
          <li>Hora Estimada: {productosPrueba.IdPedido}</li>
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
            {productosPrueba.productos.map((row, index) => {
              subtotal += (row.Precio * row.cantidad)
              return (
                <TableRow
                  className='table_row'
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >{row.Nombre}</TableCell>
                  <TableCell >{row.cantidad}</TableCell>
                  <TableCell >${row.Precio}</TableCell>
                  <TableCell >${row.Precio * row.cantidad}</TableCell>
                </TableRow>
              )

            })}
          </TableBody>
        </Table>
        <span className='SubTotal_order'>Sub Total: ${subtotal}</span>
        <span className='Descuentos'>Descuentos: ${productosPrueba.Descuentos}</span>
        <span className='Total'>Total: ${subtotal - productosPrueba.Descuentos}</span>
      </div>

    </>
  );
}

export default OrderDetail;
