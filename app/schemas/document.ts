import { type DocumentLinks } from "./links";

export default interface Document<T> {
  data: T;
  links?: DocumentLinks;
}
