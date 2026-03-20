import { inject, Pipe, PipeTransform } from "@angular/core";
import { SearchState } from "../models/search-state";
import { ProductInfo } from "../models/product-info";

@Pipe({
  name: "search",
  pure: false,
})
export class SearchPipe implements PipeTransform {
  searchState = inject(SearchState);

  transform(value: ProductInfo[] | null): ProductInfo[] | null {
    if (value === null) {
      return null;
    }
    return value.filter((product) =>
      product.title.includes(this.searchState.search()),
    );
  }
}
