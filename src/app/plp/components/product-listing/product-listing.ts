import { Component, inject, OnInit } from "@angular/core";
import { ProductListingItem } from "../product-listing-item/product-listing-item";
import { ProductInfo } from "src/app/shared/models/productinfo";
import { ProductService } from "src/app/shared/services/product-service";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { SearchPipe } from "src/app/shared/pipes/search-pipe";

@Component({
  selector: "product-listing",
  imports: [ProductListingItem, AsyncPipe, SearchPipe],
  templateUrl: "product-listing.component.html",
  styleUrl: "product-listing.css",
})
export class ProductListing implements OnInit {
  private productService: ProductService = inject(ProductService);
  productInfoList$!: Observable<ProductInfo[]>;

  ngOnInit(): void {
    this.productInfoList$ = this.productService.getProducts();
  }
}
