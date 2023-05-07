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



const ModalAddIngrediente = ({ showModal, handleClose, editing, ingrediente }: props) => {

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
            initialValues={ingrediente ? ingrediente : initialValues}
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
                      value={ingrediente?.Nombre}
                      label="Nombre:"
                      name="Nombre"
                      type="text"
                      placeholder="Nombre del Ingrediente"
                    />
                    <TextFieldValue
                      value={ingrediente?.Rubro}
                      label="Rubro:"
                      name="Rubro"
                      type="text"
                      placeholder="Rubro del Ingrediente"
                    />
                    <TextFieldValue
                      value={ingrediente?.PrecioCosto}
                      label="Precio de costo:"
                      name="PrecioCosto"
                      type="number"
                      placeholder="Precio de costo del Ingrediente"
                    />
                    <TextFieldValue
                      value={ingrediente?.StockMinimo}
                      label="Stock minimo:"
                      name="StockMinimo"
                      type="number"
                      placeholder="Stock minimo del Ingrediente"
                    />
                    <TextFieldValue
                      value={ingrediente?.StockActual}
                      label="Stock actual:"
                      name="StockActual"
                      type="number"
                      placeholder="Stock actual del Ingrediente"
                    />

                    <TextFieldSelect
                      value={ingrediente?.UnidadMedida}
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
                    />
                    <TextFieldSelect
                      value={ingrediente?.Estado}
                      label="Estado:"
                      name="Estado"
                      options={[
                        { value: '', label: "" },
                        { value: 'true', label: "Disponible" },
                        {
                          value: "false",
                          label: "No Disponible",
                        }
                      ]}
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
