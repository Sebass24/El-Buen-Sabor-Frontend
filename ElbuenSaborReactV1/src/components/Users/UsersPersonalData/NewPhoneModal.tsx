import { Button, Modal, Table } from "react-bootstrap";
import { useAppSelector } from "@app/Hooks";
import { ChangeEvent, useEffect, useState } from "react";
import "./UserDataModal.scss";
import { Formik, Form, FormikValues, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextFieldValue from "components/Inputs/TextFieldValue";
import Location from "@Models/Users/Location";
import { postNewPhone } from "@services/users";
import Phone from "@Models/Users/Phone";

interface Props {
    phoneId: number;
    onClose: () => void; // Callback function for when the modal is closed
}

export default function NewPhoneModal({ phoneId, onClose }: Props) {

    const { id: userId } = useAppSelector(state => state.users.user)
    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    };

    const initialValues = {
        number: "",
    };

    const savePhone = async (values: FormikValues) => {
        console.log(values.Location);
        const newPhone: Phone = {
            number: values.number,
            user: { id: userId }
        }
        try {
            await postNewPhone(newPhone);
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal className="complete-data" show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {phoneId !== 0 ? "Editar dirección" : "Nueva dirección"}
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
                                            type="text"
                                            defaultValue={initialValues.number}
                                        />
                                    </div>
                                    <Modal.Footer>
                                        <Button type="submit" className="btn-yellow">
                                            Guardar
                                        </Button>
                                        <Button type="button" className="btn-yellow" onClick={handleCloseModal}>
                                            Cerrar
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
