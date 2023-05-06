import React, { useState } from "react";
import {
  Modal,
  Form as formBostrap,
  Button as ButtonRB,
} from "react-bootstrap";
import * as Yup from "yup";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
} from "formik";
import { OrderIngredient, Products } from "@Models/types";
import TextFieldValue from "../../../Inputs/TextFieldValue";
import TextFieldSelect from "../../../Inputs/TextFieldSelect";
import "./ModalAddProducts.scss";
import {
  Box,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Button,
  Typography,
} from "@mui/material";
import TextAreaValue from "components/Inputs/TextAreaValue";

const emptyDonation = {
  Ingredient: "",
  Cuantity: NaN,
  UMedida: "",
};

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
  const initialValues: Products = {
    Nombre: "",
    Rubro: "",
    PrecioVenta: 0,
    TiempoCocina: 0,
    Estado: "",
    Descripcion: "",
    Ingredients: [emptyDonation],
  };

  const validationSchemaStep1 = Yup.object({
    Nombre: Yup.string().required("*Campo requerido"),
    Rubro: Yup.string().required("*Campo requerido"),
    PrecioVenta: Yup.number()
      .required("*Campo requerido")
      .moreThan(0, "tiene que ser mayor a 0"),
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
                console.log(values);
                handleClose();
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
                <div className="container_Form_Productos">
                  <TextFieldValue
                    label="Nombre"
                    name="Nombre"
                    placeholder="Nombre"
                    type="text"
                  />
                  <TextFieldSelect
                    label="Rubro:"
                    name="Rubro"
                    options={[
                      { value: "", label: "" },
                      { value: "Baja", label: "Baja" },
                      {
                        value: "Alta",
                        label: "Alta",
                      },
                    ]}
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
                      { value: "", label: "" },
                      { value: "Baja", label: "Baja" },
                      {
                        value: "Alta",
                        label: "Alta",
                      },
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
                  Ingredients: Yup.array(
                    Yup.object({
                      Ingrediente: Yup.string().required("Campo Requerido"),
                      Cantidad: Yup.number().required("Campo Requerido"),
                      UMedida: Yup.string().required("Campo Requerido"),
                    })
                  ).min(1, "Tiene que tener al menos un ingrediente"),
                })}
              ></FormikStep>

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
    </div>
  );
};

export default ModalAddProducts;

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

interface PropsForm extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

export function FormikStepper({ children, ...props }: PropsForm) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
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
      {({ values, errors, isSubmitting, isValid }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {step === 1 ? (
            <FieldArray name="Ingredients">
              {({ push, remove }) => (
                <React.Fragment>
                  {values.Ingredients.map((_: any, index: any) => (
                    <Grid container item key={index} spacing={2}>
                      <Grid item>
                        <TextFieldSelect
                          label="Ingrediente:"
                          name={`Ingredients.${index}.Ingrediente`}
                          options={[
                            { value: "", label: "" },
                            { value: "Baja", label: "Baja" },
                            {
                              value: "Alta",
                              label: "Alta",
                            },
                          ]}
                        />
                      </Grid>

                      <Grid item>
                        <TextFieldValue
                          label="Cantidad:"
                          name={`Ingredients.${index}.Cantidad`}
                          type="number"
                          placeholder="Cantidad"
                        />
                      </Grid>

                      <Grid item>
                        <TextFieldSelect
                          label="Unidad de medida:"
                          name={`Ingredients.${index}.UMedida`}
                          options={[
                            { value: "", label: "" },
                            { value: "L", label: "Litro" },
                            {
                              value: "gr",
                              label: "gramo",
                            },
                          ]}
                        />
                      </Grid>

                      <Grid item alignSelf={"center"}>
                        <ButtonRB
                          variant="success"
                          disabled={isSubmitting}
                          onClick={() => remove(index)}
                        >
                          Delete
                        </ButtonRB>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item>
                    {typeof errors.donations === "string" ? (
                      <Typography color="error">{errors.donations}</Typography>
                    ) : null}
                  </Grid>

                  <ButtonRB
                    disabled={isSubmitting}
                    variant="success"
                    style={{ marginBottom: "1rem" }}
                    onClick={() => push(emptyDonation)}
                  >
                    Añadir Ingredientes
                  </ButtonRB>
                </React.Fragment>
              )}
            </FieldArray>
          ) : (
            <></>
          )}

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
                {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
