import { Button, Container, Row, Table } from 'react-bootstrap'
import { Formik, Form, FormikValues } from 'formik';
import TextFieldValue from "components/Inputs/TextFieldValue";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import { useEffect, useState } from 'react';
import Phone from '@Models/Users/Phone';
import * as Yup from 'yup';
import { User } from '@auth0/auth0-react';
import { deleteUserAddress, deleteUserPhone, setUserData } from '@features/User/UserSlice';
import { deleteAddress, deletePhone, getPasswordChangeURL, updateUser } from '@services/users';
import Address from '@Models/Users/Address';
import NewAddressModal from 'components/Users/UsersPersonalData/NewAddressModal';
import NewPhoneModal from 'components/Users/UsersPersonalData/NewPhoneModal';
import AlertMessage from 'components/AlertMessage';
import { AlertColor } from '@mui/material';

interface Ticket {
    ticket: string;
}

interface alertMessage { //to use the same alert with different messages
    severity: AlertColor;
    message: string;
}

export default function MyPersonalData() {

    const { user } = useAppSelector(state => state.users)
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
    const [ticketPassword, setTicketPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState<alertMessage>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
            setAlertMessage({ severity: "success", message: "Cambios guardados con éxito." });
            setShowMessage(true);
        } catch (error) {
            console.log(error);
            setAlertMessage({ severity: "error", message: "Error al guardar los cambios." });
            setShowMessage(true);
        }
    };

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

    const handleModal = () => {
        setShowAddressModal(false);
        setShowPhoneModal(false);
        setSelectedAddress(null);
        setSelectedPhone(null);
    }

    const handlePasswordChange = async () => {
        if (!user.auth0Id.includes("google")) {
            const auth0Id = user.auth0Id.replace("|", "%7C");
            const ticketurl: Ticket = await getPasswordChangeURL(auth0Id);
            setTicketPassword(ticketurl.ticket);
        }
    }

    useEffect(() => {
        handlePasswordChange();
    }, [])

    const handleGoBack = () => {
        navigate(-1);
    }


    return (
        <div>
            <Container className='personal-data-container-form'>
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
                                    {!user.auth0Id.includes("google") &&
                                        <>
                                            <Link to={ticketPassword} target="_blank" style={{ fontFamily: "inter", fontSize: ".9rem" }}>
                                                Cambiar contraseña
                                            </Link>
                                        </>
                                    }
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
                                <div className="modal-footer-personal-data">
                                    <Button type="button" className="btn-cart" onClick={handleGoBack}>
                                        Volver
                                    </Button>
                                    <Button type="submit" className="btn-cart">
                                        Guardar
                                    </Button>
                                </div>
                            </Form>
                        </>
                    )
                    }
                </Formik>
                {showAddressModal ?
                    <NewAddressModal address={selectedAddress} onClose={handleModal} /> : ""}
                {showPhoneModal ?
                    <NewPhoneModal phone={selectedPhone} onClose={handleModal} /> : ""}
            </Container>
            {
                showMessage ?
                    <AlertMessage
                        severity={alertMessage?.severity}
                        onClose={(() => { setShowMessage(false) })}
                        label={alertMessage?.message as string} />
                    : ""
            }
        </div >
    )
}
