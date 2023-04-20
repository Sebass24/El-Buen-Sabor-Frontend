import React from 'react';
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
          <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
        </div>
      </div>
      <div className='Container_Cashier_Table'>
        <CahierTable />
      </div>
    </div>
  );
}

export default CashierPage;
