import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { FacetService } from "src/app/shared/services/facet-service";
import { MapFacetService } from "src/app/shared/services/mapper-service";
import { ProductService } from "src/app/shared/services/product-service";

@Component({
  selector: "filter-form",
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: "filter-form.component.html",
  styles: ``,
})
export class FilterForm implements OnInit {
  private facetService: FacetService = inject(FacetService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private mapFacetService: MapFacetService = inject(MapFacetService);
  private productService: ProductService = inject(ProductService)
  filterCount$! : Observable<number>  

  searchForm = new FormGroup({
    priceFrom: new FormControl(),
    priceTo: new FormControl(),
    inStock: new FormControl(),
    hasReviews: new FormControl(),
    ratingFrom: new FormControl(),
    ratingTo: new FormControl(),
  });

  facetSearch(): void {
    let params: { [key: string]: string } =
      this.facetService.mapFormToKeyValue(this.searchForm);
    this.router.navigate([], {
      queryParams: params,
      onSameUrlNavigation: "reload",
    });
  }

  ngOnInit(): void {
    this.filterCount$! = this.searchForm.valueChanges.pipe(
      switchMap(()=> {const params = this.facetService.getFacetHttpParams(this.facetService.mapFormToUrlParams(this.searchForm))
        return this.productService.getProductCount(params)
       })
    )
    this.route.queryParamMap.subscribe((queryParams) => {
      this.facetService.getFacetList(queryParams).forEach((facetInfo) => {
        if (this.mapFacetService.isFacetValueDefault(facetInfo.code)) {
          this.searchForm.get(facetInfo.code)?.patchValue(true);
        } else {
          this.searchForm.get(facetInfo.code)?.patchValue(facetInfo.value);
        }
      });
    });
  }
}
