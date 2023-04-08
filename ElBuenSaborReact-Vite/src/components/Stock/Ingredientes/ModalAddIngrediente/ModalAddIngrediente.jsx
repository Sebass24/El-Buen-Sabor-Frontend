import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from "yup";
import { validacionIngredientes, ingredientesBase } from './DatosForm';
import FormIngredientesFields from './FormIngredientesFields';
import { Form, Formik } from 'formik';
import { addIngredient } from "../../../../features/foods/IngredientSlice.js"
import { useDispatch } from 'react-redux';


const ModalAddIngrediente = ({ showModal, handleClose, editing, ingrediente }) => {
  const dispatch = useDispatch()
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
            validationSchema={Yup.object(validacionIngredientes)}
            initialValues={editing ? ingrediente : ingredientesBase}
            enableReinitialize={true}
            onSubmit={async (values) => {
              dispatch(addIngredient(values))
              handleClose()
            }}
          >
            {({ handleSubmit, setFieldValue }) =>
            (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <FormIngredientesFields
                    setFieldValue={setFieldValue}
                  />
                </Form>
                <div className="d-flex justify-content-end">
                  <Button variant="success" type="button" onClick={handleSubmit}>
                    Enviar
                  </Button>
                </div>
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
