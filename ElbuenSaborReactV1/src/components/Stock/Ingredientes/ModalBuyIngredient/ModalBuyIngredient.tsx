import React, { ChangeEvent } from 'react';
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

interface props {
  showModal: boolean;
  handleClose: () => void;
  setShowModalNew: any;
  handleCloseNew: () => void;
}

export default function ModalBuyIngredient({ showModal, handleClose, handleCloseNew, setShowModalNew }: props) {

  const initialValues: IngredientBuy = {
    Ingredient: "",
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
              Ingredient: Yup.string().required("*Campo requerido"),
              Cuantity: Yup.number().required("*Campo requerido"),
              PriceCost: Yup.number().required("*Campo requerido"),
            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {
              handleClose()
            }}
          >
            {(Formik) =>
            (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div >
                    <TextFieldSelect
                      label="Ingrediente:"
                      name="Ingredient"
                      options={[
                        { value: '', label: "" },
                        { value: '1', label: "papa" },
                        {
                          value: "2",
                          label: "cebolla",
                        },
                        { value: "10", label: "queso" },
                      ]}
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

