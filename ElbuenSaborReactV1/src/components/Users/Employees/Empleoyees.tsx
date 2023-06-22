import Users from 'types/Users/User';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import TableUsers from '../TableUsers/TableUsers';
import { getData } from 'components/GenericFetch/GenericFetch';
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { fetchEmpleoyees } from '@features/Empleoyees/EmpleoyeesThunk';
import { setEmpleoyees } from '@features/Empleoyees/empleoyeeSlice';
import { ModalAddUserAdmin } from '../ModalAddUserAdmin/ModalAddUserAdmin';

export default function Empleoyees() {

  const { Empleoyees } = useAppSelector(state => state.empleoyees)
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("")
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  async function getUser() {
    const data = await getData<Users[]>(`/api/user/Empleoyees${estado != '' && search != '' ? `?rol=${estado}&name=${search}` :
      (estado != '' && search == '' ? `?rol=${estado}` :
        (estado == '' && search != '' ? `?&name=${search}` : ""))}`)
    dispatch(setEmpleoyees(data))
  }

  useEffect(() => {
    getUser()
  }, [estado])

  useEffect(() => {
    dispatch(fetchEmpleoyees() as any)
  }, [])

  return (
    <div className='Container_Ingredientes' >
      <div className="actions_Ingredientes">
        <div className="actions_Ingredientes_buttons">

          <Button variant="success" onClick={() => (setShowModal(true))}>
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
        Users={Empleoyees}
        client={false}
      />
      <ModalAddUserAdmin
        showModal={showModal}
        handleClose={handleClose}

      />

    </div>
  )
}
