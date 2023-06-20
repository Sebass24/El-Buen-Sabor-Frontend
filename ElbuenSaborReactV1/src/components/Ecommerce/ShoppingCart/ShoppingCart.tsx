import { Button, Container, Modal, Row } from "react-bootstrap";
import "./ShoppingCart.scss";
import { useAppSelector } from "@app/Hooks";
import ShoppingCartProductDetail from "./ShoppingCartProductDetail";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import OrderOptions from "./OrderDetails/OrderOptions";
import OrderTotalPrice from "./OrderDetails/OrderTotalPrice";
import OrderOptionsReview from "./OrderDetails/OrderOptionsReview";
import { postNewOrder } from "@services/users";
import OrderDetail from "@Models/Orders/OrderDetail";
import AlertMessage from "components/AlertMessage";
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import { createPreferenceMP, deleteOrder } from "@services/order";
import Order from "@Models/Orders/Order";
import { AlertColor } from "@mui/material";
import { openRestaurant } from "../WorkingHours/WorkingSchedule";
import ClosedRestaurant from "../WorkingHours/ClosedRestaurant";

interface responsePrefId {
  preferenceId: string;
}

interface alertMessage { //to use the same alert with different messages
  severity: AlertColor;
  message: string;
}

export default function ShoppingCart() {
  const navigate = useNavigate();

  const { order } = useAppSelector(state => state.cart);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [showMessage, setShowMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState<alertMessage>();
  const [continueToReview, setContinueToReview] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const [prefId, setPrefId] = useState("");
  const [newOrderId, setNewOrderId] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const { role } = useAppSelector(state => state.users.user);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const failure = queryParams.get("failure");

  const handleContinue = () => {
    let continueToReview = false;

    if (
      order.paymentMethod.id !== 0 &&
      order.deliveryMethod.id === 2 &&
      order.orderDetails.length > 0
    ) {
      continueToReview = true;
    } else if (
      order.paymentMethod.id !== 0 &&
      order.deliveryMethod.id === 1 &&
      order.address !== "" &&
      order.phone !== "" &&
      order.orderDetails.length > 0
    ) {
      continueToReview = true;
    }

    setContinueToReview(continueToReview);
  };

  const handleOrderReview = async () => {
    setPrefId("");
    setShowPaymentButton(false);
    deleteOrder(newOrderId);
    setShowReview(!showReview);
    window.scrollTo(0, 0);
  };

  const handleOrderLogin = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const postOrder = async () => {
    try {
      let open = false;
      if (isAuthenticated && role.id) {
        open = openRestaurant(role.id);
      } else {
        open = openRestaurant(0);
      }
      if (open) {
        const newOrder = await postNewOrder(order);
        setNewOrderId(newOrder.id as number);
        if (newOrder.paymentMethod.id === 1) {
          navigate(`/orderdetail/${newOrder.id}`);
        } else if (newOrder.paymentMethod.id === 2) {
          mercadoPagoPayment(newOrder);
        }
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage({ severity: "error", message: "Error al realizar el pedido. Intente nuevamente" });
      setShowMessage(true);
    }
  }

  const mercadoPagoPayment = async (newOrder: Order) => {
    try {
      initMercadoPago('TEST-f9a81470-5f5f-467c-85fe-e3d799f97788', { locale: 'es-AR' });
      const orderItem = {
        code: String(newOrder.id),
        title: `${newOrder.orderDetails.length} artículos`,
        description: newOrder.date.toString(),
        price: newOrder.total,
      }
      const pref_id: responsePrefId = await createPreferenceMP(orderItem);
      setPrefId(pref_id.preferenceId);
      setShowPaymentButton(true);
    } catch (error) {
      console.log(error);
      setAlertMessage({ severity: "error", message: "Error con Mercado Pago." });
      setShowMessage(true);
    }
  };

  if (isAuthenticated) {
    window.addEventListener('beforeunload', function (event) {
      //sets as deleted the created order if the page is reloaded because a new one will be created after the reload
      deleteOrder(newOrderId);
    });
  }

  useEffect(() => {
    handleContinue();
  }, [order])

  useEffect(() => {
    if (failure) {
      setAlertMessage({ severity: "error", message: "Error al realizar el pago. Intente nuevamente" });
      setShowMessage(true);
    }
  }, [])

  return (
    <div className="cart-container">
      <Row>
        <label className="page-name">CARRITO DE COMPRAS</label>
      </Row>
      <div
        className="order-detail-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="cart-products-container">
          {order.orderDetails && order.orderDetails.length > 0 ? (
            order.orderDetails.map(
              (orderDetail: OrderDetail, index: number) => (
                <ShoppingCartProductDetail
                  key={index}
                  order={orderDetail}
                  //set the shopping cart product detail in reviewmode to disable product quantity edition
                  reviewMode={showReview}
                />
              )
            )
          ) : (
            <div className="no-products">No hay productos en el carrito</div>
          )}
        </div>
        <div className="order-options-container">
          {isAuthenticated ? (
            <>
              {showReview ? (
                <>
                  <OrderOptionsReview order={null} />
                  {!showPaymentButton ?
                    <Button className="confirm-button"
                      onClick={postOrder}>
                      Confirmar pedido
                    </Button> :
                    <></>}
                </>
              ) : (
                <>
                  <OrderOptions />
                  <Button className={continueToReview ? "btn-cart" : "disabled"}
                    onClick={handleOrderReview}>
                    Continuar
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Container>
                <OrderTotalPrice order={null} />
                <Button
                  className={"btn-cart"}
                  onClick={handleOrderLogin}>
                  Continuar
                </Button>
              </Container>
            </>
          )}
        </div>
      </div>
      {showPaymentButton &&
        <div id="wallet_container">
          <Wallet initialization={{ preferenceId: prefId }} />
        </div>
      }
      <div className="button-container-1">
        <Button className="btn-cart" onClick={() => navigate("/")}>
          Continuar comprando
        </Button>
        {showReview && (
          <Button className="btn-cart" onClick={handleOrderReview}>
            Volver
          </Button>
        )}
      </div>
      {
        showMessage ?
          <AlertMessage
            severity={alertMessage?.severity}
            onClose={(() => { setShowMessage(false) })}
            label={alertMessage?.message as string} />
          : ""
      }
      <ClosedRestaurant show={showModal} onClose={handleCloseModal} />
    </div>
  )
}
