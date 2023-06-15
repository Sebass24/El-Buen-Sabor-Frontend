

export async function getData<T>(path: string): Promise<T> {
  const token = sessionStorage.getItem("token")
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const response = await fetch(`http://localhost:8080${path}`, options);
  console.log(response);
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
  console.log(JSON.stringify(data));
  const token = sessionStorage.getItem("token")
  const response = await fetch(`http://localhost:8080${path}`, {
    method: method.toUpperCase(),
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
