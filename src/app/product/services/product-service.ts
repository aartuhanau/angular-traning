import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, delay, Observable } from "rxjs";

import { ParamMap } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { HttpParams } from "@angular/common/http";
import { FacetHelper } from "src/app/shared/helpers/facet-helper";
import { ProductInfo } from "src/app/shared/models/product-info";
import { ProductServiceAdapter } from "src/app/shared/services/product-service-adapter";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private facetService: FacetHelper = inject(FacetHelper);
  private productListSubject: BehaviorSubject<Array<ProductInfo>> =
    new BehaviorSubject([] as ProductInfo[]);
  private productList: Observable<ProductInfo[]> =
    this.productListSubject.asObservable();
  private productServiceAdapter: ProductServiceAdapter = inject(
    ProductServiceAdapter,
  );

  getProducts(queryMap: ParamMap, delay?: number): Observable<ProductInfo[]> {
    let params = this.facetService.getFacetHttpParams(queryMap);
    this.getProductsInBehaviorObject(params, delay);
    return this.productList;
  }

  private getProductsInBehaviorObject(
    params: HttpParams,
    delayMillis?: number,
  ) {
    this.productServiceAdapter
      .getProductsFromServer(params)
      .pipe(delay(delayMillis ?? 0))
      .subscribe((result) => this.productListSubject.next(result));
  }

  getProductCount(searchForm: FormGroup): Observable<number> {
    const queryMap = this.facetService.mapFormToUrlParams(searchForm);
    let params = this.facetService.getFacetHttpParams(queryMap);
    return this.productServiceAdapter
      .getProductsFromServer(params)
      .pipe(map((result) => result.length));
  }

  deleteProduct(id: number, paramMap: ParamMap): void {
    this.productServiceAdapter
      .deleteProduct(id)
      .subscribe(() => this.getProducts(paramMap, 1000));
  }

  getProduct(id: string): Observable<ProductInfo> {
    return this.productServiceAdapter.getProduct(id);
  }

  saveProduct(productId: string, productInfo: ProductInfo) {
    this.productServiceAdapter.saveProduct(productId, productInfo).subscribe();
  }
}
