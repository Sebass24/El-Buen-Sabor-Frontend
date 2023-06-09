import { Button, Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { ChangeEvent, useEffect, useState } from "react";
import "./UserDataModal.scss";
import { Formik, Form, FormikValues, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextFieldValue from "components/Inputs/TextFieldValue";
import { getLocations } from "@services/locations";
import Address from "types/Users/Address";
import Location from "types/Users/Location";
import { postNewAddress, updateAddress } from "@services/users";
import "./UserDataModal.scss";
import { fetchAddresses } from "@features/User/UserThunk";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from "@app/Store";
import { AnyAction } from "@reduxjs/toolkit";

interface Props {
  address?: Address | null;
  onClose: () => void; // Callback function for when the modal is closed
}

export default function NewAddressModal({ address, onClose }: Props) {

  const { id: userId } = useAppSelector(state => state.users.user)
  const [showModal, setShowModal] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);

  const thunkdispatch: ThunkDispatch<RootState, unknown, AnyAction> = useAppDispatch();

  const getAllLocations = async () => {
    try {
      const locations = await getLocations();
      setLocations(locations);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  const initialValues = {
    street: address?.street || "",
    number: address?.number || "",
    location: address?.location.id || "",
  };

  const saveAddress = async (values: FormikValues) => {
    try {
      if (address) {
        address = {
          ...address,
          street: values.street,
          number: values.number,
          location: { id: values.location, name: "" },
          user: { id: userId }
        }
        await updateAddress(address);
        handleCloseModal();
      } else {
        const newAddress: Address = {
          street: values.street,
          number: values.number,
          location: { id: values.location, name: "" },
          user: { id: userId }
        }
        await postNewAddress(newAddress);
        handleCloseModal();
      }
      thunkdispatch(fetchAddresses(userId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLocations();
  }, [])

  return (
    <div>
      <Modal className="complete-data" show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-personal-data">
            {address ? "Editar dirección" : "Nueva dirección"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              street: Yup.string().required('*Campo requerido'),
              number: Yup.string().required('*Campo requerido'),
              location: Yup.string()
                .test('required', '*Campo requerido', (value) => value !== '0')
                .required('*Campo requerido'),
            })}
            onSubmit={(values) => {
              saveAddress(values)
            }}
          >
            {(Formik) =>
            (
              <>
                <Form className="form-user-personal-data">
                  <div className="form-group">
                    <TextFieldValue
                      label="Calle:"
                      name="street"
                      type="text"
                      defaultValue={initialValues.street}
                    />
                    <TextFieldValue
                      label="Número:"
                      name="number"
                      type="text"
                      defaultValue={initialValues.number}
                    />
                    <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
                      <div className="title-container" style={{ marginTop: "0" }}>
                        <label htmlFor={"locationLabel"} className="title-personal-data" style={{ fontFamily: "inter" }}>
                          Localidades:
                        </label>
                      </div>
                      <Field
                        className={`form-control  mb-3  input-formulario`}
                        name={"location"}
                        as={"select"}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                          const location = event.target.value;
                          Formik.setFieldValue("location", location);
                        }}
                      >
                        <option value="" disabled hidden>
                          Elegir localidad
                        </option>
                        {locations.length > 0 ?
                          (
                            locations.map((l: Location) => {
                              return (
                                <option key={l.id} value={l.id} >
                                  {l.name}
                                </option>
                              );
                            })
                          )
                          :
                          (
                            <option>
                              No se han encontrado localidades
                            </option>
                          )}

                      </Field>
                      <ErrorMessage
                        component="div"
                        name={"location"}
                        className="error"
                      />
                    </div>
                  </div>
                  <Modal.Footer className="modal-footer-personal-data">
                    <Button type="button" className="btn-cart" onClick={handleCloseModal}>
                      Cerrar
                    </Button>
                    <Button type="submit" className="btn-cart">
                      Guardar
                    </Button>
                  </Modal.Footer>
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
