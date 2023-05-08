import React from "react";
import "./NotFound.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="CointainerNotFound">
      <img src="/logo-png.png" alt="" />
      <h1>404</h1>
      <p>La pagina que intenta buscar no existe</p>
      <Link to="/">
        <Button>Volver</Button>
      </Link>
    </div>
  );
}
