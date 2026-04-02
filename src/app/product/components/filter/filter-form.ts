import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { FacetHelper } from "src/app/shared/services/facet-helper";
import { MapFacetHelper } from "src/app/shared/services/mapper-helper";
import { ProductService } from "src/app/shared/services/product-service";

@Component({
  selector: "aa-filter-form",
  standalone: false,
  templateUrl: "./filter-form.component.html",
  styleUrl: "filter-form.css",
})
export class FilterFormComponent implements OnInit {
  private facetService: FacetHelper = inject(FacetHelper);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private mapFacetService: MapFacetHelper = inject(MapFacetHelper);
  private productService: ProductService = inject(ProductService);
  private filterCountSubject = new BehaviorSubject<number>(0);
  filterCount$: Observable<number> = this.filterCountSubject.asObservable();

  searchForm = new FormGroup({
    priceFrom: new FormControl(null, { validators: Validators.min(0) }),
    priceTo: new FormControl(null, { validators: Validators.min(0) }),
    inStock: new FormControl(),
    hasReviews: new FormControl(),
    ratingFrom: new FormControl(null, {
      validators: [Validators.min(0), Validators.max(5)],
    }),
    ratingTo: new FormControl(null, {
      validators: [Validators.min(0), Validators.max(5)],
    }),
  });

  facetSearch(): void {
    let params: { [key: string]: string } = this.facetService.mapFormToKeyValue(
      this.searchForm,
    );
    this.router.navigate([], {
      queryParams: params,
      onSameUrlNavigation: "reload",
    });
  }

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        switchMap(() => {
          return this.productService.getProductCount(this.searchForm);
        }),
      )
      .subscribe((count) => this.filterCountSubject.next(count));
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
