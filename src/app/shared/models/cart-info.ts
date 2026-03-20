import { CartEntryInfo } from "./cart-entry";

export interface CartInfo {
  id: string;
  userId: string;
  products: CartEntryInfo[];
}
