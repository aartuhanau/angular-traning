import { Component, inject, OnInit } from "@angular/core";
import { ProductListingItem } from "../product-listing-item/product-listing-item";
import { ProductInfo } from "src/app/shared/models/product-info";
import { ProductService } from "src/app/shared/services/product-service";
import { map, Observable, switchMap } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { SearchPipe } from "src/app/shared/pipes/search-pipe";
import { ActivatedRoute } from "@angular/router";
import { FacetService } from "src/app/shared/services/facet-service";
import { SearchPanelComponent } from "../search-panel-component/search-panel-component";

@Component({
  selector: "aa-product-listing",
  imports: [ProductListingItem, AsyncPipe, SearchPipe, SearchPanelComponent],
  templateUrl: "product-listing.component.html",
  styleUrl: "product-listing.css",
})
export class ProductListingComponent implements OnInit {
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
