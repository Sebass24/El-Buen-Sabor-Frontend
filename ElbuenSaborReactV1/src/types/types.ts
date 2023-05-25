
import Base from "./Base";

export interface cashierOrder {
  IdPedido: number;
  FechaPedido: string;
  FormaEntrega: string;
  FormaPago: string;
  Pagado: string;
  Estado: string;
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
