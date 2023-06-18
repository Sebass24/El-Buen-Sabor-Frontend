import { useEffect, useState } from "react";
import { Alert, AlertColor } from "@mui/material";

interface Props {
    label: string;
    severity?: AlertColor | undefined;
    onClose: () => void; // Callback function for when the modal is closed
}

export default function AlertMessage({ label, severity, onClose }: Props) {
    const [showAlert, setShowAlert] = useState(true);

    const handleCloseAlert = () => {
        setShowAlert(false);
        onClose();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
            onClose();
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="alert-container">
            {showAlert && (
                <Alert severity={severity} onClose={handleCloseAlert}>
                    {label}
                </Alert>
            )}
        </div>
    );
}