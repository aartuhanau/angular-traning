import { CurrencyPipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { ProductInfo } from "src/app/shared/models/productinfo";
import { ControlPanel } from "../control-panel/control-panel";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
@Component({
  selector: "product-listing-item",
  imports: [CurrencyPipe, ControlPanel, FontAwesomeModule],
  templateUrl: "product-listing-item.component.html",
  styleUrl: "product-listing-item.css",
})
export class ProductListingItem {
  productInfo = input.required<ProductInfo>();
  faStar = faStar;
}
