import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, shareReplay, switchMap } from "rxjs";
import { FacetService } from "src/app/shared/services/facet-service";
import { MapFacetService } from "src/app/shared/services/mapper-service";
import { ProductService } from "src/app/shared/services/product-service";

@Component({
  selector: "aa-filter-form",
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: "filter-form.component.html",
  styleUrl: "filter-form.css",
})
export class FilterFormComponent implements OnInit {
  private facetService: FacetService = inject(FacetService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private mapFacetService: MapFacetService = inject(MapFacetService);
  private productService: ProductService = inject(ProductService);
  private filterCountSubject = new BehaviorSubject<number>(0);
  filterCount$: Observable<number> = this.filterCountSubject.asObservable();

  searchForm = new FormGroup({
    priceFrom: new FormControl(),
    priceTo: new FormControl(),
    inStock: new FormControl(),
    hasReviews: new FormControl(),
    ratingFrom: new FormControl(),
    ratingTo: new FormControl(),
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
