import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Product from "@Models/Product/Product";
import { getProducts } from "./ProductTrial";
import ProductCard from "./ProductCard";
import "./Catalogue.scss";

interface props {
    args: string;
}

const CategoryProducts = ({ args }: props) => {

    const [products, setProducts] = useState<Product[]>([]);
    const getProductsList = () => {
        let data: Product[] = getProducts();
        setProducts(data);
    }
    useEffect(() => {
        getProductsList();
    }, []);

    const filteredProducts: Product[] = products.filter((product) => product.productCategory === args);

    return (
        <Container fluid="md" className="product-container">
            {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} args={product} />
            ))}
        </Container>
    )
}

export default CategoryProducts;