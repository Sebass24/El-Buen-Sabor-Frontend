export async function getDataNoToken<T>(path: string): Promise<T> {
  const response = await fetch(`${import.meta.env.VITE_BILL_DOWNLOAD}${path}`);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

interface responsePrefId {
  preferenceId: string;
}

export async function getDataWithBody<T>(path: string, data: T): Promise<responsePrefId> {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${import.meta.env.VITE_BILL_DOWNLOAD}${path}`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}