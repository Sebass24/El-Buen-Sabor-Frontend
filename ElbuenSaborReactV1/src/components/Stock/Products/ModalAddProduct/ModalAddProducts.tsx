import React, { useState, useEffect } from "react";
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
import Product from "types/Product/Product";
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
import { useAppSelector, useAppDispatch } from "@app/Hooks";
import { startLoading, finishLoading } from "@features/Loading/LoadingSlice";
import Loading from "components/Loading/Loading";
import ProductDetail from "types/Product/ProductDetail";
import Ingredient from "types/Product/Ingredient";
import { getData, postPutData } from "components/GenericFetch/GenericFetch";
import TextCheckBox from "components/Inputs/TextCheckBox";
import TextFildSelectValue from "components/Inputs/TextFildSelectValue";
import { addProduct, updateProduct } from "@features/ProductSlice/ProductSlice";
import { MyDropzone } from "components/Inputs/DropFileInput";
import { blob } from "stream/consumers";

const emptyIngredient: Ingredient = {
  id: 0,
  name: "",
  ingredientCategory: { name: "" },
  minimumStock: "",
  currentStock: "",
  measurementUnit: "",
  costPrice: "",
};

const emptyDonation: ProductDetail = {
  ingredient: emptyIngredient,
  quantity: "",
  measurementUnit: "",
};

interface Props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  product?: Product;
}


const ModalAddProducts = ({
  showModal,
  handleClose,
  editing,
  product,
}: Props) => {
  const initialValues: Product = {
    name: "",
    productCategory: { description: "" },
    sellPrice: "",
    cookingTime: "",
    recipe: { description: "" },
    description: "",
    shortDescription: "",
    available: true,
    image: { name: "", path: "" },
    productDetails: [emptyDonation],
  };

  const [img, setImg] = useState<any>();

  useEffect(() => {
    setImg({});
  }, [showModal]);

  const loading = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  return (
    <div>
      {loading ? <Loading /> : <></>}
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
              setImg={setImg}
              initialValues={product ? product : initialValues}
              onSubmit={async (values) => {
                console.log(values);
                const valuesProduct: Product = {
                  id: product?.id,
                  name: values.name,
                  description: values.description,
                  shortDescription: values.shortDescription,
                  productCategory: values.productCategory,
                  productDetails: values.productDetails,
                  available: values.available,
                  sellPrice: values.sellPrice,
                  cookingTime: values.cookingTime,
                  image: undefined,
                  recipe: values?.recipe,
                };
                console.log("values", valuesProduct);
                if (editing) {
                  // dispatch(startLoading());
                  // postPutData(`/api/product`, "PUT", values).then((response) => {
                  //   console.log(response)
                  //   dispatch(updateProduct(valuesProduct));
                  // });
                  // dispatch(finishLoading());

                  const formData = new FormData();
                  console.log(img)
                  formData.append("Image", img)
                  //formData.append("Image", new Blob([img], { type: 'multipart/form-data' }))
                  formData.append("Product", new Blob([JSON.stringify(values)], { type: 'application/json' }))
                  const token = sessionStorage.getItem("token")
                  const response = await fetch(`http://localhost:8080/api/product/update`, {
                    method: "PUT",
                    credentials: 'include',
                    headers: {
                      //'Content-Type': 'multipart/form-data',
                      "Authorization": `Bearer ${token}`
                    },
                    body: formData,
                  }).then((response) => {
                    console.log(response)
                    //  dispatch(addProduct(valuesProduct));
                  }
                  )

                } else {

                  const formData = new FormData();
                  console.log(img)
                  formData.append("Image", img)
                  //formData.append("Image", new Blob([img], { type: 'multipart/form-data' }))
                  formData.append("Product", new Blob([JSON.stringify(values)], { type: 'application/json' }))
                  const token = sessionStorage.getItem("token")
                  const response = await fetch(`http://localhost:8080/api/product/save`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                      //'Content-Type': 'multipart/form-data',
                      "Authorization": `Bearer ${token}`
                    },
                    body: formData,
                  }).then((response) => {
                    console.log(response)
                    //  dispatch(addProduct(valuesProduct));
                  }
                  )
                  // postPutData(`/api/product/save`, "POST", formData).then((response) => {
                  //   console.log(response)
                  //   dispatch(addProduct(valuesProduct));
                  // });
                }
                handleClose();
              }}
            >
              <FormikStep
                label="Datos del producto"
                validationSchema={Yup.object({
                  name: Yup.string().required("*Campo requerido"),
                  productCategory: Yup.object().shape({
                    id: Yup.number(),
                    description: Yup.string(),
                    deleted: Yup.boolean(),
                  }),
                  cookingTime: Yup.number().required("*Campo requerido"),
                  available: Yup.boolean().required("*Campo requerido"),
                  shortDescription: Yup.string().required("*Campo requerido"),
                  description: Yup.string().required("*Campo requerido"),
                })}
              ></FormikStep>

              <FormikStep
                label="Ingredientes"
                validationSchema={Yup.object({
                  productDetails: Yup.array(
                    Yup.object({
                      ingredient: Yup.object()
                        .shape({
                          name: Yup.string().required("Campo Requerido"),
                          ingredientCategory: Yup.object().shape({
                            id: Yup.number().required(),
                            name: Yup.string().required("Campo Requerido"),
                          }),
                          minimumStock: Yup.number(),
                          currentStock: Yup.number(),
                          measurementUnit: Yup.string(),
                          costPrice: Yup.number(),
                        })
                        .required("Campo Requerido"),
                      quantity: Yup.number().required("Campo Requerido"),
                      measurementUnit: Yup.string().required("Campo Requerido"),
                    })
                  ).min(1, "Tiene que tener al menos un ingrediente"),
                })}
              ></FormikStep>

              <FormikStep
                label="Receta"
                validationSchema={Yup.object({
                  // recipe: Yup.object().shape({
                  //   // description: Yup.string().notRequired(),
                  // }),
                })}
              >
                <>
                  <TextAreaValue
                    label="Receta"
                    name="recipe.description"
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
  setImg: React.Dispatch<any>;
}

export function FormikStepper({ children, setImg, ...props }: PropsForm) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const { ProductCategory } = useAppSelector(
    (state) => state.productCategories
  );
  const [options, setOptions] = useState<any>([]);

  function categorysProdToOptions() {
    const initialopcions = {
      value: "todos",
      label: "",
    };
    setOptions([
      initialopcions,
      ...ProductCategory.map((option, index) => ({
        value: option.id?.toString(),
        label: option.description,
      })),
    ]);
  }

  useEffect(() => {
    categorysProdToOptions();
  }, [ProductCategory]);

  const { Ingredients } = useAppSelector((state) => state.ingredients);

  const [optionsIngredients, setOptionsIngredients] = useState<any>([]);
  function categorysToOptions() {
    const initialopcions = {
      value: "",
      label: "",
    };
    setOptionsIngredients([
      initialopcions,
      ...Ingredients.map((option, index) => ({
        value: option.id?.toString(),
        label: option.name,
      })),
    ]);
  }

  useEffect(() => {
    categorysToOptions();
  }, [Ingredients]);

  const [optionsMesureUnit, setOptionsMesureUnit] = useState<any>([""]);

  async function getMesureUnit() {
    const data: string[] = await getData<string[]>("/api/enum/units");
    const initialopcions = {
      value: "",
      label: "",
    };
    setOptionsMesureUnit([
      initialopcions,
      ...data.map((option, index) => ({
        value: option,
        label: option,
      })),
    ]);
  }

  useEffect(() => {
    getMesureUnit();
  }, [Ingredients]);

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
      {({ values, errors, isSubmitting, setFieldValue }) => (
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

          {step === 0 ? (
            <div className="container_Form_Productos">
              <TextFieldValue
                label="Nombre"
                name="name"
                placeholder="Nombre"
                type="text"
              />
              <TextFildSelectValue
                label="Rubro:"
                name="productCategory"
                options={options}
                value={values.productCategory.id}
                onChange={(event: any) => {
                  let prod = ProductCategory.filter((product) => {
                    return product.id?.toString() == event.target.value;
                  });
                  if (prod.length === 0) {
                    prod = [{ description: "" }];
                  }
                  setFieldValue(`productCategory`, prod[0]);
                }}
              />

              <TextFieldValue
                label="TiempoCocina"
                name="cookingTime"
                placeholder="TiempoCocina"
                type="number"
              />

              <TextAreaValue
                label="Descripcion"
                name="description"
                placeholder="Descripcion"
              />
              <TextAreaValue
                label="Descripcion Corta"
                name="shortDescription"
                placeholder="Descripcion corta"
              />
              <TextCheckBox
                label="No Disponible"
                name="available"
                placeholder="TiempoCocina"
              />

              <MyDropzone setImg={setImg} />

            </div>
          ) : (
            <></>
          )}

          {step === 1 ? (
            <FieldArray name="productDetails">
              {({ push, remove }) => (
                <React.Fragment>
                  <div
                    style={{
                      height: "25rem",
                      overflow: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {values.productDetails.map((ingre: any, index: any) => (
                      <Grid container item key={index} spacing={2}>
                        <Grid item>
                          <TextFildSelectValue
                            label="Ingrediente:"
                            name={`productDetails.${index}.ingredient`}
                            options={optionsIngredients}
                            onChange={(event: any) => {
                              let ingredient = Ingredients.filter((ingre) => {
                                return (
                                  ingre.id?.toString() == event.target.value
                                );
                              });
                              if (ingredient.length === 0) {
                                ingredient = [emptyIngredient];
                              }
                              setFieldValue(
                                `productDetails.${index}.ingredient`,
                                ingredient[0]
                              );
                            }}
                            value={values.productDetails[
                              index
                            ].ingredient.id.toString()}
                          />
                        </Grid>

                        <Grid item>
                          <TextFieldValue
                            value={ingre?.Cuantity}
                            label="Cantidad:"
                            name={`productDetails.${index}.quantity`}
                            type="number"
                            placeholder="Cantidad"
                          />
                        </Grid>

                        <Grid item>
                          <TextFieldSelect
                            label="Unidad de medida:"
                            name={`productDetails.${index}.measurementUnit`}
                            options={optionsMesureUnit}
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
                        <Typography color="error">
                          {errors.donations}
                        </Typography>
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
                  </div>
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
