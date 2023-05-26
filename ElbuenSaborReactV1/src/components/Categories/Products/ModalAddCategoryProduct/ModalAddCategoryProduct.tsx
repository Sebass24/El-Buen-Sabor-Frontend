import Category from '@Models/Product/ProductCategory';
import TextFieldSelect from 'components/Inputs/TextFieldSelect';
import TextFieldValue from 'components/Inputs/TextFieldValue';
import { Form, Formik } from 'formik'
import React, { ChangeEvent } from 'react'
import { Button, Modal } from 'react-bootstrap'
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { finishLoading, startLoading } from '@features/Loading/LoadingSlice';
import Loading from 'components/Loading/Loading';
import TextFildSelectValue from 'components/Inputs/TextFildSelectValue';
import { postPutData } from 'components/GenericFetch/GenericFetch';
import { addProductCategory, updateProductCategory } from '@features/ProductCategory/ProductCategorySlice';



interface Props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  category?: Category;
}



export default function ModalAddCategoryProduct({ showModal, handleClose, editing, category }: Props) {
  const initialValues: Category = {
    description: ""
  }

  const dispatch = useAppDispatch()
  return (
    <div>

      <Modal id={"modal"} show={showModal} onHide={handleClose} backdrop="static"
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
              description: Yup.string().required("*Campo requerido"),
            })}
            initialValues={category ? category : initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {
              if (editing) {
                dispatch(startLoading())
                postPutData(`/api/category`, "PUT", values).then(
                  () => {
                    dispatch(updateProductCategory(values))
                  }
                )
                dispatch(finishLoading())
              } else {
                postPutData(`/api/category`, "POST", values).then(
                  () => {
                    dispatch(addProductCategory(values))
                  }
                )
              }
              console.log(values);
              handleClose();
            }}
          >
            {(Formik) =>
            (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div >

                    <TextFieldValue
                      label="Nombre:"
                      name="description"
                      type="text"
                      placeholder="Nombre del Rubro"
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
