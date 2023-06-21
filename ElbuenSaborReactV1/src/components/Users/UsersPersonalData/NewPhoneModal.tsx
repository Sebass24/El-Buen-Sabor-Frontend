import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { useState } from "react";
import "./UserDataModal.scss";
import { Formik, Form, FormikValues } from 'formik';
import * as Yup from 'yup';
import TextFieldValue from "components/Inputs/TextFieldValue";
import { postNewPhone, updatePhone } from "@services/users";
import Phone from "types/Users/Phone";
import "./UserDataModal.scss";
import { fetchPhones } from "@features/User/UserThunk";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from "@app/Store";
import { AnyAction } from "@reduxjs/toolkit";

interface Props {
  phone?: Phone | null;
  onClose: () => void; // Callback function for when the modal is closed
}

export default function NewPhoneModal({ phone, onClose }: Props) {

  const { id: userId } = useAppSelector(state => state.users.user)
  const [showModal, setShowModal] = useState(true);

  const thunkdispatch: ThunkDispatch<RootState, unknown, AnyAction> = useAppDispatch();

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  const initialValues = {
    number: phone?.number || "",
  };

  const savePhone = async (values: FormikValues) => {
    try {
      if (phone) {
        phone = {
          ...phone,
          number: values.number,
          user: { id: userId }
        }
        await updatePhone(phone);
        handleCloseModal();
      } else {
        const newPhone: Phone = {
          number: values.number,
          user: { id: userId }
        }
        await postNewPhone(newPhone);
        handleCloseModal();
      }
      thunkdispatch(fetchPhones(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal className="complete-data" show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-personal-data">
            {phone ? "Editar dirección" : "Nueva dirección"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              number: Yup.string().required('*Campo requerido'),
            })}
            onSubmit={(values) => { savePhone(values) }}
          >
            {(Formik) =>
            (
              <>
                <Form className="form-user-personal-data">
                  <div className="form-group">
                    <TextFieldValue
                      label="Número:"
                      name="number"
                      type="number"
                      defaultValue={initialValues.number}
                    />
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
