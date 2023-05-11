import { useState } from "react";
import useProducts from "../Catalogue/useProducts";
import Product from "@Models/Product/Product";

export default function useSearch(search: string) {

    const [productsSearch, setProductsSearch] = useState<Product[]>();

    const products = useProducts();

    var searchResult = products.filter((product: Product) => {
        if (
            product.name.toString().toLowerCase() .includes(search.toLowerCase())
        )
            return product;
    });
    setProductsSearch(searchResult);

    return productsSearch;
    
}