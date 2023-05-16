import { Card, } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "@Models/Product/Product";
import { useState, useEffect } from "react";
import { getProductById } from "components/APIfunctions";
import "./ProductDetail.scss";
import AddToCartButton from "./AddToCartButton";
import ProductQuantitySelector from "./ProductQuantitySelector";

export default function ProductDetail() {

    const { idproduct } = useParams();
    const [product, setProduct] = useState<Product>();
    const getProduct = async () => {
        let p: Product = await getProductById(parseInt(idproduct!));
        setProduct(p);
    }
    useEffect(() => {
        getProduct();
    }, []);

    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (value: number) => {
        setQuantity(value);
    };

    return (
        <div className="card-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className='card2'>
                <Card.Img variant="top" className="product-image2 img-fluid mx-auto d-block" src={`../Images/${product?.image.path}`} />
                <Card.Body>
                    <Card.Title className="card-title2">{product?.name}</Card.Title>
                    <Card.Text>
                        <label className="description2">{product?.description}</label>
                        <label className="short-description2">{product?.shortDescription}</label>
                        <label>Precio: ${product?.sellPrice}</label><br />
                        {product?.available ? <label className="available">DISPONIBLE</label> : <label className="unavailable2">SIN STOCK</label>}
                        <span className="label-container2">
                            <span className="s2"><ProductQuantitySelector quantity={quantity} onChange={handleQuantityChange} /></span>
                            <label className="s1">${product?.sellPrice! * quantity}</label>
                            <span className="s3"><AddToCartButton /></span>
                        </span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}