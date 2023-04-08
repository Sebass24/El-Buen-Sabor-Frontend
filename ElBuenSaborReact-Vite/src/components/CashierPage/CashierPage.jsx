import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faMagnifyingGlass);
import "./CashierPage.scss";
import CahierTable from './CashierTable/CashierTable';

const CashierPage = () => {
  return (
    <div >
      <div className='Filter_Container'>
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
      <div className='Container_Cashier_Table'>
        <CahierTable />
      </div>
    </div>
  );
}

export default CashierPage;
