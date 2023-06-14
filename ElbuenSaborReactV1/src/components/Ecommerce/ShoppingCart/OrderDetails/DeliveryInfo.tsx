import Address from '@Models/Users/Address';
import Phone from '@Models/Users/Phone';
import { ChangeEvent, useEffect, useState } from "react";
import "./DeliveryInfo.scss";
import { getAddressesByUserId, getPhonesByUserId } from '../../../../services/users';
import { useAppSelector } from '@app/Hooks';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from 'react-bootstrap';
import NewAddressModal from 'components/Users/UsersPersonalData/NewAddressModal';
import NewPhoneModal from 'components/Users/UsersPersonalData/NewPhoneModal';

interface OrderAddressPhone {
    address: string;
    phone: string;
}

const validationSchema = Yup.object({
    address: Yup.string().required('*Campo requerido'),
    phone: Yup.string().required('*Campo requerido'),
});

export default function DeliveryInfo() {

    const { id } = useAppSelector(state => state.users.user)
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    const handleAddressModal = () => {
        setShowAddressModal(false);
    }
    const handlePhoneModal = () => {
        setShowPhoneModal(false);
    }

    let userAddresses: Address[] = [];
    let userPhones: Phone[] = [];
    const getAddressesPhones = async () => {
        try {
            userAddresses = await getAddressesByUserId(id);
            userPhones = await getPhonesByUserId(id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddressChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        // Dispatch the address change
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        // Dispatch the phone change
    };

    useEffect(() => {
        getAddressesPhones();
    }, [])

    const initialValues: OrderAddressPhone = {
        address: "",
        phone: "",
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        validationSchema
            .validate({
                address: event.target.address.value,
                phone: event.target.phone.value,
            })
            .then(() => {
                // Validation successful, handle form submission
                const formData = new FormData(event.target);
                const values = Object.fromEntries(formData.entries());
                console.log('Form submitted:', values);
            })
            .catch((error) => {
                // Validation failed, handle error
                console.log('Form validation error:', error.errors);
            });
    };

    return (
        <div className="delivery-options">
            {/* <Formik
                validationSchema={Yup.object({
                    address: Yup.string().required("*Campo requerido"),
                    phone: Yup.string().required("*Campo requerido"),
                })}
                initialValues={initialValues}
                onSubmit={handleAddressChange}
            >
                {(Formik) => (
                    <> */}
            {<form autoComplete="off" className="form-obraAlta" onSubmit={handleSubmit}>
                <div className="mt-2" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="delivery-info-label-container">
                        <label htmlFor="address" className="delivery-info-label">
                            Direcciones:
                        </label>
                    </div>
                    <select
                        className="form-control mb-3 input-formulario"
                        name="address"
                    >
                        {userAddresses.length > 0 ? (
                            userAddresses.map((address) => {
                                const optionText = `${address.street} ${address.number}, ${address.location.name}`;
                                return (
                                    <option key={address.id} value={optionText}>
                                        {optionText}
                                    </option>
                                );
                            })
                        ) : (
                            <option value="none">No hay direcciones cargadas</option>
                        )}
                    </select>
                    {/* Add error message rendering logic here */}
                </div>
                <Button type="button" className="btn-yellow">
                    Nueva dirección
                </Button>
                <div className="mt-2" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="delivery-info-label-container">
                        <label htmlFor="phone" className="delivery-info-label">
                            Teléfonos:
                        </label>
                    </div>
                    <select
                        className="form-control mb-3 input-formulario"
                        name="phone"
                    >
                        {userPhones.length > 0 ? (
                            userPhones.map((phone) => (
                                <option key={phone.id} value={phone.number}>
                                    {phone.number}
                                </option>
                            ))
                        ) : (
                            <option value="none">No hay teléfonos cargados</option>
                        )}
                    </select>
                    {/* Add error message rendering logic here */}
                </div>
                <Button type="button" className="btn-yellow">
                    Nuevo teléfono
                </Button>
            </form>}
        </div >
    )
    {/* 
                    </>
                )}
            </Formik> */}
    {/* {showAddressModal ?
                <NewAddressModal onClose={ } /> : ""}
            {showPhoneModal ?
                <NewPhoneModal onClose={ } /> : ""} */}


}
