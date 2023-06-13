import Base from "@Models/Base";
import Location from "./Location";

export default interface Address extends Base {
    number: string;
    street: string;
    location: Location | string;
}