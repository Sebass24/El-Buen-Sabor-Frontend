import { Row } from "react-bootstrap";
import "./ShoppingCart.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "@app/Hooks";
import Product from "@Models/Product/Product";
import ShoppingCartProductDetail from "./ShoppingCartProductDetail";
import OrderDetail from "@Models/orders/OrderDetail";

export default function ShoppingCart() {

    const { products } = useAppSelector(state => state.cartProducts);

    return (
        <div className="cart-container" >
            <Row><label className="page-name">CARRITO DE COMPRAS</label></Row>
            <Row className="order-detail-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="cart-products-container">
                    {products && products.length > 0 ? (
                        products.map((orderDetail: OrderDetail, index: number) => (
                            <ShoppingCartProductDetail
                                key={index}
                                order={orderDetail}
                            />
                        ))
                    ) : (
                        <div>No hay productos en el carrito</div>
                    )}
                </div>
                <div className="order-options-container">

                </div>
            </Row>
        </div>
    )

}