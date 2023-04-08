import { createSlice } from "@reduxjs/toolkit";

export const IngredientSlice = createSlice({
  name: "ingredient",
  initialState: [{
    Nombre: "salsa",
    Rubro: "Salsas",
    PrecioCosto: 340,
    StockMinimo: 2,
    StockActual: 5,
    UnidadMedida: "cm3",
    NivelStock: "Optimo",
    Estado: "Baja"
  },
  {
    Nombre: "pepino",
    Rubro: "Verduras",
    PrecioCosto: 500,
    StockMinimo: 2,
    StockActual: 5,
    UnidadMedida: "cm3",
    NivelStock: "Optimo",
    Estado: "Alta"
  },],
  reducers: {
    addIngredient: (state, action) => {
      state.push(action.payload)
    }
  }
})
export const { addIngredient } = IngredientSlice.actions;
export default IngredientSlice.reducer 