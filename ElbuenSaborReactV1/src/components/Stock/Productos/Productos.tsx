import React, { useState } from 'react';
import "./Productos.scss"
import { Button } from 'react-bootstrap';

// import TableProductos from './TableProductos/TableProductos';
// import ModalAddProductos from './ModalAddProducto/ModalAddProductos';

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
          <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
        </div>
      </div>
      {/* <TableProductos />
      <ModalAddProductos
        showModal={showModal}
        handleClose={handleClose}
        setShowModal={setShowModal}
      >

      </ModalAddProductos> */}
    </div>

  );
}

export default Productos;
