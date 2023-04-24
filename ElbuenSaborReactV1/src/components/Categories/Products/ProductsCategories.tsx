import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import TableCategories from '../TableCategories/TableCategories';
import { Category } from '@Models/types';
import ModalAddCategories from '../ModalAddCategories/ModalAddCategories';

export default function ProductsCategories() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false)
  }

  const prueba: Category[] = [
    {
      Name: "Verdura",
      FatherCategory: "",
      State: "Alta"
    },
    {
      Name: "zanahoria",
      FatherCategory: "Verdura",
      State: "Baja"
    },
  ]

  const [category, setCategory] = useState<Category[]>(prueba);
  const [categoryComplete, setCategoryComplete] = useState<Category[]>(prueba);
  const [search, setSearch] = useState("");


  const handleChange = (e: any) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };


  const filter = (serchParam: string) => {
    var serchResult = categoryComplete.filter((category: Category) => {
      if (
        category.Name.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        category.FatherCategory?.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        category.State.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase())
      )
        return category;
    });
    setCategory(serchResult);
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

      <TableCategories categories={category} />
      <ModalAddCategories
        handleClose={handleClose}
        showModal={showModal}
      />


    </div>
  )
}
