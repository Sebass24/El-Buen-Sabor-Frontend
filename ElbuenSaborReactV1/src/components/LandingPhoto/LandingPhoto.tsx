import React from "react";
import "./LandingPhoto.scss";

export default function Landing() {
  return (
    <div className="imageHomePage">
      <h1 className="Title">home</h1>
      <div className="Container_Serch_Best_Burguer">
        <p className="Best_Burguer">Mejores hamburguesas de mendoza</p>
        <div className="Container_input">
          <input placeholder="Busqueda" className="Search_Food"></input>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
}
