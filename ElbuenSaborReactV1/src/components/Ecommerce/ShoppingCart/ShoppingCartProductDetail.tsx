import ProductQuantitySelector from "../ProductDetail/ProductQuantitySelector";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { deleteProduct, modifyProductQuantity, setTotalPrice } from "@features/ShoppingCart/CartProducts";
import OrderDetail from "@Models/Orders/OrderDetail";
import "./ShoppingCartProductDetail.scss";

interface props {
    order: OrderDetail
    enabled: boolean
}

export default function ShoppingCartProductDetail({ order, enabled }: props) {
    const dispatch = useAppDispatch();
    const { orderDetails } = useAppSelector(state => state.cartProducts.order);
    const [cartQuantity, setCartQuantity] = useState(order.quantity);

    useEffect(() => {
        handleModifyProduct(cartQuantity);
    }, [cartQuantity]);

    const handleQuantityChange = (value: number) => {
        setCartQuantity(value);
    };

    const handleModifyProduct = (newQuantity: number) => {
        const updatedOrder: OrderDetail = { ...order, quantity: newQuantity };
        dispatch(modifyProductQuantity(updatedOrder));
        dispatch(setTotalPrice(orderDetails));
    };

    const handleDeleteProduct = (id: number) => {
        dispatch(deleteProduct(id));
        dispatch(setTotalPrice(orderDetails));
    };

    return (
        <>
            <div className="cart-product-container">
                <div><img className="cart-product-image" src={`../Images/${order.product.image.path}`} /></div>
                <div className="cart-product-info">
                    <label className="cart-product-title">{order.product.name}</label>
                    <label className="cart-product-description">{order.product.shortDescription}</label><br />
                    <label className="cart-product-price">${order.product.sellPrice}</label>
                </div>
                <div className="cart-quantity-container">
                    <span className="quantity-cart-container quantity-selector-cart quantity-cart"><ProductQuantitySelector quantity={cartQuantity} onChange={handleQuantityChange} disabled={enabled} /></span>
                    <span className="amount-cart">${order.product.sellPrice! as number * cartQuantity}</span>
                    <span className="delete-button">
                        <button className="button2" onClick={(e) => { handleDeleteProduct(order.product.id as number) }} disabled={enabled}>x</button>
                    </span>
                </div>
            </div>
        </>
    )
}