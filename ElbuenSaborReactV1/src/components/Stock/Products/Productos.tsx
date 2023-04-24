import React, { useState } from 'react';
import "./Productos.scss"
import { Button } from 'react-bootstrap';
import TableProducts from './TableProducts/TableProducts';

import ModalAddProducts from './ModalAddProduct/ModalAddProducts';
import { Products } from '@Models/types';

const Productos = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false)
  }
  const productosPrueba: Products[] = [
    {
      Nombre: "Hamburguesa con queso",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Baja",
      Descripcion: "capo"

    },
    {
      Nombre: "Hamburguesa veggi",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Alta",
      Descripcion: "capo"
    },
    {
      Nombre: "Hamburguesa con queso y jamon",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Baja",
      Descripcion: "capo"
    },
    {
      Nombre: "Hamburguesa veggi y lechuga",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Alta",
      Descripcion: "capo"
    }, {
      Nombre: "Hamburguesa con queso y panceta",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Baja",
      Descripcion: "capo"
    },
    {
      Nombre: "Hamburguesa veggi y tomate",
      Rubro: "hamburguesas",
      PrecioVenta: 500,
      TiempoCocina: 45,
      Estado: "Alta",
      Descripcion: "capo"
    },
  ]
  const [product, setProduct] = useState<Products[]>(productosPrueba);
  const [productComplete, setProductComplete] = useState<Products[]>(productosPrueba);
  const [search, setSearch] = useState("");


  const handleChange = (e: any) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };


  const filter = (serchParam: string) => {
    var serchResult = productComplete.filter((productVal: Products) => {
      if (
        productVal.Nombre.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        productVal.Rubro?.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        productVal.PrecioVenta.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        productVal.TiempoCocina.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        productVal.Estado.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase())
      )
        return productVal;
    });
    setProduct(serchResult);
  };


  return (
    <div className='Container_Ingredientes' >
      <div className='actions_Ingredientes'>
        <Button variant="success" onClick={() => setShowModal(true)}>Nuevo</Button>

        <div className="Container_input">
          <input placeholder="Busqueda" className="busqueda_comida" value={search} onChange={handleChange}></input>
          <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
        </div>
      </div>
      <TableProducts
        products={product}
      />
      <ModalAddProducts
        showModal={showModal}
        handleClose={handleClose}
      />


    </div>

  );
}

export default Productos;
