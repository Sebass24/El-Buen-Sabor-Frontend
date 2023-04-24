import React, { useState } from "react";
import { Button, Modal, Form as formBostrap } from "react-bootstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { Products } from "@Models/types";
import TextFieldValue from '../../../Inputs/TextFieldValue';
import TextFieldSelect from '../../../Inputs/TextFieldSelect';
import "./ModalAddProducts.scss"
import { Box, Grid, Step, StepLabel, Stepper } from "@mui/material";

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
          <FormikStepper
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            <FormikStep
              label="Datos del producto"
              validationSchema={Yup.object({
                Nombre: Yup.string().required("*Campo requerido"),
                Rubro: Yup.string().required("*Campo requerido"),
                PrecioVenta: Yup.number().required("*Campo requerido"),
                TiempoCocina: Yup.number().required("*Campo requerido"),
                Estado: Yup.string().required("*Campo requerido"),
                Descripcion: Yup.string().required("*Campo requerido"),
              })}
            >
              <Box paddingBottom={2}>
                <Field fullWidth component={TextFieldValue} label="Nombre:"
                  name="Nombre"
                  type="text"
                  placeholder="Nombre del Producto" />
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth component={TextFieldValue} label="Precio de venta:"
                  name="PrecioVenta"
                  type="number"
                  placeholder="Precio de costo del Producto" />
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth component={TextFieldValue} label="Tiempo de cocina:"
                  name="TiempoCocina"
                  type="number"
                  placeholder="Tiempo de cocina del producto" />
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth component={TextFieldSelect} label="Estado:"
                  name="Estado"
                  options={[
                    { value: "", label: "" },
                    { value: "Baja", label: "Baja" },
                    {
                      value: "Alta",
                      label: "Alta",
                    },
                  ]}
                />
              </Box>
              <Box paddingBottom={2}>
                <Field fullWidth component={TextFieldValue} label="Imagen:"
                  name="Imagen"
                  type="text"
                  placeholder="Tiempo de cocina del producto" />
              </Box>
            </FormikStep>
          </FormikStepper>

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

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  console.log(currentChild)
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

          <Grid container spacing={2}>
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

