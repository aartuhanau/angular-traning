import { Component, inject, OnInit } from "@angular/core";
import { ProductListingItem } from "../product-listing-item/product-listing-item";
import { ProductInfo } from "src/app/shared/models/productinfo";
import { ProductService } from "src/app/shared/services/product-service";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "product-listing",
  imports: [ProductListingItem, AsyncPipe],
  templateUrl: "product-listing.component.html",
  styleUrl: "product-listing.css",
})
export class ProductListing implements OnInit {
  productInfoList$!: Observable<ProductInfo[]>;
  productService: ProductService = inject(ProductService);

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  ngOnInit(): void {
    this.productInfoList$ = this.productService.getProducts();
  }
}
