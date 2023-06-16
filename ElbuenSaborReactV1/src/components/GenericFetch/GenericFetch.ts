

export async function getData<T>(path: string): Promise<T> {
  const token = sessionStorage.getItem("token")
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const response = await fetch(`http://localhost:8080${path}`, options);

  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

export async function deleteData<T>(path: string) {
  const token = sessionStorage.getItem("token");
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`http://localhost:8080${path}`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}


//si el metodo es post, data no tiene que tener id
//si el metodo es put, data tiene que tener id
export async function postPutData<T>(
  path: string,
  method: string,
  data: T
): Promise<T> {
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
