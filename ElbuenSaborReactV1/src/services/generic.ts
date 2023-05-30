export async function getData<T>(path: string): Promise<T> {
    const response = await fetch(path);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}