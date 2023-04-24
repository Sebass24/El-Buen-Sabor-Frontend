import { Category } from '@Models/types';
import TextFieldSelect from 'components/Inputs/TextFieldSelect';
import TextFieldValue from 'components/Inputs/TextFieldValue';
import { Form, Formik } from 'formik'
import React, { ChangeEvent } from 'react'
import { Button, Modal } from 'react-bootstrap'
import * as Yup from "yup"



interface Props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  category?: Category;
}



export default function ModalAddCategories({ showModal, handleClose, editing }: Props) {
  const initialValues: Category = {
    Name: "",
    State: "",
    FatherCategory: ""
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
              Name: Yup.string().required("*Campo requerido"),
              State: Yup.string().required("*Campo requerido"),
              FatherCategory: Yup.string().required("*Campo requerido"),
            })}
            initialValues={initialValues
            }
            enableReinitialize={true}
            onSubmit={async (values) => {
              console.log(values)
              handleClose()
            }}
          >
            {(Formik) =>
            (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className='container_Form_Ingredientes'>

                    <TextFieldValue
                      label="Nombre:"
                      name="Name"
                      type="text"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        Formik.setFieldValue("Name", event.target.value)
                      }}
                      placeholder="Nombre del Rubro"
                    />
                    <TextFieldSelect
                      label="Estado:"
                      name="State"
                      options={[
                        { value: '', label: "" },
                        { value: 'Baja', label: "Baja" },
                        {
                          value: "Alta",
                          label: "Alta",
                        }
                      ]}
                      change={(event: ChangeEvent<HTMLSelectElement>) => { Formik.setFieldValue("State", event.target.value) }}
                    />
                    <TextFieldSelect
                      label="Rubro padre:"
                      name="FatherCategory"
                      options={[
                        { value: '', label: "" },
                        { value: 'Baja', label: "Baja" },
                        {
                          value: "Alta",
                          label: "Alta",
                        }
                      ]}
                      change={(event: ChangeEvent<HTMLSelectElement>) => { Formik.setFieldValue("FatherCategory", event.target.value) }}
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
  )
}
