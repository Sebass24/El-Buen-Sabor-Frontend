import { useState, useEffect } from "react";
import Product from "@Models/Product/Product";
import { getProducts } from "./ProductTrial";

export default function useProducts(){
    const [products, setProducts] = useState<Product[]>([]);
    const getProductsList = () => {
        let data: Product[] = getProducts();
        setProducts(data);
    }
    useEffect(() => {
        getProductsList();
    }, []);
    return (
        products
    )
}