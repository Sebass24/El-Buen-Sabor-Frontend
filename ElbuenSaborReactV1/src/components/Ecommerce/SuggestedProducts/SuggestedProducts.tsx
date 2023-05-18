import "./SuggestedProducts.scss";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Product from "@Models/Product/Product";
import ProductCard from "../Catalogue/ProductCard";
import { getProductsRandom } from "components/APIfunctions";

interface SuggestedProductsProps {
    phrase: string;
}


const SuggestedProducts: React.FC<SuggestedProductsProps> = ({ phrase }) => {

    const [products, setProducts] = useState<Product[]>([]);

    const fetchData = async () => {
        let productList: Product[] = await getProductsRandom(4);
        setProducts(productList);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container className="suggestions-container">
            <hr className="straight-line" />
            <label className="suggestion-title">{phrase}</label>
            <Container fluid="md" className="suggestions">
                {products.map((product: Product) => (
                    <ProductCard key={product.id} args={product} />
                ))}
            </Container>
        </Container>

    );
}

export default SuggestedProducts;