import Users from '@Models/Users/User';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import TableUsers from '../TableUsers/TableUsers';
import { getData } from 'components/GenericFetch/GenericFetch';
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { fetchClients } from '@features/Clients/ClientThunk';
import { setClients } from '@features/Clients/ClientSlice';

export default function Clients() {

  const { Clients } = useAppSelector(state => state.clients)
  const dispatch = useAppDispatch()
  const [usersComplete, setUsersComplete] = useState<Users[]>([]);
  const [search, setSearch] = useState("");

  async function getUser() {
    const data = await getData<Users[]>(`/api/user/Clients${search != "" ? `?name=${search}` : ""}`)
    dispatch(setClients(data))
  }

  useEffect(() => {
    dispatch(fetchClients())
  }, [])

  return (
    <div className='Container_Ingredientes' >
      <div className='actions_Ingredientes'>
        <Button variant="success">Nuevo</Button>

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
        Users={Clients}
      />


    </div>
  )
}
