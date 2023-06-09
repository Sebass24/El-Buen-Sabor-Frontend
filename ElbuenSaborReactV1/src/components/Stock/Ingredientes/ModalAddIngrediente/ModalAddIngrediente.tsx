import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
// import { validacionIngredientes, ingredientesBase } from './DatosForm';
// import FormIngredientesFields from './FormIngredientesFields';
import { ErrorMessage, Field, Form, Formik } from "formik";
// import { addIngredient } from "../../../../features/foods/IngredientSlice.js"
import TextFieldValue from "../../../Inputs/TextFieldValue";
import TextFieldSelect from "../../../Inputs/TextFieldSelect";
import "./FormIngredientesFields.scss";
import Ingredient from "types/Product/Ingredient";
import Category from "types/Product/Category";
import { getData, postPutData } from "components/GenericFetch/GenericFetch";
import { useAppSelector, useAppDispatch } from "@app/Hooks";
import { addIngredient, updateIngredient } from "@features/Ingredients/IngredientsSlice";
import { finishLoading, startLoading } from "@features/Loading/LoadingSlice";
interface props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  ingrediente?: Ingredient;
}

const ModalAddIngrediente = ({
  showModal,
  handleClose,
  editing,
  ingrediente,
}: props) => {

  const { IngredientsCategories } = useAppSelector(state => state.ingredintsCategories)

  const [options, setOptions] = useState<any>([])

  const dispatch = useAppDispatch()

  function categorysToOptions() {
    const array = IngredientsCategories.filter((e) => e.parentCategory !== null)
    const initialopcions = {
      value: "todos",
      label: "",
    };
    setOptions([
      initialopcions,
      ...array.map((option, index) => ({
        value: option.name,
        label: option.name,
      })),
    ]);
  }


  useEffect(() => {

    categorysToOptions()
  }, [IngredientsCategories]);


  const [optionsMesureUnit, setOptionsMesureUnit] = useState<any>([""]);


  async function getMesureUnit() {
    const data: string[] = await getData<string[]>("/api/enum/units")
    const initialopcions = {
      value: "",
      label: "",
    };
    setOptionsMesureUnit([
      initialopcions,
      ...data.map((option, index) => ({
        value: option,
        label: option
      })),
    ]);
  }

  useEffect(() => {
    getMesureUnit()
  }, [])



  const initialValues: Ingredient = {
    name: "",
    ingredientCategory: {
      id: 0,
      name: "todos",
    },
    costPrice: "",
    minimumStock: "",
    currentStock: "",
    measurementUnit: "",
  };

  return (
    <div>
      <Modal
        id={"modal"}
        show={showModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {editing ? (
            <Modal.Title>Editar un Ingrediente:</Modal.Title>
          ) : (
            <Modal.Title>Añadir un Ingrediente:</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              name: Yup.string().required("*Campo requerido"),
              ingredientCategory: Yup.object().shape({
                id: Yup.number().required(),
                name: Yup.string().required().default("todos"),
              }),
              costPrice: Yup.number().required("*Campo requerido"),
              minimumStock: Yup.number().required("*Campo requerido"),
              currentStock: Yup.number().required("*Campo requerido"),
              measurementUnit: Yup.string().required("*Campo requerido"),
            })}
            initialValues={ingrediente ? ingrediente : initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {
              console.log(values)
              if (editing) {
                dispatch(startLoading())
                postPutData(`/api/ingredient`, "PUT", values).then(
                  () => {
                    dispatch(updateIngredient(values))
                  }
                )
                dispatch(finishLoading())
              } else {
                dispatch(startLoading())
                postPutData(`/api/ingredient`, "POST", values).then(
                  () => {
                    dispatch(addIngredient(values))
                  }
                )
                dispatch(finishLoading())
              }
              handleClose();
            }}
          >
            {(Formik) => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    <TextFieldValue
                      label="Nombre:"
                      name="name"
                      type="text"
                      placeholder="Nombre del Ingrediente"
                    />

                    <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: ".3rem 0"
                      }}>
                        <label htmlFor={"ingredientCategory"} style={{ color: "black", fontFamily: "inter", fontSize: "14px", fontWeight: 'bold' }}>
                          {"Rubro:"}
                        </label>
                      </div>
                      <Field
                        className={`form-control  mb-3  input-formulario`}
                        name={"ingredientCategory"}
                        as={"select"}
                        onChange={(event: any) => {
                          let category = IngredientsCategories.filter((categor) => {
                            return categor.name === event.target.value
                          })
                          if (category.length === 0) {
                            category = [{ id: 0, name: "todos" }]
                          }
                          Formik.setFieldValue("ingredientCategory", category[0]);
                        }}
                        value={Formik.values.ingredientCategory.name}
                      >
                        {options.map((opcion: any, i: any) => {
                          return (
                            <option key={i} value={opcion.value} >
                              {opcion.label}
                            </option>
                          );
                        })}

                      </Field>
                      <ErrorMessage
                        component="div"
                        name={"ingredientCategory"}
                        className="error"
                      />
                    </div>

                    <TextFieldValue
                      label="Precio de costo:"
                      name="costPrice"
                      type="number"
                      placeholder="Precio de costo del Ingrediente"
                    />
                    <TextFieldValue
                      label="Stock minimo:"
                      name="minimumStock"
                      type="number"
                      placeholder="Stock minimo del Ingrediente"
                    />
                    <TextFieldValue
                      label="Stock actual:"
                      name="currentStock"
                      type="number"
                      placeholder="Stock actual del Ingrediente"
                    />

                    <TextFieldSelect
                      label="Unidad de medida:"
                      name="measurementUnit"
                      options={optionsMesureUnit}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit">
                      Enviar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div >
  );
};

export default ModalAddIngrediente;
