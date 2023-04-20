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
export interface Options{
  value:string;
  label:string;
}