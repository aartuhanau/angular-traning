import { RatingInfo } from "./ratinginfo";

export interface ProductInfo {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  rating: RatingInfo;
}
