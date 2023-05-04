export interface Ingredient {
  Nombre: string;
  Rubro: string;
  PrecioCosto: number;
  StockMinimo: number;
  StockActual: number;
  UnidadMedida: string;
  NivelStock?: string;
  Estado: string;
}

export interface cashierOrder {
  IdPedido: number;
  FechaPedido: string;
  FormaEntrega: string;
  FormaPago: string;
  Pagado: string;
  Estado: string;
}

export interface Options {
  value: string;
  label: string;
}

export interface Products {
  Nombre: string;
  Rubro: string;
  PrecioVenta: number;
  TiempoCocina: number;
  Estado: string;
  Descripcion: string;
  Ingredients?: OrderIngredient[]
}

export interface Category {
  Name: string;
  FatherCategory?: string;
  State: string;
}

export interface Users {
  Name: string;
  Email: string;
  Phone: number;
  Adress: string;
  Location: string;
  State: string;
}

export interface DeliveryOrder {
  IdOrder: number;
  OrderDate: string;
  Client: string;
  Adress: string;
  Location: string;
  Phone: number;
}

export interface OrderIngredient {
  Ingredient: string;
  Cuantity: Number;
  UMedida: string;
}
