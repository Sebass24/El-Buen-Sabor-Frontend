import React, { useState } from 'react';
import "./Productos.scss"
import { Button } from 'react-bootstrap';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableProductos from './TableProductos/TableProductos';
import ModalAddProductos from './ModalAddProducto/ModalAddProductos';
library.add(faMagnifyingGlass);
const Productos = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false)
  }


  return (
    <div className='Container_Ingredientes' >
      <div className='actions_Ingredientes'>
        <Button variant="success" onClick={() => setShowModal(true)}>Nuevo</Button>

        <div className="Container_input">
          <input placeholder="Busqueda" className="busqueda_comida"></input>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }}></FontAwesomeIcon>
        </div>
      </div>
      <TableProductos />
      <ModalAddProductos
        showModal={showModal}
        handleClose={handleClose}
        setShowModal={setShowModal}
      >

      </ModalAddProductos>
    </div>

  );
}

export default Productos;
