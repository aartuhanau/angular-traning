import { inject, Injectable } from "@angular/core";
import { ProductInfo } from "../models/product-info";
import { RequestBuilderService } from "./request-builder-service";
import { backendConfig } from "../endpoints";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, map, delay, Observable } from "rxjs";
import { FacetService } from "./facet-service";
import { ParamMap } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private requestBuilderService: RequestBuilderService = inject(
    RequestBuilderService,
  );
  private facetService: FacetService = inject(FacetService);
  private http: HttpClient = inject(HttpClient);
  private productListSubject: BehaviorSubject<Array<ProductInfo>> =
    new BehaviorSubject([] as ProductInfo[]);
  private productList: Observable<ProductInfo[]> =
    this.productListSubject.asObservable();

  getProducts(queryMap: ParamMap, delay?: number): Observable<ProductInfo[]> {
    let params = this.facetService.getFacetHttpParams(queryMap);
    this.getProductsInBehaviorObject(params, delay);
    return this.productList;
  }

  private getProductsInBehaviorObject(
    params: HttpParams,
    delayMillis?: number,
  ) {
    this.getProductsFromServer(params)
      .pipe(delay(delayMillis ?? 0))
      .subscribe((result) => this.productListSubject.next(result));
  }

  private getProductsFromServer(params: HttpParams) {
    const url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.getProducts,
    );
    return this.http.get<ProductInfo[]>(url, { params: params });
  }

  getProductCount(searchForm: FormGroup): Observable<number> {
    const queryMap = this.facetService.mapFormToUrlParams(searchForm);
    let params = this.facetService.getFacetHttpParams(queryMap);
    return this.getProductsFromServer(params).pipe(
      map((result) => result.length),
    );
  }

  deleteProduct(id: number, paramMap: ParamMap): void {
    const url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.deleteProduct.replace("{id}", id.toString()),
    );
    this.http.delete(url).subscribe(() => this.getProducts(paramMap, 1000));
  }

  getProduct(productId: string): Observable<ProductInfo> {
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.getProduct,
    );
    url = url.replace("{id}", productId);
    return this.http.get<ProductInfo>(url);
  }

  saveProduct(productId: string, productInfo: ProductInfo) {
    const url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.deleteProduct.replace("{id}", productId),
    );
    this.http.patch(url, productInfo).subscribe();
  }
}
