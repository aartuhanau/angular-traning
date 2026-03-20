import { ProductInfo } from "./productinfo";

export interface CartInfo {
  id: string;
  userId: string;
  products: ProductInfo[];
}
