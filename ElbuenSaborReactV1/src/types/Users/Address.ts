import Base from "types/Base";
import Location from "./Location";
import { User } from "@auth0/auth0-react";

export default interface Address extends Base {
  number: string;
  street: string;
  location: Location;
  user?: User;
}