import Users from '@Models/Users/User';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import TableUsers from '../TableUsers/TableUsers';
import { getData } from 'components/GenericFetch/GenericFetch';

export default function Empleoyees() {

  const [users, setUsers] = useState<Users[]>([]);
  const [usersComplete, setUsersComplete] = useState<Users[]>([]);
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("")
  async function getUser() {
    const data = await getData<Users[]>(`/api/user/Empleoyees${estado != '' && search != '' ? `?rol=${estado}&name=${search}` :
      (estado != '' && search == '' ? `?rol=${estado}` :
        (estado == '' && search != '' ? `?&name=${search}` : ""))}`)
    console.log(`/api/user/Empleoyees${estado != '' && search != '' ? `?rol=${estado}&name=${search}` :
      (estado != '' && search == '' ? `?rol=${estado}` :
        (estado == '' && search != '' ? `?&name=${search}` : ""))}`)
    setUsers(data)
  }

  useEffect(() => {
    getUser()
  }, [estado])

  return (
    <div className='Container_Ingredientes' >
      <div className="actions_Ingredientes">
        <div className="actions_Ingredientes_buttons">

          <Button variant="success">
            Nuevo
          </Button>
        </div>
        <div>
          <span>Rol: </span>
          <select className="Select_nivelStock" value={estado} onChange={(e) => { setEstado(e.target.value) }}>
            <option value={""}>Todos</option>
            <option value={"Administrador"}>Administrador</option>
            <option value={"Cocinero"}>Cocinero</option>
            <option value={"Cajero"}>Cajero</option>
            <option value={"Delivery"}>Delivery</option>
          </select>
        </div>
        <div className="Container_input">
          <input
            placeholder="Busqueda"
            className="busqueda_comida"
            value={search}
            onChange={async (e) => {
              setSearch(e.target.value)
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                getUser()
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              getUser()
            }}
            style={{ color: "black", cursor: "pointer" }}
          ></i>
        </div>
      </div>

      <TableUsers
        Users={users}
      />


    </div>
  )
}
