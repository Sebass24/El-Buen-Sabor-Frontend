import React, { useEffect, useState } from "react";
import "./Ingredients.scss";
import { Button } from "react-bootstrap";
import TableIngredients from "./TableIngredients/TableIngredients";
import ModalAddIngrediente from "./ModalAddIngrediente/ModalAddIngrediente";
import Ingredient from "@Models/Product/Ingredient";
import ModalBuyIngredient from "./ModalBuyIngredient/ModalBuyIngredient";
import { getData } from "../../GenericFetch/GenericFetch";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setIngredients } from "@features/Ingredients/IngredientsSlice";
import { fetchIngredients } from "@features/Ingredients/IngredientsThunks";

const Ingredients = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const [showModalBuy, setShowModalBuy] = useState(false);
  const handleCloseBuy = () => {
    setShowModalBuy(false);
  };

  const { Ingredients } = useAppSelector(state => state.ingredients)


  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients())
  }, []);

  // const [ingredientFilter, setIngredientFilter] = useState<Ingredient[]>(Ingredients);
  // const handleChange = (e: any) => {
  //   setSearch(e.target.value);
  //   filter(e.target.value);
  // };

  // const filter = (serchParam: string) => {
  //   var serchResult = Ingredients.filter((ingredientVal: Ingredient) => {
  //     if (
  //       ingredientVal.name
  //         .toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       ingredientVal.ingredientCategory.name
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       ingredientVal.costPrice
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       ingredientVal.minimumStock
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       ingredientVal.currentStock
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       ingredientVal.measurementUnit
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase())
  //     )
  //       return ingredientVal;
  //   });
  //   setIngredientFilter(serchResult);
  // };

  return (
    <div className="Container_Ingredientes">
      <div className="actions_Ingredientes">
        <div className="actions_Ingredientes_buttons">
          <Button variant="warning" onClick={() => setShowModalBuy(true)}>
            Registrar Compra
          </Button>
          <Button variant="success" onClick={() => setShowModal(true)}>
            Nuevo
          </Button>
        </div>
        <div>
          <span>Nivel de stock: </span>
          <select className="Select_nivelStock">
            <option>Todos</option>
            <option>Faltante</option>
            <option>Optimo</option>
            <option>Pedir</option>
          </select>
        </div>
        <div className="Container_input">
          <input
            placeholder="Busqueda"
            className="busqueda_comida"
            value={search}
            onChange={(e) => (setSearch(e.target.value))}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                // handleChange(event);
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "black" }}
          ></i>
        </div>
      </div>
      <TableIngredients Ingredients={Ingredients} />
      <ModalAddIngrediente showModal={showModal} handleClose={handleClose} />

      <ModalBuyIngredient
        handleClose={handleCloseBuy}
        showModal={showModalBuy}
        handleCloseNew={handleClose}
        setShowModalNew={setShowModal}
      />
    </div>
  );
};

export default Ingredients;
