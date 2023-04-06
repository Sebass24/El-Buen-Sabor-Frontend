import React, { useState } from 'react';
import "./Ingredientes.scss"
import { Button } from 'react-bootstrap';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableIngredientes from "./TableIngredientes/TableIngredientes";
import ModalAddIngrediente from './ModalAddIngrediente/ModalAddIngrediente';
library.add(faMagnifyingGlass);
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
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }}></FontAwesomeIcon>
        </div>
      </div>
      <TableIngredientes />
      <ModalAddIngrediente
        showModal={showModal}
        handleClose={handleClose}
      >

      </ModalAddIngrediente>
    </div>

  );
}

export default Ingredientes;
