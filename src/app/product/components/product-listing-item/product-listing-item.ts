import { Component, Input } from "@angular/core";
import { ProductInfo } from "src/app/shared/models/product-info";
@Component({
  selector: "product-listing-item",
  standalone: false,
  templateUrl: "product-listing-item.component.html",
  styleUrl: "product-listing-item.css",
})
export class ProductListingItemComponent {
  @Input({ required: true })
  productInfo!: ProductInfo;
}
