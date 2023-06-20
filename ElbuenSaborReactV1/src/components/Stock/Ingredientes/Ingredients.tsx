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
  const [estado, setEstado] = useState("")

  const [showModalBuy, setShowModalBuy] = useState(false);
  const handleCloseBuy = () => {
    setShowModalBuy(false);
  };

  const { Ingredients } = useAppSelector(state => state.ingredients)


  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients() as any)
    setSearch("")
  }, []);

  async function getIngredientsSearch(name: string) {
    if (name !== "" || estado !== "") {
      const data: Ingredient[] = await getData<Ingredient[]>(`/api/ingredient/nameAndState?name=${name}&state=${estado}`);
      dispatch(setIngredients(data))
    } else {
      dispatch(fetchIngredients() as any)
    }
  }

  useEffect(() => {
    getIngredientsSearch(search)
  }, [estado]);


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
          <select className="Select_nivelStock" value={estado} onChange={(e) => { setEstado(e.target.value) }}>
            <option value={""}>Todos</option>
            <option value={"FALTANTE"}>Faltante</option>
            <option value={"OPTIMO"}>Optimo</option>
            <option value={"PEDIR"}>Pedir</option>
          </select>
        </div>
        <div className="Container_input">
          <input
            placeholder="Busqueda"
            className="busqueda_comida"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              if (e.target.value === "") {
                getIngredientsSearch(search)
              }
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                getIngredientsSearch(search)
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              getIngredientsSearch(search)
            }}
            style={{ color: "black", cursor: "pointer" }}
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
