interface Props {
    phoneId: number;
    userId: number;
    onClose: () => void; // Callback function for when the modal is closed
}
export default function NewPhoneModal({ phoneId, userId, onClose }: Props) {
    return (
        <div>NewPhoneModal</div>
    )
}
