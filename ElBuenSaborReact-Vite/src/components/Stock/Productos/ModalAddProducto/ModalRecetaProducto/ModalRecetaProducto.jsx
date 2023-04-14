import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { Form as FormReact } from "react-bootstrap";
import FormRecetaFields from "./FormRecetaFields";
import "./ModalRecetaProducto.scss";
const ModalRecetaProducto = ({
  showModal,
  handleClose,
  editing,
  producto,
  setProductoNuevo,
  productoNuevo,
  showModalAnterior,
  handleCloseAnterior,
}) => {
  const [Ingredientes, setIngredientes] = useState([]);

  function eliminarIngrediente(del) {
    var filtered = Ingredientes.filter(function (ingre) {
      return ingre !== del;
    });
    setIngredientes(filtered);
  }

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
            <Modal.Title>Editar Receta:</Modal.Title>
          ) : (
            <Modal.Title>Crear Receta:</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              Ingrediente: Yup.string().required("*Campo requerido"),
              Cantidad: Yup.number().required("*Campo requerido"),
              UMedida: Yup.string().required("*Campo requerido"),
            })}
            onSubmit={async (values) => {
              setIngredientes([...Ingredientes, values]);
            }}
          >
            {({ handleSubmit, setFieldValue }) => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <FormRecetaFields
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                  />
                </Form>
              </>
            )}
          </Formik>

          <div>
            {Ingredientes.map((ingrediente, index) => {
              return (
                <div key={index} className="Container_Ingredientes_modal">
                  <span>{ingrediente.Ingrediente}</span>
                  <span>{ingrediente.Cantidad}</span>
                  <span>{ingrediente.UMedida}</span>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => {
                      eliminarIngrediente(ingrediente);
                    }}
                  ></i>
                </div>
              );
            })}
          </div>

          <Formik
            validationSchema={Yup.object({
              Receta: Yup.string().required("*Campo requerido"),
            })}
            initialValues={{}}
            enableReinitialize={true}
            onSubmit={async (values) => {
              setProductoNuevo(...productoNuevo, {
                Ingredientes: Ingredientes,
                receta: values.Receta,
              });
              setIngredientes([]);
              console.log(productoNuevo);
              handleClose();
              handleCloseAnterior();
            }}
          >
            {({ handleSubmit, setFieldValue }) => (
              <>
                <Form autoComplete="off">
                  <div
                    className="mt-2"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: ".3rem 0",
                      }}
                    >
                      <label
                        htmlFor={"Descripcion"}
                        style={{
                          color: "black",
                          fontFamily: "sans-serif",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {"Receta"}
                      </label>
                    </div>
                    <FormReact.Control
                      as={"textarea"}
                      name="Receta"
                      style={{ minHeight: "240px" }}
                      onChange={(event) => {
                        setFieldValue("Receta", event.target.value);
                      }}
                    ></FormReact.Control>
                    <ErrorMessage
                      component="div"
                      name={"Descripcion"}
                      className="error"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div className="mt-2 d-flex justify-content-between">
                    <Button
                      variant="warning"
                      type="button"
                      onClick={() => {
                        handleClose();
                        showModalAnterior(true);
                      }}
                      style={{ maxHeight: "3rem" }}
                    >
                      Atras
                    </Button>
                    <Button
                      variant="success"
                      type="button"
                      onClick={handleSubmit}
                      style={{ maxHeight: "3rem" }}
                    >
                      Guardar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalRecetaProducto;
