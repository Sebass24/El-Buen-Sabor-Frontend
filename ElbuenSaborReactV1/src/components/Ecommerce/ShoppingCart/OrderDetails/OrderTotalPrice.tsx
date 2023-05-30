import { useAppSelector } from "@app/Hooks";
import { useState, useEffect } from "react";

export default function OrderTotalPrice() {

    const { order } = useAppSelector(state => state.cartProducts);

    const [totalProducts, setTotalProducts] = useState<number>(0);

    const sumProducts = () => {
        setTotalProducts(order.orderDetails.reduce((total, item) => total + item.quantity, 0));
    }

    useEffect(() => {
        sumProducts();
    }, [order]);

    return (
        <div>
            <span>{totalProducts} artículos</span>
            <span>${order.total}</span><br />
            <span>Descuento</span>
            <span>{order.discount === 0 ?
                ("---") :
                `$${order.discount}`}
            </span><br />
            <span>Total</span>
            <span>{order.discount === 0 ?
                `$${order.total}` :
                `$${order.total - order.discount}`}</span><br />
        </div>
    )
}
