import React, { useState } from "react";
import { Modal, Form as formBostrap, Button as ButtonRB } from "react-bootstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { OrderIngredient, Products } from "@Models/types";
import TextFieldValue from '../../../Inputs/TextFieldValue';
import TextFieldSelect from '../../../Inputs/TextFieldSelect';
import "./ModalAddProducts.scss"
import { Box, Grid, Step, StepLabel, Stepper, Button } from "@mui/material";
import TextAreaValue from "components/Inputs/TextAreaValue";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  product?: Products;
}

const ModalAddProducts = ({
  showModal,
  handleClose,
  editing,
  product,
}: Props) => {

  const [productoNuevo, setProductoNuevo] = useState({});
  const [Ingredientes, setIngredientes] = useState<OrderIngredient[]>([
    {
      Ingredient: "PApa",
      UMedida: "k",
      Cuantity: "12"
    }
  ]);

  const initialValues: Products = {
    Nombre: "",
    Rubro: "",
    PrecioVenta: NaN,
    TiempoCocina: NaN,
    Estado: "",
    Descripcion: ""
  }
  const validationSchemaStep1 = Yup.object({
    Nombre: Yup.string().required("*Campo requerido"),
    Rubro: Yup.string().required("*Campo requerido"),
    PrecioVenta: Yup.number().required("*Campo requerido"),
    TiempoCocina: Yup.number().required("*Campo requerido"),
    Estado: Yup.string().required("*Campo requerido"),
    Descripcion: Yup.string().required("*Campo requerido"),
  });




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
          <div>
            <FormikStepper
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log(values)
                handleClose()
              }}
            >
              <FormikStep
                label="Datos del producto"
                validationSchema={Yup.object({
                  // Nombre: Yup.string().required("*Campo requerido"),
                  // Rubro: Yup.string().required("*Campo requerido"),
                  // PrecioVenta: Yup.number().required("*Campo requerido"),
                  // TiempoCocina: Yup.number().required("*Campo requerido"),
                  // Estado: Yup.string().required("*Campo requerido"),
                  // Descripcion: Yup.string().required("*Campo requerido"),
                })}
              >
                <div className="container_Form_Productos">
                  <TextFieldValue
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre"
                    type="text"
                  />
                  <TextFieldValue
                    label="Rubro"
                    name="Rubro"
                    placeholder="Rubro"
                    type="text"
                  />
                  <TextFieldValue
                    label="PrecioVenta"
                    name="PrecioVenta"
                    placeholder="PrecioVenta"
                    type="number"
                  />
                  <TextFieldValue
                    label="TiempoCocina"
                    name="TiempoCocina"
                    placeholder="TiempoCocina"
                    type="number"
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

                  />
                  <TextAreaValue
                    label="Descripcion"
                    name="Descripcion"
                    placeholder="Descripcion"
                  />
                </div>
              </FormikStep>





              <FormikStep
                label="Ingredientes"
                validationSchema={Yup.object({
                  Ingrediente: Yup.string().required("*Campo requerido"),
                  Cantidad: Yup.number().required("*Campo requerido"),
                  UMedida: Yup.string().required("*Campo requerido"),
                })}
              >
                <>
                  <div className="container_Form">
                    <div className="container_Form_Receta">
                      <TextFieldSelect
                        label="Ingrediente:"
                        name="Ingrediente"
                        options={[
                          { value: '', label: "" },
                          { value: 'Baja', label: "Baja" },
                          {
                            value: "Alta",
                            label: "Alta",
                          }
                        ]}

                      />

                      <TextFieldValue
                        label="Cantidad:"
                        name="Cantidad"
                        type="number"
                        placeholder="Cantidad"
                      />

                      <TextFieldSelect
                        label="Unidad de medida:"
                        name="UMedida"
                        options={[
                          { value: "", label: "" },
                          { value: "L", label: "Litro" },
                          {
                            value: "gr",
                            label: "gramo",
                          },
                        ]}
                      />
                    </div>
                    <ButtonRB
                      variant="success"
                      type="button"
                      style={{ maxHeight: "3rem" }}
                    >
                      Enviar
                    </ButtonRB>
                  </div>

                  <div>
                    {Ingredientes.map((ingrediente, index) => {
                      return (
                        <div key={index} className="Container_Ingredientes_modal">
                          <span>{ingrediente.Ingredient}</span>
                          <span>{ingrediente.Cuantity}</span>
                          <span>{ingrediente.UMedida}</span>
                          {/* <i
                            className="fa-solid fa-trash"
                            onClick={() => {
                              eliminarIngrediente(ingrediente);
                            }}
                          ></i> */}
                        </div>
                      );
                    })}
                  </div>
                </>

              </FormikStep>


              <FormikStep
                label="Descripcion"
                validationSchema={Yup.object({
                  Receta: Yup.string().required("*Campo requerido"),
                })}
              >
                <>
                  <TextAreaValue
                    label="Receta"
                    name="Receta"
                    placeholder="Receta"
                  />
                </>

              </FormikStep>




            </FormikStepper>

          </div>
        </Modal.Body>
      </Modal>

      {/* <ModalRecetaProducto
        showModal={showModalReceta}
        handleClose={handleCloseReceta}
        showModalAnterior={setShowModal}
        setProductoNuevo={setProductoNuevo}
        productoNuevo={productoNuevo}
      ></ModalRecetaProducto> */}
    </div >
  );
};

export default ModalAddProducts;




export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

interface PropsForm extends FormikConfig<FormikValues> {
  children: React.ReactNode
}


export function FormikStepper({ children, ...props }: PropsForm) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>


          {currentChild}


          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

