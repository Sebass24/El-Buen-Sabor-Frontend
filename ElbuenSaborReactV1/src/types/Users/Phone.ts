import Base from "types/Base";
import { User } from "@auth0/auth0-react";

export default interface Phone extends Base {
  number: string;
  user?: User;
}