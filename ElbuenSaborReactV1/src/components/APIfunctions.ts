import Product from "@Models/Product/Product";

async function getData<T>(path: string): Promise<T> {
    const response = await fetch(path);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

export async function getProducts() {
    const url = `http://localhost:8080/api/product`;
    const products = await getData<Product[]>(url);
    return products;
}

export async function getProductById(id: number) {
    const url = `http://localhost:8080/api/product/${id}`;
    const products = await getData<Product>(url);
    return products;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const url = `http://localhost:8080/api/product/category/${category}`;
    const products = await getData<Product[]>(url);
    return products;
}

export async function getProductsByName(name: string): Promise<Product[]> {
    const url = `http://localhost:8080/api/product/category/${name}`;
    const products = await getData<Product[]>(url);
    return products;
}

export async function getProductsRandom(quantity: number): Promise<Product[]> {
    const url = `http://localhost:8080/api/product/random/${quantity}`;
    const products = await getData<Product[]>(url);
    return products;
}