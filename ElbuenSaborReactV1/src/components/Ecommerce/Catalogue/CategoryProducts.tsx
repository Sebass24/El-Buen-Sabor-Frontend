import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Product from "types/Product/Product";
import ProductCard from "./ProductCard";
import "./Catalogue.scss";
import { getProductsByName, getProducts, getProductsByCategory } from "@services/products";

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
      } else if (searchBy === "category") {
        if (value === "") {
          productList = await getProducts();
        } else {
          productList = await getProductsByCategory(value);
        }
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