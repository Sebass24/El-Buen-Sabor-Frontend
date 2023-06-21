import Address from "types/Users/Address";
import { deleteData, getData, postPutData } from "../components/GenericFetch/GenericFetch";
import Phone from "types/Users/Phone";
import User from "types/Users/User";
import Order from "types/orderFixed/Order";

export async function getAddressesByUserId(id: number) {
  const url = `/api/user/addresses/${id}`;
  const addresses = await getData<Address[]>(url);
  return addresses;
}

export async function getPhonesByUserId(id: number) {
  const url = `/api/user/phones/${id}`;
  const phones = await getData<Phone[]>(url);
  return phones;
}

export async function getUserData(auth0id: string) {
  const url = `/api/user/auth0/${auth0id}`;
  const user = await getData<User>(url);
  return user;
}

export async function postNewUser(newUser: User) {
  const url = "/api/user";
  const method = 'POST';
  const user = await postPutData(url, method, newUser);
  return user;
}

export async function updateUser(user: User) {
  const url = "/api/user";
  const method = 'PUT';
  const updatedUser = await postPutData(url, method, user);
  return updatedUser;
}

export async function postNewOrder(newOrder: Order) {
  const url = "/api/order";
  const method = 'POST';
  const order = await postPutData(url, method, newOrder);
  return order;
}

export async function postNewAddress(newAddress: Address) {
  const url = "/api/address";
  const method = 'POST';
  const address = await postPutData(url, method, newAddress);
  return address;
}

export async function updateAddress(address: Address) {
  const url = "/api/address";
  const method = 'PUT';
  const response = await postPutData(url, method, address);
  return response;
}

export async function deleteAddress(addressId: number) {
  const url = `/api/address/${addressId}`;
  await deleteData(url);
}

export async function postNewPhone(newPhone: Phone) {
  const url = "/api/phone";
  const method = 'POST';
  const address = await postPutData(url, method, newPhone);
  return address;
}

export async function updatePhone(phone: Phone) {
  const url = "/api/phone";
  const method = 'PUT';
  const updatedPhone = await postPutData(url, method, phone);
  return updatedPhone;
}

export async function deletePhone(phoneId: number) {
  const url = `/api/phone/${phoneId}`;
  await deleteData(url);
}