import { Button, Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { useState } from "react";
import "./UserDataModal.scss";
import { Formik, Form, FormikValues } from 'formik';
import * as Yup from 'yup';
import { deleteUserAddress, deleteUserPhone, setUserData } from "@features/User/UserSlice";
import TextFieldValue from "components/Inputs/TextFieldValue";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import NewAddressModal from "./NewAddressModal";
import NewPhoneModal from "./NewPhoneModal";
import Address from "types/Users/Address";
import Phone from "types/Users/Phone";
import User from "types/Users/User";
import { deleteAddress, deletePhone, updateUser } from "@services/users";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from "@app/Store";
import { AnyAction } from "@reduxjs/toolkit";

interface Props {
  onClose: () => void; // Callback function for when the modal is closed
}

export default function PersonalDataModal({ onClose }: Props) {

  const { user } = useAppSelector(state => state.users)
  const [showModal, setShowModal] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  const handleModal = () => {
    setShowAddressModal(false);
    setShowPhoneModal(false);
    setSelectedAddress(null);
    setSelectedPhone(null);
  }

  const handleSelectedOption = (option: Address | Phone) => {
    if ('street' in option) {
      setSelectedAddress(option);
      setShowAddressModal(true);
    } else {
      setSelectedPhone(option);
      setShowPhoneModal(true);
    }
  }

  const handleDelete = (option: Address | Phone) => {
    try {
      if ('street' in option) {
        deleteAddress(option.id as number);
        dispatch(deleteUserAddress(option));
      } else {
        deletePhone(option.id as number);
        dispatch(deleteUserPhone(option));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const initialValues: any = {
    lastName: user.lastName,
    name: user.name,
    email: user.userEmail,
    addresses: user.addresses,
    phones: user.phones,
  }

  const saveUserData = (values: FormikValues) => {
    const name = values.name;
    const lastName = values.lastName;
    const newUserData: User = {
      ...user,
      name: name,
      lastName: lastName
    };
    try {
      updateUser(newUserData);
      dispatch(setUserData(newUserData));
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal className="complete-data" show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-personal-data">Mis datos personales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              lastName: Yup.string().required('El apellido es obligatorio'),
              name: Yup.string().required('El nombre es obligatorio'),
            })}
            onSubmit={(values) => { saveUserData(values) }}
          >
            {(Formik) =>
            (
              <>
                <Form className="form-user-personal-data">
                  <div className="form-group">
                    <TextFieldValue
                      label="Nombre:"
                      name="name"
                      type="text"
                      defaultValue={initialValues.name}
                    />
                    <TextFieldValue
                      label="Apellido:"
                      name="lastName"
                      type="text"
                      defaultValue={initialValues.lastName}
                    />
                    <TextFieldValue
                      label="Email:"
                      name="email"
                      type="email"
                      defaultValue={initialValues.email}
                      disabled={true}
                    />
                    <div className="title-container">
                      <label className="title-personal-data">Direcciones:</label>
                      <Button type="button" className="btn-cart" onClick={() => setShowAddressModal(true)}>
                        Nueva dirección
                      </Button>
                    </div>
                    <Table className="personal-data-table">
                      <thead>
                        <tr>
                          <th>Calle</th>
                          <th>Número</th>
                          <th>Localidad</th>
                          <th>Editar</th>
                          <th>Eliminar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.addresses.length === 0 ?
                          <tr>
                            <td colSpan={5}>
                              No hay teléfonos cargados
                            </td>
                          </tr>
                          : (
                            user.addresses.map((a) => (
                              <tr key={a.id}>
                                <td>{a.street}</td>
                                <td>{a.number}</td>
                                <td>{a.location.name}</td>
                                <td><BsPencilSquare size={20} onClick={() => { handleSelectedOption(a) }} style={{ cursor: "pointer", color: "black" }} /></td>
                                <td><MdDelete size={20} onClick={() => { handleDelete(a) }} style={{ cursor: "pointer", color: "black" }} /></td>
                              </tr>
                            ))
                          )}
                      </tbody>
                    </Table>
                    <div className="title-container">
                      <label className="title-personal-data">Teléfonos:</label>
                      <Button type="button" className="btn-cart" onClick={() => setShowPhoneModal(true)}>
                        Nuevo teléfono
                      </Button>
                    </div>
                    <Table className="personal-data-table">
                      <tbody>
                        {user.phones.length === 0 ?
                          <tr>
                            <td colSpan={5}>
                              No hay teléfonos cargados
                            </td>
                          </tr>
                          : (
                            user.phones.map((p) => (
                              <tr key={p.id}>
                                <td>{p.number}</td>
                                <td></td>
                                <td></td>
                                <td><BsPencilSquare size={20} onClick={() => handleSelectedOption(p)} style={{ cursor: "pointer", color: "black" }} /></td>
                                <td><MdDelete size={20} onClick={() => { handleDelete(p) }} style={{ cursor: "pointer", color: "black" }} /></td>
                              </tr>
                            ))
                          )}
                      </tbody>
                    </Table>
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
        {showAddressModal ?
          <NewAddressModal address={selectedAddress} onClose={handleModal} /> : ""}
        {showPhoneModal ?
          <NewPhoneModal phone={selectedPhone} onClose={handleModal} /> : ""}
      </Modal>
    </div>
  )
}
