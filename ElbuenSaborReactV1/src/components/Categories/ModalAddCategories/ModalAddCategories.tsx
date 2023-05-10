import { Category } from '@Models/types';
import TextFieldSelect from 'components/Inputs/TextFieldSelect';
import TextFieldValue from 'components/Inputs/TextFieldValue';
import { Form, Formik } from 'formik'
import React, { ChangeEvent } from 'react'
import { Button, Modal } from 'react-bootstrap'
import * as Yup from "yup"
import Categories from '../Categories';
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { finishLoading, startLoading } from '@features/Loading/LoadingSlice';
import Loading from 'components/Loading/Loading';



interface Props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  category?: Category;
}



export default function ModalAddCategories({ showModal, handleClose, editing, category }: Props) {
  const initialValues: Category = {
    Name: "",
    State: "",
    FatherCategory: null as any
  }

  const loading = useAppSelector((state) => state.loading.value);
  const dispatch = useAppDispatch()
  return (
    <div>
      <Loading />
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
            })}
            initialValues={category ? category : initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {
              dispatch(startLoading())
              setTimeout(() => {
                console.log(values);
                handleClose();
                dispatch(finishLoading())
              }, 1000);
            }}
          >
            {(Formik) =>
            (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className='container_Form_Ingredientes'>

                    <TextFieldValue
                      value={category?.Name}
                      label="Nombre:"
                      name="Name"
                      type="text"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        Formik.setFieldValue("Name", event.target.value)
                      }}
                      placeholder="Nombre del Rubro"
                    />
                    <TextFieldSelect
                      value={category?.State}
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
                      value={category?.FatherCategory}
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
    </div >
  )
}
