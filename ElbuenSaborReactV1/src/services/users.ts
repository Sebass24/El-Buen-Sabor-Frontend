import Address from "@Models/Users/Address";
import { getData, postPutData } from "../components/GenericFetch/GenericFetch";
import Phone from "@Models/Users/Phone";
import User from "@Models/Users/User";

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