import { Component, inject, OnInit } from "@angular/core";
import { ProductListingItem } from "../product-listing-item/product-listing-item";
import { ProductInfo } from "src/app/shared/models/productinfo";
import { ProductService } from "src/app/shared/services/product-service";
import { map, Observable, switchMap } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { SearchPipe } from "src/app/shared/pipes/search-pipe";
import { ActivatedRoute } from "@angular/router";
import { FacetService } from "src/app/shared/services/facet-service";
import { SearchBadgeComponent } from "../search-badge-component/search-badge-component";

@Component({
  selector: "product-listing",
  imports: [ProductListingItem, AsyncPipe, SearchPipe, SearchBadgeComponent],
  templateUrl: "product-listing.component.html",
  styleUrl: "product-listing.css",
})
export class ProductListing implements OnInit {
  private productService: ProductService = inject(ProductService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private facetService: FacetService = inject(FacetService);
  productInfoList$!: Observable<ProductInfo[]>;

  ngOnInit(): void {
    this.productInfoList$ = this.route.queryParamMap.pipe(
      switchMap((queryMap) => {
        const params = this.facetService.getFacetHttpParams(queryMap);
        return this.productService.getProducts(params);
      }),
    );
  }
}
