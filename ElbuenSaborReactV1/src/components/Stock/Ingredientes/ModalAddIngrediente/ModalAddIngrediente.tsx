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
import "./FormIngredientesFields.scss"
import { FormikHelpers } from 'formik';
import { Ingredient } from '@Models/types';

interface props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  ingrediente?: Ingredient;
}



const ModalAddIngrediente = ({ showModal, handleClose, editing }: props) => {

  const initialValues: Ingredient = {
    Nombre: "",
    Rubro: "",
    PrecioCosto: NaN,
    StockMinimo: NaN,
    StockActual: NaN,
    UnidadMedida: "",
    Estado: ""
  }

  return (
    <div>
      <Modal id={"modal"} show={showModal} onHide={handleClose} size={"lg"} backdrop="static"
        keyboard={false} >
        <Modal.Header closeButton>
          {editing ?
            <Modal.Title>Editar un Ingrediente:</Modal.Title> :
            <Modal.Title>Añadir un Ingrediente:</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              Nombre: Yup.string().required("*Campo requerido"),
              Rubro: Yup.string().required("*Campo requerido"),
              PrecioCosto: Yup.number().required("*Campo requerido"),
              StockMinimo: Yup.number().required("*Campo requerido"),
              StockActual: Yup.number().required("*Campo requerido"),
              UnidadMedida: Yup.string().required("*Campo requerido"),
              Estado: Yup.string().required("*Campo requerido"),
            })}
            initialValues={initialValues
            }
            enableReinitialize={true}
            onSubmit={async (values) => {
              handleClose()
            }}
          >
            {(Formik) =>
            (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className='container_Form_Ingredientes'>

                    <TextFieldValue
                      label="Nombre:"
                      name="Nombre"
                      type="text"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        Formik.setFieldValue("Nombre", event.target.value)
                      }}
                      placeholder="Nombre del Ingrediente"
                    />
                    <TextFieldValue
                      label="Rubro:"
                      name="Rubro"
                      type="text"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        Formik.setFieldValue("Rubro", event.target.value)
                      }}
                      placeholder="Rubro del Ingrediente"
                    />
                    <TextFieldValue
                      label="Precio de costo:"
                      name="PrecioCosto"
                      type="number"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        Formik.setFieldValue("PrecioCosto", event.target.value)
                      }}
                      placeholder="Precio de costo del Ingrediente"
                    />
                    <TextFieldValue
                      label="Stock minimo:"
                      name="StockMinimo"
                      type="number"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        Formik.setFieldValue("StockMinimo", event.target.value)
                      }}
                      placeholder="Stock minimo del Ingrediente"
                    />
                    <TextFieldValue
                      label="Stock actual:"
                      name="StockActual"
                      type="number"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        Formik.setFieldValue("StockActual", event.target.value)
                      }}
                      placeholder="Stock actual del Ingrediente"
                    />

                    <TextFieldSelect
                      label="Unidad de medida:"
                      name="UnidadMedida"
                      options={[
                        { value: '', label: "" },
                        { value: 'cm3', label: "Cm3" },
                        {
                          value: "l",
                          label: "Litros",
                        },
                        { value: "g", label: "gramos" },
                      ]}
                      change={(event: ChangeEvent<HTMLSelectElement>) => { Formik.setFieldValue("UnidadMedida", event.target.value) }}
                    />
                    <TextFieldSelect
                      label="Estado:"
                      name="Estado"
                      options={[
                        { value: '', label: "" },
                        { value: 'Baja', label: "Baja" },
                        {
                          value: "Alta",
                          label: "Alta",
                        }
                      ]}
                      change={(event: ChangeEvent<HTMLSelectElement>) => { Formik.setFieldValue("Estado", event.target.value) }}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
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

export default ModalAddIngrediente;
