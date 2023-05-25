import React, { useEffect, useState } from "react";
import "./Productos.scss";
import { Button } from "react-bootstrap";
import TableProducts from "./TableProducts/TableProducts";

import ModalAddProducts from "./ModalAddProduct/ModalAddProducts";
import Products from "@Models/Product/Product";
import { getData } from "components/GenericFetch/GenericFetch";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { fetchProducts } from "@features/ProductSlice/ProductThunk";

const Productos = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const { Products } = useAppSelector(state => state.product)

  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // const handleChange = (e: any) => {
  //   setSearch(e.target.value);
  //   filter(e.target.value);
  // };

  // const filter = (serchParam: string) => {
  //   var serchResult = Products.filter((productVal: Products) => {
  //     if (
  //       productVal.name
  //         .toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       productVal.productCategory
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       productVal.sellPrice
  //         .toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase()) ||
  //       productVal.cookingTime
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase())
  //     )
  //       return productVal;
  //   });
  //   setProduct(serchResult);
  // };

  return (
    <div className="Container_Ingredientes">
      <div className="actions_Ingredientes">
        <Button variant="success" onClick={() => setShowModal(true)}>
          Nuevo
        </Button>

        <div className="Container_input">
          <input
            placeholder="Busqueda"
            className="busqueda_comida"
            value={search} onChange={(e) => (setSearch(e.target.value))}
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
      <TableProducts products={Products} />
      <ModalAddProducts showModal={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Productos;
