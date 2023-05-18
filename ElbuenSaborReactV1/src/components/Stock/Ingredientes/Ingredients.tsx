import React, { useEffect, useState } from "react";
import "./Ingredients.scss";
import { Button } from "react-bootstrap";
import TableIngredients from "./TableIngredients/TableIngredients";
import ModalAddIngrediente from "./ModalAddIngrediente/ModalAddIngrediente";
import Ingredient from "@Models/Product/Ingredient";
import ModalBuyIngredient from "./ModalBuyIngredient/ModalBuyIngredient";
import { getData } from "../../GenericFetch/GenericFetch";
import { useAppDispatch } from "@app/Hooks";
import { setIngredients } from "@features/Ingredients/IngredientsSlice";

const Ingredients = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const [showModalBuy, setShowModalBuy] = useState(false);
  const handleCloseBuy = () => {
    setShowModalBuy(false);
  };

  // const ingredientesPrueba: Ingredient[] = [
  //   {
  //     Nombre: "salsa",
  //     Rubro: "Salsas",
  //     PrecioCosto: 340,
  //     StockMinimo: 2,
  //     StockActual: 5,
  //     UnidadMedida: "cm3",
  //     NivelStock: "Optimo",
  //     Estado: "Baja",
  //   },
  //   {
  //     Nombre: "pepino",
  //     Rubro: "Verduras",
  //     PrecioCosto: 500,
  //     StockMinimo: 2,
  //     StockActual: 5,
  //     UnidadMedida: "cm3",
  //     NivelStock: "Optimo",
  //     Estado: "Alta",
  //   },
  // ];

  const [ingredient, setIngredient] = useState<Ingredient[]>([]);
  const [ingredientComplete, setIngredientComplete] = useState<Ingredient[]>(
    []
  );
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  async function getIngredients() {
    const data: Ingredient[] = await getData<Ingredient[]>("/api/ingredient");
    setIngredient(data);
    setIngredientComplete(data);
    dispatch(setIngredients(data));
  }
  useEffect(() => {
    getIngredients();
  }, []);

  const handleChange = (e: any) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };

  const filter = (serchParam: string) => {
    var serchResult = ingredientComplete.filter((ingredientVal: Ingredient) => {
      if (
        ingredientVal.name
          .toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        ingredientVal.ingredientCategory.name
          ?.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        ingredientVal.costPrice
          ?.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        ingredientVal.minimumStock
          ?.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        ingredientVal.currentStock
          ?.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        ingredientVal.measurementUnit
          ?.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase())
      )
        return ingredient;
    });
    setIngredient(serchResult);
  };

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
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleChange(event);
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "black" }}
          ></i>
        </div>
      </div>
      <TableIngredients Ingredients={ingredient} />
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
