import { Modal } from "react-bootstrap";

interface Props {
    show: boolean;
    onClose: () => void; // Callback function for when the modal is closed
}

export default function ClosedRestaurant({ show, onClose }: Props) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Local cerrado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Nuestro horario de atención es:
                - Lunes a domingos: 20:00 a 00:00hs.
                - Sábados y domingos: 11:00 a 15:00hs.
            </Modal.Body>
        </Modal>
    )
}

