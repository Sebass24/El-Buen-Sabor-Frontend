import * as Yup from "yup";

export const ingredientesBase =
{
  Nombre: "",
  Rubro: "",
  PrecioCosto: 0,
  StockMinimo: 0,
  StockActual: 0,
  UnidadMedida: "",
  Estado: ""
}

export const validacionIngredientes = {
  Nombre: Yup.string().required("*Campo requerido"),
  Rubro: Yup.string().required("*Campo requerido"),
  PrecioCosto: Yup.number().required("*Campo requerido"),
  StockMinimo: Yup.number().required("*Campo requerido"),
  StockActual: Yup.number().required("*Campo requerido"),
  UnidadMedida: Yup.string().required("*Campo requerido"),
  Estado: Yup.string().required("*Campo requerido"),
};

