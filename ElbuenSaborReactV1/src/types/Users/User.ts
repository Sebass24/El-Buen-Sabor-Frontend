import Base from "@Models/Base";
import Role from "./Role";
import Address from "./Address";
import Phone from "./Phone";

export default interface User extends Base {
    lastName: string;
    name: string;
    password: string;
    userEmail: string;
    role: Role;
    addresses: Address[];
    phones: Phone[];
}