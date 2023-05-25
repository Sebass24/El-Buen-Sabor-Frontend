import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import TableCategories from '../TableCategories/TableCategories';
import Category from '@Models/Product/Category';
import ModalAddCategories from '../ModalAddCategories/ModalAddCategories';
import { getData } from 'components/GenericFetch/GenericFetch';
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { setIngredientsCategories } from '@features/IngredientCategory/IngredientCategorySlice';
import { fetchIngredientCategory } from '@features/IngredientCategory/IngredientCategoryThunk';

export default function IngredientsCategories() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false)
  }

  const dispatch = useAppDispatch();
  const { IngredientsCategories } = useAppSelector(state => state.ingredintsCategories)
  const [search, setSearch] = useState("");


  useEffect(() => {
    dispatch(fetchIngredientCategory())
  }, []);

  // const [categoryComplete, setCategoryComplete] = useState<Category[]>([]);
  // const handleChange = (e: any) => {
  //   setSearch(e.target.value);
  //   filter(e.target.value);
  // };


  // const filter = (serchParam: string) => {
  //   var serchResult = categoryComplete.filter((category: Category) => {
  //     if (
  //       category.name.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       category.parentCategory?.name?.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase())
  //     )
  //       return category;
  //   });
  //   setCategory(serchResult);
  // };



  return (
    <div className='Container_Ingredientes' >
      <div className='actions_Ingredientes'>
        <Button variant="success" onClick={() => setShowModal(true)}>Nuevo</Button>

        <div className="Container_input">
          <input placeholder="Busqueda" className="busqueda_comida" value={search} onChange={(e) => (setSearch(e.target.value))} onKeyUp={(event) => {
            if (event.key === "Enter") {
              // handleChange(event);
            }
          }}></input>
          <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
        </div>
      </div>

      <TableCategories categories={IngredientsCategories} />
      <ModalAddCategories
        handleClose={handleClose}
        showModal={showModal}
      />

    </div>
  )
}
