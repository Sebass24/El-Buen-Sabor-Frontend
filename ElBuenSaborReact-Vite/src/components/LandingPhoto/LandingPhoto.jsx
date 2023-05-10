import React from "react";
import "./LandingPhoto.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faMagnifyingGlass);
export default function Landing() {
  return (
    <div className="imageHomePage">

      <div className="search_container">
        <p className="best_burgers">Mejores hamburguesas de mendoza</p>
        <div className="input-container">
          <input type="text" placeholder="Buscar" className="food_search"></input>
          <span className="icon"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }}></FontAwesomeIcon></span>
        </div>
      </div>

    </div>

  )
}
