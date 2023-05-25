import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CategoryProduct from "@Models/Product/ProductCategory";
import { getData } from "components/GenericFetch/GenericFetch";
import TableProductCategories from "./TableProductCategory/TableProductCategories";
import ModalAddCategoryProduct from "./ModalAddCategoryProduct/ModalAddCategoryProduct";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setProductCategory } from "@features/ProductCategory/ProductCategorySlice";
import { fetchProductCategory } from "@features/ProductCategory/ProductCategoryThunk";

export default function ProductsCategories() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const dispatch = useAppDispatch()
  const { ProductCategory } = useAppSelector(state => state.productCategories)
  const [search, setSearch] = useState("");



  useEffect(() => {
    dispatch(fetchProductCategory());
  }, []);

  // const [categoryComplete, setCategoryComplete] = useState<CategoryProduct[]>([]);
  // const handleChange = (e: any) => {
  //   setSearch(e.target.value);
  //   filter(e.target.value);
  // };

  // const filter = (serchParam: string) => {
  //   var serchResult = categoryComplete.filter((category: CategoryProduct) => {
  //     if (
  //       category.description.toString()
  //         .toLowerCase()
  //         .includes(serchParam.toLowerCase())
  //     )
  //       return category;
  //   });
  //   setCategory(serchResult);
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
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
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

      <TableProductCategories categories={ProductCategory} />
      <ModalAddCategoryProduct handleClose={handleClose} showModal={showModal} />
    </div>
  );
}
