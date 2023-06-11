import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import TableCategories from '../TableCategories/TableCategories';
import Category from '@Models/Product/Category';
import ModalAddCategories from '../ModalAddCategories/ModalAddCategories';
import { getData } from 'components/GenericFetch/GenericFetch';
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { setIngredientsCategories } from '@features/IngredientCategory/IngredientCategorySlice';
import { fetchIngredientCategory } from '@features/IngredientCategory/IngredientCategoryThunk';
import IngredientCategory from '@Models/Product/Ingredient/IngredientCategory';

export default function IngredientsCategories() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false)
  }

  const dispatch = useAppDispatch();
  const { IngredientsCategories } = useAppSelector(state => state.ingredintsCategories)
  const [search, setSearch] = useState("");

  async function getIngredientCategorySearch(name: string) {
    if (name !== "") {
      const data: IngredientCategory[] = await getData<IngredientCategory[]>(`/api/rubro/name/${name}`);
      dispatch(setIngredientsCategories(data))
    } else {
      dispatch(fetchIngredientCategory())
    }
  }


  useEffect(() => {
    dispatch(fetchIngredientCategory())
  }, []);



  return (
    <div className='Container_Ingredientes' >
      <div className='actions_Ingredientes'>
        <Button variant="success" onClick={() => setShowModal(true)}>Nuevo</Button>

        <div className="Container_input">
          <input
            placeholder="Busqueda"
            onChange={(event) => {
              setSearch(event.target.value)
              if (event.target.value === "") {
                dispatch(fetchIngredientCategory())
              }
            }}
            className="busqueda_comida"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                getIngredientCategorySearch(search)
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              getIngredientCategorySearch(search)
            }}
            style={{ color: "black", cursor: "pointer" }}
          ></i>
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
