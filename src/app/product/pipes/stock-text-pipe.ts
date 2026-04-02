import { inject, Pipe, PipeTransform } from "@angular/core";
import { SearchState } from "../../shared/models/search-state";
import { ProductInfo } from "../../shared/models/product-info";

@Pipe({
  name: "stockText",
  standalone: false,
})
export class StockTextPipe implements PipeTransform {
  transform(value: number | undefined): string | null {
    if (value === undefined) {
      return null;
    }
    if (value < 1) {
      return "Out of stock";
    } else if (value < 10) {
      return "Almost sold out";
    }
    return "In stock";
  }
}
