import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Product from "@Models/Product/Product";
import ProductCard from "./ProductCard";
import "./Catalogue.scss";
import { getProductsByCategory, getProductsByName } from "components/APIfunctions";

interface props {
    args: [string, string];
}

const CategoryProducts = ({ args }: props) => {
    const value = args[0];
    const searchBy = args[1];

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let productList: Product[] = [];
            if (searchBy === "name") {
                productList = await getProductsByName(value);
                console.log(productList);
            } else if (searchBy === "category") {
                productList = await getProductsByCategory(value);
            }
            setProducts(productList);
        };

        fetchData();
    }, [value, searchBy]);

    return (
        <Container fluid="md" className="product-container">
            {products.map((product: Product) => (
                <ProductCard key={product.id} args={product} />
            ))}
        </Container>
    )
}

export default CategoryProducts;