import { Modal } from "react-bootstrap";

interface Props {
    show: boolean;
    onClose: () => void; // Callback function for when the modal is closed
}

export default function ClosedRestaurant({ show, onClose }: Props) {
    return (
        <Modal className="complete-data" show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="modal-title-personal-data">Local cerrado</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ margin: "1rem" }}>
                Nuestro horario de atención es:<br />
                - Lunes a domingos: 20:00 a 00:00hs.<br />
                - Sábados y domingos: 11:00 a 15:00hs.
            </Modal.Body>
        </Modal>
    )
}

