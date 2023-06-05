import Address from '@Models/Users/Address';
import Phone from '@Models/Users/Phone';
import { Form, Col } from "react-bootstrap";
import { ChangeEvent } from "react";
import "./DeliveryInfo.scss";

export default function DeliveryInfo() {
    //fetch de direcciones y telefonos del usuario
    const addresses: Address[] = [];
    const phones: Phone[] = [];

    const handleAddressChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        //dispatch del address
    }

    const handlePhoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        //dispatch del phone
    }

    return (
        <div className="delivery-options">
            <Form>
                <Form.Group as={Col} controlId="address">
                    <Form.Label>Dirección:</Form.Label>
                    <Form.Control as="select" onChange={(e) => { handleAddressChange }}>
                        <option value="">Elegir</option>
                        {addresses.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.street} {option.number} {option.location.name}
                            </option>
                        ))}
                    </Form.Control>
                    {/* nueva dirección  */}
                </Form.Group>
                <Form.Group as={Col} controlId="phone">
                    <Form.Label>Teléfono:</Form.Label>
                    <Form.Control as="select" onChange={(e) => { handlePhoneChange }}>
                        <option value="">Elegir</option>
                        {phones.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.number}
                            </option>
                        ))}
                    </Form.Control>
                    {/* nuevo telefono */}
                </Form.Group>

            </Form>
        </div>
    )
}
