import Product from "@Models/Product/Product";
import OrderDetail from "@Models/order/OrderDetail";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { setTotalPrice, addProduct } from "@features/ShoppingCart/CartProducts";
import AlertMessage from "components/AlertMessage";
import ClosedRestaurant from "components/Ecommerce/WorkingHours/ClosedRestaurant";
import { openRestaurant } from "components/Ecommerce/WorkingHours/WorkingSchedule";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./AddtoCartButton.scss";

interface Props {
    label: string;
    quantity?: number;
    product: Product;
}

export default function AddToCartButton({ label, quantity, product }: Props) {

    const [showMessage, setShowMessage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { role } = useAppSelector(state => state.users.user);
    const { isAuthenticated } = useAuth0();
    const dispatch = useAppDispatch();

    const handleAddToCart = (p: Product, quantity: number) => {
        let open = false;
        if (isAuthenticated && role.id) {
            open = openRestaurant(role.id);
        } else {
            open = openRestaurant(0);
        }
        if (open) {
            const newOrder: OrderDetail = { product: p, quantity };
            dispatch(addProduct(newOrder));
            dispatch(setTotalPrice());
            setShowMessage(true);
        } else {
            setShowModal(true);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Button
                className={product?.available ? 'add-to-cart-button-card' : 'disabled'}
                disabled={!product?.available}
                onClick={(e) => { handleAddToCart(product as Product, quantity || 1) }}>
                {label}
            </Button>
            {showMessage ?
                <AlertMessage
                    onClose={() => { setShowMessage(false) }}
                    label={"Producto agregado al carrito."} /> : ""}
            <ClosedRestaurant show={showModal} onClose={handleCloseModal} />
        </div >
    )
}
