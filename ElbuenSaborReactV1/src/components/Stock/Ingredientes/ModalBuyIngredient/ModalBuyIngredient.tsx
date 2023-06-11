import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from "yup";
// import { validacionIngredientes, ingredientesBase } from './DatosForm';
// import FormIngredientesFields from './FormIngredientesFields';
import { Form, Formik } from 'formik';
// import { addIngredient } from "../../../../features/foods/IngredientSlice.js"
import { useDispatch } from 'react-redux';
import TextFieldValue from '../../../Inputs/TextFieldValue';
import TextFieldSelect from '../../../Inputs/TextFieldSelect';
import { FormikHelpers } from 'formik';
import IngredientBuy from '@Models/Product/IngredientBuy';
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import TextFildSelectValue from 'components/Inputs/TextFildSelectValue';
import Ingredient from '@Models/Product/Ingredient';
import { postPutData } from 'components/GenericFetch/GenericFetch';
import { addIngredient, updateIngredient } from '@features/Ingredients/IngredientsSlice';
import { current } from '@reduxjs/toolkit';
import { finishLoading, startLoading } from '@features/Loading/LoadingSlice';

interface props {
  showModal: boolean;
  handleClose: () => void;
  setShowModalNew: any;
  handleCloseNew: () => void;
}
const emptyIngredient: Ingredient =
{
  id: 0,
  name: "",
  ingredientCategory: { name: "" },
  minimumStock: "",
  currentStock: "",
  measurementUnit: "",
  costPrice: "",
};
export default function ModalBuyIngredient({ showModal, handleClose, handleCloseNew, setShowModalNew }: props) {

  const dispatch = useAppDispatch()
  const { Ingredients } = useAppSelector((state) => state.ingredients);

  const [optionsIngredients, setOptionsIngredients] = useState<any>([]);
  function categorysToOptions() {
    const initialopcions = {
      value: "",
      label: "",
    };
    setOptionsIngredients([
      initialopcions,
      ...Ingredients.map((option, index) => ({
        value: option.id?.toString(),
        label: option.name,
      })),
    ]);
  }

  useEffect(() => {
    categorysToOptions();
  }, [Ingredients]);

  const initialValues: IngredientBuy = {
    ingredient: emptyIngredient,
    Cuantity: null as any,
    PriceCost: null as any
  }
  const handleNew = () => {
    handleClose()
    setShowModalNew(true)
  }

  return (
    <div>
      <Modal id={"modal"} show={showModal} onHide={handleClose} size={"sm"} backdrop="static"
        keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Compra de Stock:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              ingredient: Yup.object().shape({
                name: Yup.string().required("Campo Requerido"),
                ingredientCategory: Yup.object().shape({
                  id: Yup.number().required(),
                  name: Yup.string().required("Campo Requerido"),
                }),
                minimumStock: Yup.number(),
                currentStock: Yup.number(),
                measurementUnit: Yup.string(),
                costPrice: Yup.number(),
              }).required("Campo Requerido"),
              Cuantity: Yup.number().required("*Campo requerido"),
              PriceCost: Yup.number().required("*Campo requerido"),
            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {

              const ingredienteEdit: Ingredient = {
                ...values.ingredient, currentStock: values.Cuantity + values.ingredient.currentStock,
                costPrice: values.PriceCost
              }

              dispatch(startLoading())
              postPutData(`/api/ingredient`, "PUT", ingredienteEdit).then(
                () => {
                  dispatch(updateIngredient(ingredienteEdit))
                }
              )
              dispatch(finishLoading())
              handleClose()
            }}
          >
            {(Formik) =>
            (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div >
                    <TextFildSelectValue
                      label="Ingrediente:"
                      name={`ingredient`}
                      options={optionsIngredients}
                      onChange={(event: any) => {
                        let ingredient = Ingredients.filter((ingre) => {
                          return ingre.id?.toString() == event.target.value
                        })
                        if (ingredient.length === 0) {
                          ingredient = [emptyIngredient]
                        }
                        Formik.setFieldValue(`ingredient`, ingredient[0]);
                      }}
                      value={Formik.values.ingredient.id?.toString()}

                    />
                    <TextFieldValue
                      label="Cantidad:"
                      name="Cuantity"
                      type="number"
                      placeholder="Cantidad Comprada"
                    />
                    <TextFieldValue
                      label="Precio de costo:"
                      name="PriceCost"
                      type="number"
                      placeholder="Precio de costo del Ingrediente"
                    />


                  </div>
                  <div className="d-flex justify-content-between">
                    <Button variant="danger" onClick={handleClose} type='button'>
                      Cancelar
                    </Button>
                    <Button variant="warning" type='button' onClick={handleNew}>
                      Nuevo
                    </Button>
                    <Button variant="success" type="submit" >
                      Enviar
                    </Button>
                  </div>
                </Form>
              </>
            )
            }
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

