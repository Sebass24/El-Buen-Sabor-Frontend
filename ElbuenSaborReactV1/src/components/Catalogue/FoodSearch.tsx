/* import { useState, useEffect } from "react";
import Product from "@Models/Product/Product";
import { getProducts } from "components/Catalogue/ProductTrial";

const [products, setProducts] = useState<Product[]>([]);
const getProductsList = () => {
    let data: Product[] = getProducts();
    setProducts(data);
}
useEffect(() => {
    getProductsList();
}, []);

export const [search, setSearch] = useState("");

export const handleChange = (e: any) => {
    setSearch(e.target.value);
    filter(e.target.value);
};

const filter = (searchParam: string) => {
    var searchResult = products.filter((product: Product) => {
        if (
            product.name.toString()
                .toLowerCase()
                .includes(searchParam.toLowerCase())
        )
            return product;
    });
    setProducts(searchResult);
}; */