import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import FormRecetaFields from './FormRecetaFields';

const ModalRecetaProducto = ({ showModal, handleClose, editing, producto }) => {

  return (
    <div>
      <Modal id={"modal"} show={showModal} onHide={handleClose} size={"lg"} backdrop="static"
        keyboard={false} >
        <Modal.Header closeButton>
          {editing ?
            <Modal.Title>Editar Receta:</Modal.Title> :
            <Modal.Title>Crear Receta:</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({})}
            initialValues={{}}
            enableReinitialize={true}
            onSubmit={async (values) => {
              console.log(values)
              handleClose()
            }}
          >
            {({ handleSubmit, setFieldValue }) =>
            (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <FormRecetaFields
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

export default ModalRecetaProducto;
