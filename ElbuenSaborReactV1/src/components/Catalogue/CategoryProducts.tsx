
import { Container } from "react-bootstrap";
import Product from "@Models/Product/Product";
import ProductCard from "./ProductCard";
import "./Catalogue.scss";
import useProducts from "./useProducts";

interface props {
    args: string;
}

const CategoryProducts = ({ args }: props) => {

    const products = useProducts();
    const filteredProducts: Product[] = products.filter((product) => product.productCategory === args);

    return (
        <Container fluid="md" className="general-product-container">
            <Container fluid="md" className="product-container">
                {filteredProducts.map((product: Product) => (
                    <ProductCard key={product.id} args={product} />
                ))}
            </Container>
        </Container>
    )
}

export default CategoryProducts;

/* interface Props {
    args: Product[];
}

const CategoryProducts = ({args}: Props) => {}

    
    return (
        <Container fluid="md" className="product-container">
            {products.map((product: Product) => (
                <ProductCard key={product.id} args={product} />
            ))}
        </Container>
    )
} */