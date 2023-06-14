import { Button, Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { ChangeEvent, useEffect, useState } from "react";
import "./UserDataModal.scss";
import { Formik, Form, FormikValues, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setUserData } from "@features/User/UserSlice";
import TextFieldValue from "components/Inputs/TextFieldValue";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { getLocations } from "../../../services/locations";
import Address from "@Models/Users/Address";
import Location from "@Models/Users/Location";
import Phone from "@Models/Users/Phone";
import { postNewAddress } from "services/users";

interface Props {
    addressId: number;
    userId: number;
    onClose: () => void; // Callback function for when the modal is closed
}

export default function NewAddressModal({ addressId, userId, onClose }: Props) {

    const { id } = useAppSelector(state => state.users.user)
    const [showModal, setShowModal] = useState(true);

    let locations: Location[] = [];
    const getAllLocations = async () => {
        try {
            locations = await getLocations();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    };

    const initialValues: Address = {
        street: "",
        number: "",
        location: { id: 0, name: "" },
    };

    const saveAddress = async (values: FormikValues) => {
        const newAddress: Address = {
            street: values.street,
            number: values.number,
            location: { id: values.location.id, name: values.location.name },
            user: { id: userId }
        }
        try {
            await postNewAddress(newAddress);
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
                    <Modal.Title>
                        {addressId !== 0 ? "Editar dirección" : "Nueva dirección"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object().shape({
                            street: Yup.string().required('*Campo requerido'),
                            number: Yup.string().required('*Campo requerido'),
                            location: Yup.string().required("*Campo requerido"),
                        })}
                        onSubmit={(values) => { saveAddress(values) }}
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
                                            <div className="delivery-info-label-container">
                                                <label htmlFor={"locationLabel"} className="delivery-info-label">
                                                    {"Localidades:"}
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
                                            /* value={Formik.values.addresses} */ // Correct the value field to "addresses" instead of "target"
                                            >
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
                                                        <option value={"none"} >
                                                            No se han encontrado localidades
                                                        </option>
                                                    )}

                                            </Field>
                                            <ErrorMessage
                                                component="div"
                                                name={"lcoation"}
                                                className="error"
                                            />
                                        </div>
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
        </div>
    )
}
