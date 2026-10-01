import { Component, inject, OnInit } from "@angular/core";
import { ProductInfo } from "src/app/shared/models/product-info";
import { Observable, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectAllProducts } from "src/app/store/plp.state";

@Component({
  selector: "aa-product-listing",
  standalone: false,
  templateUrl: "product-listing.component.html",
  styleUrl: "product-listing.css",
})
export class ProductListingComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private store = inject(Store);
  productInfoList$: Observable<ProductInfo[]> =
    this.store.select(selectAllProducts);

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap((params) =>
          this.store.dispatch({
            type: "[Products API] LoadProducts",
            queryMap: params,
          }),
        ),
      )
      .subscribe();
  }
}
