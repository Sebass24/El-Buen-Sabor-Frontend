import React, { useEffect, useState } from "react";
import "./Productos.scss";
import { Button } from "react-bootstrap";
import TableProducts from "./TableProducts/TableProducts";

import ModalAddProducts from "./ModalAddProduct/ModalAddProducts";
import Products from "@Models/Product/Product";
import { getData } from "components/GenericFetch/GenericFetch";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { fetchProducts } from "@features/ProductSlice/ProductThunk";
import { setProducts } from "@features/ProductSlice/ProductSlice";
import Product from "@Models/Product/Product";

const Productos = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const { Products } = useAppSelector(state => state.product)
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  async function getProductsSearch(name: string) {
    if (name !== "") {
      const data: Product[] = await getData<Product[]>(`/api/product/name/${name}`);
      dispatch(setProducts(data))
    } else {
      dispatch(fetchProducts())
    }
  }

  return (
    <div className="Container_Ingredientes">
      <div className="actions_Ingredientes">
        <Button variant="success" onClick={() => setShowModal(true)}>
          Nuevo
        </Button>

        <div className="Container_input">
          <input
            placeholder="Busqueda"
            onChange={(event) => {
              setSearch(event.target.value)
              if (event.target.value === "") {
                dispatch(fetchProducts())
              }
            }}
            className="busqueda_comida"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                getProductsSearch(search)
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              getProductsSearch(search)
            }}
            style={{ color: "black", cursor: "pointer" }}
          ></i>
        </div>
      </div>
      <TableProducts products={Products} />
      <ModalAddProducts showModal={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Productos;
