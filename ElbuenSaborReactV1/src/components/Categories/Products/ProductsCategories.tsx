import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CategoryProduct from "@Models/Product/ProductCategory";
import { getData } from "components/GenericFetch/GenericFetch";
import TableProductCategories from "./TableProductCategory/TableProductCategories";
import ModalAddCategoryProduct from "./ModalAddCategoryProduct/ModalAddCategoryProduct";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setProductCategory } from "@features/ProductCategory/ProductCategorySlice";
import { fetchProductCategory } from "@features/ProductCategory/ProductCategoryThunk";
import ProductCategory from "@Models/Product/ProductCategory";

export default function ProductsCategories() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const dispatch = useAppDispatch()
  const { ProductCategory } = useAppSelector(state => state.productCategories)
  const [search, setSearch] = useState("");


  async function getProductCategorySearch(name: string) {
    if (name !== "") {
      const data: ProductCategory[] = await getData<ProductCategory[]>(`/api/category/name/${name}`);
      dispatch(setProductCategory(data))
    } else {
      dispatch(fetchProductCategory() as any)
    }
  }


  useEffect(() => {
    dispatch(fetchProductCategory() as any);
  }, []);



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
                dispatch(fetchProductCategory() as any)
              }
            }}
            className="busqueda_comida"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                getProductCategorySearch(search)
              }
            }}
          ></input>
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              getProductCategorySearch(search)
            }}
            style={{ color: "black", cursor: "pointer" }}
          ></i>
        </div>
      </div>

      <TableProductCategories categories={ProductCategory} />
      <ModalAddCategoryProduct handleClose={handleClose} showModal={showModal} />
    </div>
  );
}
