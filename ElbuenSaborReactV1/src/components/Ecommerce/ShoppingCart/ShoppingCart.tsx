import { Button, Container, Row } from "react-bootstrap";
import "./ShoppingCart.scss";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import ShoppingCartProductDetail from "./ShoppingCartProductDetail";
import OrderDetail from '@Models/Orders/OrderDetail';
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import OrderOptions from "./OrderDetails/OrderOptions";
import OrderTotalPrice from "./OrderDetails/OrderTotalPrice";
import { setCartDate } from "@features/ShoppingCart/CartProducts";
import { postNewOrder } from "services/users";
import OrderOptionsReview from "./OrderDetails/OrderReview";

export default function ShoppingCart() {

    const navigate = useNavigate();

    const { order } = useAppSelector(state => state.cartProducts);
    const [showReview, setShowReview] = useState(false);
    const { isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();

    const handleOrderReview = async () => {
        setShowReview(!showReview);
        window.scrollTo(0, 0);
    }

    const handleOrderLogin = () => {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
    }

    //useEffect con un dispatch del user al order?
    //cuando cambie el valor de isAuthenticated, que haga el dispatch

    return (
        <div className="cart-container" >
            <Row><label className="page-name">CARRITO DE COMPRAS</label></Row>
            <div className="order-detail-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="cart-products-container">
                    {order.orderDetails && order.orderDetails.length > 0 ? (
                        order.orderDetails.map((orderDetail: OrderDetail, index: number) => (
                            <ShoppingCartProductDetail
                                key={index}
                                order={orderDetail}
                                enabled={showReview} //this should send a boolean value to disable the buttons when the order is being reviewed
                            />
                        ))

                    ) : (
                        <div className="no-products">No hay productos en el carrito</div>
                    )}
                </div>
                <div className="order-options-container">
                    {isAuthenticated ?
                        <>
                            {showReview ?
                                <>
                                    <OrderOptionsReview />
                                    <Button className="confirm-button">Confirmar pedido</Button>
                                </>
                                : <>
                                    <OrderOptions />
                                    <Button className={order.paymentMethod !== "" ? "btn-cart" : "disabled"}
                                        onClick={handleOrderReview}>
                                        Continuar
                                    </Button>
                                </>
                            }
                        </>
                        :
                        <>
                            <Container>
                                <OrderTotalPrice />
                                <Button
                                    className={"btn-cart"}
                                    onClick={handleOrderLogin}>
                                    Continuar
                                </Button>
                            </Container>
                        </>}
                </div>
            </div>
            <div className="button-container-1">
                <Button className="btn-cart" onClick={() => (navigate("/"))}>Continuar comprando</Button>
                {showReview && <Button className="btn-cart" onClick={handleOrderReview}>Volver</Button>}
            </div>
        </div>
    )

}