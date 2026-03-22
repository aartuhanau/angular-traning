import { CurrencyPipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ProductInfo } from "src/app/shared/models/product-info";
import { ControlPanel } from "../control-panel/control-panel";
import { RouterLink } from "@angular/router";
import { StarRatingComponent } from "src/app/shared/components/star-rating/star-rating";
@Component({
  selector: "product-listing-item",
  imports: [CurrencyPipe, ControlPanel, RouterLink, StarRatingComponent],
  templateUrl: "product-listing-item.component.html",
  styleUrl: "product-listing-item.css",
})
export class ProductListingItem {
  @Input({ required: true })
  productInfo!: ProductInfo;
}
