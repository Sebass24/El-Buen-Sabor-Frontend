import { Button, Card, Modal, } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "@Models/Product/Product";
import { useState, useEffect } from "react";
import "./ProductDetail.scss";
import ProductQuantitySelector from "./ProductQuantitySelector";
import { getProductById } from "@services/products";
import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { addProduct, setTotalPrice } from "@features/ShoppingCart/CartProducts";
import { openRestaurant } from "../WorkingHours/WorkingSchedule";
import OrderDetail from "@Models/Orders/OrderDetail";
import AlertMessage from "components/AlertMessage";
import ClosedRestaurant from "../WorkingHours/ClosedRestaurant";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProductDetail() {
    const dispatch = useAppDispatch();

    const { idproduct } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const { role } = useAppSelector(state => state.users.user);
    const { isAuthenticated } = useAuth0();

    const getProduct = async () => {
        const p: Product = await getProductById(parseInt(idproduct!));
        setProduct(p);
        setLoading(false);
    }
    useEffect(() => {
        getProduct();
        setQuantity(1);
        window.scrollTo(0, 0);
    }, [idproduct]);

    const handleQuantityChange = (value: number) => {
        setQuantity(value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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

    return (
        <>
            {loading ? <></> :
                <>
                    <div className="product-detail-container">
                        <Card className='card2'>
                            <Card.Img variant="top" className="product-image2 img-fluid mx-auto d-block" src={`${import.meta.env.VITE_BILL_DOWNLOAD}/api/image/see/${product?.image?.path}`} />
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
                    {showMessage ?
                        <AlertMessage
                            onClose={() => { setShowMessage(false) }}
                            label={"Producto agregado al carrito."} /> : ""}
                    <ClosedRestaurant show={showModal} onClose={handleCloseModal} />
                </>}
        </>
    )

}