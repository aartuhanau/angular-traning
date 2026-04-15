import { Component, inject, OnInit } from "@angular/core";
import { ProductInfo } from "src/app/shared/models/product-info";
import { Observable, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product-service";

@Component({
  selector: "aa-product-listing",
  standalone: false,
  templateUrl: "product-listing.component.html",
  styleUrl: "product-listing.css",
})
export class ProductListingComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  productInfoList$!: Observable<ProductInfo[]>;

  ngOnInit(): void {
    this.productInfoList$ = this.route.queryParamMap.pipe(
      switchMap((queryMap) => {
        return this.productService.getProducts(queryMap);
      }),
    );
  }
}
