import { Button, Modal, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { useEffect, useState } from "react";
import "./UserDataModal.scss";
import { Formik, Form, FormikValues } from 'formik';
import * as Yup from 'yup';
import { setUserData } from "@features/User/UserSlice";
import TextFieldValue from "components/Inputs/TextFieldValue";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAddressesByUserId, getPhonesByUserId } from "../../../services/users";
import Address from "@Models/Users/Address";
import Phone from "@Models/Users/Phone";

interface Props {
    onClose: () => void; // Callback function for when the modal is closed
}

export default function PersonalDataModal({ onClose }: Props) {

    const { user } = useAppSelector(state => state.users)
    const [showModal, setShowModal] = useState(true);
    const dispatch = useAppDispatch();
    const [phones, setPhones] = useState<Phone[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);

    const getAddressesPhones = async () => {
        try {
            const addresses = await getAddressesByUserId(user.id);
            setAddresses(addresses);
            const phones = await getPhonesByUserId(user.id);
            setPhones(phones);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        getAddressesPhones();
        onClose();
    };

    const initialValues: any = {
        lastName: user.lastName,
        name: user.name,
        email: user.userEmail,
        addresses: addresses,
        phones: phones,
    }

    const saveUserData = (values: FormikValues) => {
        const name = values.name;
        const lastName = values.lastName;
        dispatch(setUserData({
            name: name,
            lastName: lastName,
        }));
    };

    useEffect(() => {
        getAddressesPhones();
    }, [])

    return (
        <div>
            <Modal className="complete-data" show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Mis datos personales</Modal.Title>
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
                                        <div>
                                            <label>Direcciones:</label>
                                            <Button type="button" className="btn-yellow" /* onClick={ } */>
                                                Nueva dirección
                                            </Button>
                                        </div>
                                        <Table>
                                            <thead>
                                                <th>Calle</th>
                                                <th>Número</th>
                                                <th>Localidad</th>
                                                <th>Editar</th>
                                                <th>Eliminar</th>
                                            </thead>
                                            <tbody>
                                                {addresses.length === 0 ?
                                                    <tr>
                                                        <td colSpan={5}>
                                                            No hay teléfonos cargados
                                                        </td>
                                                    </tr>
                                                    : (
                                                        addresses.map((a) => (
                                                            <tr key={a.id}>
                                                                <td>{a.street}</td>
                                                                <td>{a.number}</td>
                                                                <td>{a.location.name}</td>
                                                                <td>{/*<Link to={`/InstrumentForm/${i.id}`>*/}<BsPencilSquare size={26} />{/* </Link> */}</td>
                                                                <td><MdDelete size={26} /* onClick={() => deleteInstrumento(i.id)} */ style={{ cursor: "pointer", color: "black" }} /></td>
                                                            </tr>
                                                        ))
                                                    )}
                                            </tbody>
                                        </Table>
                                        <div>
                                            <label>Teléfonos:</label>
                                            <Button type="button" className="btn-yellow" /* onClick={ } */>
                                                Nuevo teléfono
                                            </Button>
                                        </div>
                                        <Table>
                                            <tbody>
                                                {phones.length === 0 ?
                                                    <tr>
                                                        <td colSpan={5}>
                                                            No hay teléfonos cargados
                                                        </td>
                                                    </tr>
                                                    : (
                                                        phones.map((p) => (
                                                            <tr key={p.id}>
                                                                <td>{p.number}</td>
                                                                <td>{/*<Link to={`/InstrumentForm/${i.id}`>*/}<BsPencilSquare size={26} />{/* </Link> */}</td>
                                                                <td><MdDelete size={26} /* onClick={() => deleteInstrumento(i.id)} */ style={{ cursor: "pointer", color: "black" }} /></td>
                                                            </tr>
                                                        ))
                                                    )}
                                            </tbody>
                                        </Table>
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
