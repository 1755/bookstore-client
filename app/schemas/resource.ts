import { type ResourceLinks } from "./links";

export default interface Resource<T> {
  type: string;
  id: string;
  attributes: T;
  links?: ResourceLinks;
}
