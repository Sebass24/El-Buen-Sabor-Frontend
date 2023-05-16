import { useState, useEffect } from "react";
import Product from "@Models/Product/Product";
import { getProducts } from "components/APIfunctions";

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const getProductsList = async () => {
        let data: Product[] = await getProducts();
        setProducts(data);
    }
    useEffect(() => {
        getProductsList();
    }, []);
    return (
        products
    )
}