import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Observable } from "rxjs";
import { AddToCartButton } from "src/app/shared/components/add-to-cart-button/add-to-cart-button";
import { ProductInfo } from "src/app/shared/models/productinfo";
import { ProductService } from "src/app/shared/services/product-service";
import { StarRating } from "src/app/shared/components/star-rating/star-rating";

@Component({
  selector: "product-info-section",
  imports: [AsyncPipe, AddToCartButton, CurrencyPipe, StarRating],
  templateUrl: "product-info-section.component.html",
  styleUrl: "./product-info-section.css",
})
export class ProductInfoSection {
  @Input({ required: true })
  productId: string = "";
  product$!: Observable<ProductInfo>;
  productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    this.product$ = this.productService.getProduct(this.productId);
  }
}
