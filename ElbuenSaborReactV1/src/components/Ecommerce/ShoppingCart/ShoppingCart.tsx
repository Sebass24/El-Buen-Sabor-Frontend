import { Button, Container, Row } from "react-bootstrap";
import "./ShoppingCart.scss";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import ShoppingCartProductDetail from "./ShoppingCartProductDetail";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import OrderOptions from "./OrderDetails/OrderOptions";
import OrderTotalPrice from "./OrderDetails/OrderTotalPrice";
import OrderOptionsReview from "./OrderDetails/OrderOptionsReview";
import { postNewOrder } from "@services/users";
import { resetOrderDetails } from "@features/ShoppingCart/CartProducts";
import OrderDetail from "@Models/Orders/OrderDetail";
import AlertMessage from "components/AlertMessage";

export default function ShoppingCart() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { order } = useAppSelector(state => state.cart);
  const [showReview, setShowReview] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const [showMessage, setShowMessage] = useState(false);
  const [continueToReview, setContinueToReview] = useState(false);

  const handleContinue = () => {
    if (order.paymentMethod.id !== 0 && order.deliveryMethod.id === 2 && order.orderDetails.length > 0) {
      setContinueToReview(true);
    } else if (order.paymentMethod.id !== 0 && order.deliveryMethod.id === 1 && order.address !== "" && order.phone !== "" && order.orderDetails.length > 0) {
      setContinueToReview(true);
    } else {
      setContinueToReview(false);
    }
  }

  const handleOrderReview = async () => {
    setShowReview(!showReview);
    window.scrollTo(0, 0);
  }

  const handleOrderLogin = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }

  const postOrder = async () => {
    try {
      const newOrder = await postNewOrder(order);
      if (newOrder.paymentMethod.id === 1) {
        navigate(`/orderdetail/${newOrder.id}`);
      }
      //if newOrder paymentMethod == MP, redirect to MP payment
      //if error in payment or anything, redirect to cart and throw error
      //else, redirect to order detail and resetOrderDetails
      dispatch(resetOrderDetails());
    } catch (error) {
      console.log(error);
      setShowMessage(true);
    }
  }

  useEffect(() => {
    handleContinue();
  }, [order])

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
                //set the shopping cart product detail in reviewmode to disable product quantity edition
                reviewMode={showReview}
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
                  <OrderOptionsReview order={null} />
                  <Button className="confirm-button"
                    onClick={postOrder}>
                    Confirmar pedido
                  </Button>
                </>
                : <>
                  <OrderOptions />
                  <Button className={continueToReview ? "btn-cart" : "disabled"}
                    onClick={handleOrderReview}>
                    Continuar
                  </Button>
                </>
              }
            </>
            :
            <>
              <Container>
                <OrderTotalPrice order={null} />
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
      {showMessage ?
        <AlertMessage
          severity="error"
          onClose={(() => { setShowMessage(false) })}
          label={"Error al realizar el pedido. Intente nuevamente."} />
        : ""}
    </div >
  )
}