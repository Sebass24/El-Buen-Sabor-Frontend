import React, { useState } from 'react';
import "./Ingredientes.scss"
import { Button } from 'react-bootstrap';
import TableIngredientes from "./TableIngredientes/TableIngredientes";
import ModalAddIngrediente from './ModalAddIngrediente/ModalAddIngrediente';

const Ingredientes = () => {

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <div className='Container_Ingredientes' >
      <div className='actions_Ingredientes'>
        <div className='actions_Ingredientes_buttons'>
          <Button variant="warning" >Registrar Compra</Button>
          <Button variant="success" onClick={() => setShowModal(true)}>Nuevo</Button>
        </div>
        <div>
          <span>Nivel de stock: </span>
          <select className='Select_nivelStock'>
            <option>Todos</option>
            <option>Faltante</option>
            <option>Optimo</option>
            <option>Pedir</option>
          </select>
        </div>
        <div className="Container_input">
          <input placeholder="Busqueda" className="busqueda_comida"></input>
          <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
        </div>
      </div>
      <TableIngredientes />
      <ModalAddIngrediente
        showModal={showModal}
        handleClose={handleClose}
      />

    </div>

  );
}

export default Ingredientes;
