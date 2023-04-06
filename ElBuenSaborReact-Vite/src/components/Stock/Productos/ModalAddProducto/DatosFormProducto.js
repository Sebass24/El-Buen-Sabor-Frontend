import * as Yup from "yup";

export const ProductoBase =
{
  Nombre: "",
  Rubro: "",
  PrecioVenta: "",
  TiempoCocina: "",
  Estado: "",
  Descripcion: ""
}

export const validacionProductos = {
  Nombre: Yup.string().required("*Campo requerido"),
  Rubro: Yup.string().required("*Campo requerido"),
  PrecioVenta: Yup.number().required("*Campo requerido"),
  TiempoCocina: Yup.number().required("*Campo requerido"),
  Estado: Yup.string().required("*Campo requerido"),
  Descripcion: Yup.string().required("*Campo requerido"),
};

