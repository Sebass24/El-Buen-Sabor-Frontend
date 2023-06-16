import Address from '@Models/Users/Address';
import Phone from '@Models/Users/Phone';
import { ChangeEvent, useEffect, useState } from "react";
import "./DeliveryInfo.scss";
import { useAppDispatch, useAppSelector } from '@app/Hooks';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from 'react-bootstrap';
import NewAddressModal from 'components/Users/UsersPersonalData/NewAddressModal';
import NewPhoneModal from 'components/Users/UsersPersonalData/NewPhoneModal';
import { setAddress, setPhone } from '@features/ShoppingCart/CartProducts';

interface OrderAddressPhone {
    address: string;
    phone: string;
}

export default function DeliveryInfo() {

    const dispatch = useAppDispatch();

    const { user } = useAppSelector(state => state.users)
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedPhone, setSelectedPhone] = useState("");

    const handleModal = () => {
        setShowAddressModal(false);
        setShowPhoneModal(false);
    }

    useEffect(() => {
        dispatch(setAddress(selectedAddress));
    }, [selectedAddress])

    useEffect(() => {
        dispatch(setPhone(selectedPhone));
    }, [selectedPhone])

    const initialValues: OrderAddressPhone = {
        address: "",
        phone: "",
    }

    return (
        <div className="delivery-options">
            <Formik
                validationSchema={Yup.object({
                    address: Yup.string().required("*Campo requerido"),
                    phone: Yup.string().required("*Campo requerido"),
                })}
                initialValues={initialValues}
                onSubmit={handleModal}
            >
                {(Formik) => (
                    <>
                        <Form autoComplete="off" className="form-obraAlta">
                            <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="delivery-info-label-container">
                                    <label htmlFor={"addressLabel"} className="delivery-info-label">
                                        {"Direcciones:"}
                                    </label>
                                </div>
                                <Field
                                    className={`form-control  mb-3  input-formulario`}
                                    name={"address"}
                                    as={"select"}
                                    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                        const address = event.target.value;
                                        Formik.setFieldValue("address", address);
                                        setSelectedAddress(address);
                                    }}
                                >
                                    {< option value="" disabled hidden>
                                        Elegir dirección
                                    </option>}
                                    {user.addresses.length > 0 ?
                                        (
                                            user.addresses.map((address: Address) => {
                                                const optionText = `${address.street} ${address.number}, ${address.location.name}`;
                                                return (
                                                    <option key={address.id} value={optionText}>
                                                        {optionText}
                                                    </option>
                                                );
                                            })
                                        ) : (
                                            <option value={"none"} disabled>No hay direcciones cargadas</option>
                                        )}

                                </Field>
                                <ErrorMessage
                                    component="div"
                                    name={"address"}
                                    className="error"
                                />
                            </div>
                            <Button type="button" className="btn-yellow" onClick={() => setShowAddressModal(true)}>
                                Nueva dirección
                            </Button>
                            <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="delivery-info-label-container">
                                    <label htmlFor={"phoneLabel"} className="delivery-info-label">
                                        {"Teléfonos:"}
                                    </label>
                                </div>
                                <Field
                                    className={`form-control  mb-3  input-formulario`}
                                    name={"phone"}
                                    as={"select"}
                                    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                        const phone = event.target.value;
                                        Formik.setFieldValue("phone", phone);
                                        setSelectedPhone(phone);
                                    }}
                                >
                                    <option value="" disabled hidden>
                                        Elegir teléfono
                                    </option>
                                    {user.phones.length > 0 ?
                                        (
                                            user.phones.map((p: Phone) => {
                                                return (
                                                    <option key={p.id} value={p.number} >
                                                        {p.number}
                                                    </option>
                                                );
                                            })
                                        )
                                        :
                                        (
                                            <option value={"none"} disabled>
                                                No hay teléfonos cargados
                                            </option>
                                        )}

                                </Field>
                                <ErrorMessage
                                    component="div"
                                    name={"phone"}
                                    className="error"
                                />
                            </div>
                            <Button type="button" className="btn-yellow" onClick={() => setShowPhoneModal(true)}>
                                Nuevo teléfono
                            </Button>
                        </Form>
                    </>
                )}
            </Formik>
            {showAddressModal ?
                <NewAddressModal address={null} onClose={handleModal} /> : ""}
            {showPhoneModal ?
                <NewPhoneModal phone={null} onClose={handleModal} /> : ""}
        </div >
    )
}
