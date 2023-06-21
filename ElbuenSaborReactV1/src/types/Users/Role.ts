import Base from "types/Base";

export default interface Role extends Base {
  description: string;
  auth0RoleId?: string
}