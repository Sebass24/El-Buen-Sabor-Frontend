import React, { useEffect, useState } from "react";
import "./Productos.scss";
import { Button } from "react-bootstrap";
import TableProducts from "./TableProducts/TableProducts";

import ModalAddProducts from "./ModalAddProduct/ModalAddProducts";
import Products from "@Models/Product/Product";
import { getData } from "components/GenericFetch/GenericFetch";

const Productos = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  // const productosPrueba: Products[] = [
  //   {
  //     Nombre: "Hamburguesa veggi",
  //     Rubro: "Alta",
  //     PrecioVenta: 500,
  //     TiempoCocina: 45,
  //     Receta: "pepe el carlos vivia muy feliz en su casa de madrid",
  //     Estado: "Alta",
  //     Ingredients: [
  //       {
  //         "Ingredient": "Alta",
  //         "Cuantity": 123,
  //         "UMedida": "L",
  //       },
  //       {
  //         "Ingredient": "Alta",
  //         "Cuantity": 123,
  //         "UMedida": "L",
  //       },
  //       {
  //         "Ingredient": "Alta",
  //         "Cuantity": 123,
  //         "UMedida": "L",
  //       }
  //     ],
  //     Descripcion: "capo"
  //   },
  //   {
  //     Nombre: "Hamburguesa veggi y lechuga",
  //     Rubro: "Alta",
  //     PrecioVenta: 500,
  //     TiempoCocina: 45,
  //     Estado: "Alta",
  //     Receta: "pepe el carlos vivia muy feliz en su casa de madrid",
  //     Ingredients: [
  //       {
  //         "Ingredient": "Alta",
  //         "Cuantity": 123,
  //         "UMedida": "L",
  //       },
  //       {
  //         "Ingredient": "Alta",
  //         "Cuantity": 123,
  //         "UMedida": "L",
  //       },
  //       {
  //         "Ingredient": "Alta",
  //         "Cuantity": 123,
  //         "UMedida": "L",
  //       }
  //     ],
  //     Descripcion: "capo"
  //   },
  //   {
  //     Nombre: "Hamburguesa veggi y tomate",
  //     Rubro: "Alta",
  //     PrecioVenta: 500,
  //     Receta: "pepe el carlos vivia muy feliz en su casa de madrid",
  //     TiempoCocina: 45,
  //     Estado: "Alta",
  //     Ingredients: [
  //       {
  //         "Ingredient": "Alta",
  //         "Cuantity": 123,
  //         "UMedida": "L",
  //       },
  //       {
  //         "Ingredient": "Alta",
  //         "Cuantity": 123,
  //         "UMedida": "L",
  //       },
  //       {
  //         "Ingredient": "Alta",
  //         "Cuantity": 123,
  //         "UMedida": "L",
  //       }
  //     ],
  //     Descripcion: "capo"
  //   },

  // ]

  const [product, setProduct] = useState<Products[]>([]);
  const [productComplete, setProductComplete] = useState<Products[]>([]);
  const [search, setSearch] = useState("");
  console.log(product);
  async function getProducts() {
    const data: Products[] = await getData<Products[]>("/api/product");
    setProduct(data);
    setProductComplete(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e: any) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };

  const filter = (serchParam: string) => {
    var serchResult = productComplete.filter((productVal: Products) => {
      if (
        productVal.name
          .toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        productVal.productCategory
          ?.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        productVal.sellPrice
          .toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase()) ||
        productVal.cookingTime
          ?.toString()
          .toLowerCase()
          .includes(serchParam.toLowerCase())
      )
        return productVal;
    });
    setProduct(serchResult);
  };

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
            value={search}
            onChange={handleChange}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "black" }}
          ></i>
        </div>
      </div>
      <TableProducts products={product} />
      <ModalAddProducts showModal={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Productos;
