import React from "react";
import "./LandingPhoto.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faMagnifyingGlass);
export default function Landing() {
  return (
    <div className="imageHomePage">

      <h1 className="Titulo">home</h1>
      <div className="Cointainer_Busqueda_Mejores">
        <p className="Mejores_Burguer">Mejores hamburguesas de mendoza</p>
        <div className="Container_input">
          <input placeholder="Busqueda" className="busqueda_comida"></input>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }}></FontAwesomeIcon>
        </div>
      </div>

    </div>

  )
}
