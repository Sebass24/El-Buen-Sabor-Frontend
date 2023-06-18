import TextAreaValue from "components/Inputs/TextAreaValue";
import TextFieldValue from "components/Inputs/TextFieldValue";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import * as Yup from "yup"
import "./ContactUs.scss"
import { Alert } from "@mui/material";
import { postPutData } from "components/GenericFetch/GenericFetch";
import HeaderEcommerce from "../HeaderEcommerce/HeaderEcommerce";

const ContactUs = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [error, seterror] = useState(false);

  const initialValues = {
    message: "",
    email: "",
    name: "",
  }

  return (
    <div >
      <HeaderEcommerce />
      <Row><label className="page-name">CONTACTANOS</label></Row>
      {/* <div className="img">
        <h1 className='Title_AboutUS'>{"Contáctanos"}</h1>
      </div> */}
      <div className="form_Container">
        <div className="form_container_grid">
          <Formik
            validationSchema={Yup.object({
              name: Yup.string().required("*Campo requerido"),
              email: Yup.string().email().required("*Campo requerido"),
              message: Yup.string().required("*Campo requerido"),
            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values, { resetForm }) => {
              postPutData("api/user/sendReview", "PUT", values).then(() => {
                setShowMessage(true)
              }
              ).catch(() => {
                seterror(true)
              })
              resetForm()
            }}

          >
            {(Formik) =>
            (
              <>
                <Form autoComplete="off" className="form-obraAlta">

                  <TextFieldValue
                    label="Nombre:"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                  />
                  <TextFieldValue
                    label="Email:"
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                  <TextAreaValue
                    label="Mensaje:"
                    name="message"
                    placeholder="Mensaje"
                    rows={8}
                  />

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

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1674.8988247510733!2d-68.84339815181292!3d-32.903517901387474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e096cd9da052b%3A0xb9291b0660fb7e6f!2sHip%C3%B3lito%20Yrigoyen%2052%2C%20M5501%20Godoy%20Cruz%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1686935389295!5m2!1ses!2sar"
            width="500"
            height="460"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>


        </div>
      </div>
      {showMessage ?
        <div className="alert-container">
          <Alert severity="error" onClose={() => { setShowMessage(false) }}>Producto agregado al carrito</Alert>
        </div>
        : ""}
    </div>
  );
};

export default ContactUs;
