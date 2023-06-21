import Product from "@Models/Product/Product";
import { getDataNoToken } from "./generic";

export async function getProducts() {
    const url = `/api/product`;
    const products = await getDataNoToken<Product[]>(url);
    return products;
}

export async function getProductById(id: number) {
    const url = `/api/product/${id}`;
    const products = await getDataNoToken<Product>(url);
    return products;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const url = `/api/product/category/${category}`;
    const products = await getDataNoToken<Product[]>(url);
    return products;
}

export async function getProductsByName(name: string): Promise<Product[]> {
    const url = `/api/product/name/${name}`;
    const products = await getDataNoToken<Product[]>(url);
    return products;
}

export async function getProductsRandom(quantity: number): Promise<Product[]> {
    const url = `/api/product/random/${quantity}`;
    const products = await getDataNoToken<Product[]>(url);
    return products;
}