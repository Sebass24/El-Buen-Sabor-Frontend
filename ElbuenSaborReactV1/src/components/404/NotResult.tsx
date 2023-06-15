import React from 'react'
import "./NotFound.scss"

export default function NotResult() {
  return (
    <div className="CointainerNotFound">
      <img src="/logo-png.png" alt="" style={{ height: "10rem" }} />
      <h1>404</h1>
      <p>No existen resultados para la busqueda</p>
    </div>
  )
}
