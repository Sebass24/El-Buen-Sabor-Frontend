import { Users } from '@Models/types';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import TableUsers from '../TableUsers/TableUsers';

export default function Clients() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false)
  }
  const prueba: Users[] = [
    {
      Name: "Franco",
      Email: "Franco.gonzalez@gmail.com",
      Adress: "Hypolito 78 ",
      Location: "Godoy Cruz",
      Phone: 2615484321,
      State: "Alta"
    },
    {
      Name: "Seba",
      Email: "seba254@gmail.com",
      Adress: "luzuriaga 500 ",
      Location: "5ta seccion",
      Phone: 6541843515,
      State: "Baja"
    },
  ]

  const [users, setUsers] = useState<Users[]>(prueba);
  const [usersComplete, setUsersComplete] = useState<Users[]>(prueba);
  const [search, setSearch] = useState("");


  const handleChange = (e: any) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };


  const filter = (serchParam: string) => {
    var serchResult = usersComplete.filter((user: Users) => {
      if (
        user.Name.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        user.Email.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        user.Phone.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        user.Location.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        user.Adress.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        user.State.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase())
      )
        return user;
    });
    setUsers(serchResult);
  };

  return (
    <div className='Container_Ingredientes' >
      <div className='actions_Ingredientes'>
        <Button variant="success" onClick={() => setShowModal(true)}>Nuevo</Button>

        <div className="Container_input">
          <input placeholder="Busqueda" className="busqueda_comida" value={search} onChange={handleChange}></input>
          <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
        </div>
      </div>


      <TableUsers
        Users={users}
      />


    </div>
  )
}
