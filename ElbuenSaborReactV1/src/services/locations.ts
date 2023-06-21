import Location from "types/Users/Location";
import { getData } from "components/GenericFetch/GenericFetch";

export async function getLocations() {
  const url = `/api/locations`;
  const locations = await getData<Location[]>(url);
  return locations;
}