export async function getData<T>(path: string): Promise<T> {
  const response = await fetch(`http://localhost:8080${path}`);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

//si el metodo es post, data no tiene que tener id
//si el metodo es put, data tiene que tener id
export async function postPutData<T>(
  path: string,
  method: string,
  data: T
): Promise<T> {
  const response = await fetch(`http://localhost:8080${path}`, {
    method: method.toUpperCase(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
