import { Row } from "react-bootstrap";
import "./ShoppingCart.scss";

export default function ShoppingCart() {

    return (
        <div className="cart-container">
            <Row><label className="page-name">CARRITO DE COMPRAS</label></Row>
            <Row className="order-detail-container">
                <div className="cart-products-container">

                </div>
                <div className="order-options-container">

                </div>
            </Row>
        </div>
    )

}