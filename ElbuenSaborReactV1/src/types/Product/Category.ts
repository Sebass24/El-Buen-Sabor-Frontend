import Base from "../Base";

export default interface Category extends Base {
  name: string;
  parentCategory?: Category;
}