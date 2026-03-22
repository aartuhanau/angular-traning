import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Observable } from "rxjs";
import { AddToCartButtonComponent } from "src/app/shared/components/add-to-cart-button/add-to-cart-button";
import { ProductInfo } from "src/app/shared/models/product-info";
import { ProductService } from "src/app/shared/services/product-service";
import { StarRatingComponent } from "src/app/shared/components/star-rating/star-rating";
import { StockColorDirective } from "src/app/shared/directives/stock-color-directive";

@Component({
  selector: "aa-product-info-section",
  imports: [
    AsyncPipe,
    AddToCartButtonComponent,
    CurrencyPipe,
    StarRatingComponent,
    StockColorDirective,
  ],
  templateUrl: "product-info-section.component.html",
  styleUrl: "./product-info-section.css",
})
export class ProductInfoSectionComponent {
  @Input({ required: true })
  productId: string = "";
  product$!: Observable<ProductInfo>;
  productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    this.product$ = this.productService.getProduct(this.productId);
  }
}
