import Product from "@Models/Product/Product";

async function getData<T>(path: string): Promise<T> {
    const response = await fetch(path);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

export async function getProducts() {
    const url = 'http://localhost:8080/api/product';
    const instrumentos = await getData<Product[]>(url);
    return instrumentos;
}

export async function getProductById(id: number) {
    const url = `http://localhost:8080/api/product/${id}`;
    const instrumentos = await getData<Product>(url);
    return instrumentos;
}