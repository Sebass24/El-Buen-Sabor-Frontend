import { Button, ButtonProps } from "react-bootstrap";
import "./YellowButton.scss";

interface Props {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: ButtonProps["type"];
}

export default function YellowButton({ label, onClick, disabled, type = "button" }: Props) {

    const handleClick = () => {
        // Call the onClick function passed as a prop
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
            <Button type={type} className={"btn-yellow"} onClick={handleClick}>
                {label}
            </Button>
        </>
    )
}
