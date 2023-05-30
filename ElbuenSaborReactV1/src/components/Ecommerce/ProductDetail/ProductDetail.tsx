import { Button, Card, Modal, } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "@Models/Product/Product";
import { useState, useEffect } from "react";
import "./ProductDetail.scss";
import ProductQuantitySelector from "./ProductQuantitySelector";
import { getProductById } from "../../../services/products";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import OrderDetail from "@Models/Orders/OrderDetail";
import { addProduct, setTotalPrice } from "@features/ShoppingCart/CartProducts";
import { openRestaurant } from "./WorkingSchedule";

export default function ProductDetail() {
    const dispatch = useAppDispatch();
    const { orderDetails } = useAppSelector(state => state.cartProducts.order);

    const { idproduct } = useParams();
    const [product, setProduct] = useState<Product>();
    const getProduct = async () => {
        let p: Product = await getProductById(parseInt(idproduct!));
        setProduct(p);
    }
    useEffect(() => {
        getProduct();
        setQuantity(1);
        window.scrollTo(0, 0);
    }, [idproduct]);

    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (value: number) => {
        setQuantity(value);
    };

    const [show, setShow] = useState(false);
    const handleModal = () => setShow(!show);

    //pruebas de fechas y horarios
    const today = new Date();
    // Establecer el día de la semana en sábado
    today.setDate(today.getDate() + (6 - today.getDay()));
    // Establecer la hora en 21:00
    /* today.setHours(21);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0); */
    // Establecer la hora en 12:00 PM (mediodía)
    today.setHours(12);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    const handleAddToCart = (p: Product, quantity: number) => {
        //if (openRestaurant(new Date())) {
        if (openRestaurant(today)) {
            const newOrder: OrderDetail = { product: p, quantity };
            dispatch(addProduct(newOrder));
            dispatch(setTotalPrice(orderDetails));
        } else {
            handleModal();
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card className='card2'>
                    <Card.Img variant="top" className="product-image2 img-fluid mx-auto d-block" src={`../Images/${product?.image.path}`} />
                    <Card.Body>
                        <Card.Title className="card-title2">{product?.name}</Card.Title>
                        <Card.Text>
                            <label className="description2">{product?.description}</label>
                            <label className="short-description2">{product?.shortDescription}</label><br />
                            <label>Precio: ${product?.sellPrice}</label><br />
                            {product?.available ? <label className="available">DISPONIBLE</label> : <label className="unavailable2">SIN STOCK</label>}
                            <span className="label-container2">
                                <span className="s2"><ProductQuantitySelector quantity={quantity} onChange={handleQuantityChange} /></span>
                                <span className="s1">${product?.sellPrice! as number * quantity}</span>
                                <span className="s3">
                                    <Button
                                        className={product?.available ? 'add-to-cart-button' : 'disabled'}
                                        disabled={!product?.available}
                                        onClick={(e) => { handleAddToCart(product as Product, quantity) }}>
                                        Agregar al carrito
                                    </Button>
                                </span>
                            </span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <Modal show={show} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Local cerrado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Nuestro horario de atención es:
                    - Lunes a domingos: 20:00 a 00:00hs.
                    - Sábados y domingos: 11:00 a 15:00hs.
                </Modal.Body>
            </Modal>
        </>
    )
}