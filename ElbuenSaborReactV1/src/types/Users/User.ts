import Base from "types/Base";
import Address from "./Address";
import Phone from "./Phone";
import Role from "./Role";

export default interface User extends Base {
  auth0Id?: string;
  lastName?: string;
  name?: string;
  userEmail?: string;
  addresses?: Address[] | null;
  phones?: Phone[] | null;
  role?: Role;
}