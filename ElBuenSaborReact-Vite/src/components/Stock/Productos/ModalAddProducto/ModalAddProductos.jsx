import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { ProductoBase, validacionProductos } from "./DatosFormProducto";
import FormProductosFields from "./FormProductosFields";
import ModalRecetaProducto from "./ModalRecetaProducto/ModalRecetaProducto";

const ModalAddProductos = ({
  setShowModal,
  showModal,
  handleClose,
  editing,
  producto,
}) => {
  const [showModalReceta, setShowModalReceta] = useState(false);
  const [productoNuevo, setProductoNuevo] = useState({});
  const handleCloseReceta = () => {
    setShowModal(true);
    setShowModalReceta(false);
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
            <Modal.Title>Editar un Producto:</Modal.Title>
          ) : (
            <Modal.Title>Añadir un Producto:</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object(validacionProductos)}
            initialValues={editing ? producto : ProductoBase}
            enableReinitialize={true}
            onSubmit={(values) => {
              setProductoNuevo({ ...productoNuevo, ...values });
              setShowModalReceta(true);
            }}
          >
            {({ handleSubmit, setFieldValue }) => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <FormProductosFields setFieldValue={setFieldValue} />
                </Form>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="success"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Enviar
                  </Button>
                </div>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <ModalRecetaProducto
        showModal={showModalReceta}
        handleClose={handleCloseReceta}
        showModalAnterior={setShowModal}
        setProductoNuevo={setProductoNuevo}
        productoNuevo={productoNuevo}
      ></ModalRecetaProducto>
    </div>
  );
};

export default ModalAddProductos;
