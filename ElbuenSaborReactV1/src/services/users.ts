import Address from "@Models/Users/Address";
import { getData } from "./generic";
import Phone from "@Models/Users/Phone";

export async function getAddressesByUserId() {
    const url = `http://localhost:8080/api/product`;
    const addresses = await getData<Address[]>(url);
    return addresses;
}

export async function getPhonesByUserId() {
    const url = `http://localhost:8080/api/product`;
    const phones = await getData<Phone[]>(url);
    return phones;
}