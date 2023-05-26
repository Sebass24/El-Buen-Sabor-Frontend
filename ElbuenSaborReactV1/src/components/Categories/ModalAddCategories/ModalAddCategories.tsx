import Category from '@Models/Product/Category';
import TextFieldSelect from 'components/Inputs/TextFieldSelect';
import TextFieldValue from 'components/Inputs/TextFieldValue';
import { Form, Formik } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import * as Yup from "yup"
import Categories from '../Categories';
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { finishLoading, startLoading } from '@features/Loading/LoadingSlice';
import Loading from 'components/Loading/Loading';
import TextFildSelectValue from 'components/Inputs/TextFildSelectValue';
import { postPutData } from 'components/GenericFetch/GenericFetch';
import { addIngredientCategory, updateIngredientCategory } from '@features/IngredientCategory/IngredientCategorySlice';
import IngredientCategory from '@Models/Product/IngredientCategory';



interface Props {
  showModal: boolean;
  handleClose: () => void;
  editing?: boolean;
  category?: Category;
}



export default function ModalAddCategories({ showModal, handleClose, editing, category }: Props) {
  const initialValues: Category = {
    name: "",
    parentCategory: undefined
  }
  const { IngredientsCategories } = useAppSelector(state => state.ingredintsCategories)
  const [options, setOptions] = useState<any>([])

  function categorysToOptions() {
    const initialopcions = {
      value: "todos",
      label: "",
    };
    setOptions([
      initialopcions,
      ...IngredientsCategories.map((option, index) => ({
        value: option.id?.toString(),
        label: option.name,
      })),
    ]);
  }
  useEffect(() => {
    categorysToOptions()
  }, [IngredientsCategories]);

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
              name: Yup.string().required("*Campo requerido"),
            })}
            initialValues={category ? category : initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {
              if (editing) {
                dispatch(startLoading())
                postPutData(`/api/rubro`, "PUT", values).then(
                  () => {
                    dispatch(updateIngredientCategory(values))
                  }
                )
                dispatch(finishLoading())
              } else {
                postPutData(`/api/rubro`, "POST", values).then(
                  () => {
                    dispatch(addIngredientCategory(values))
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
                  <div className='container_Form_Ingredientes' >

                    <TextFieldValue
                      label="Nombre:"
                      name="name"
                      type="text"
                      placeholder="Nombre del Rubro"
                    />

                    <TextFildSelectValue
                      value={Formik.values.parentCategory?.id}
                      label="Rubro padre:"
                      name="parentCategory"
                      options={options}
                      onChange={(event: any) => {
                        let ingredient: IngredientCategory[] | null = IngredientsCategories.filter((ingre) => {
                          return ingre.id?.toString() == event.target.value
                        })
                        if (ingredient.length === 0) {
                          ingredient = null
                        }
                        Formik.setFieldValue(`parentCategory`, ingredient == null ? ingredient : ingredient[0]);
                      }}
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
