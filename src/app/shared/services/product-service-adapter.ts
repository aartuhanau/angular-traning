import { inject, Injectable } from "@angular/core";
import { RequestBuilderHelper } from "../helpers/request-builder-helper";
import { HttpClient, HttpParams } from "@angular/common/http";
import { backendConfig } from "../endpoints";
import { ProductInfo } from "../models/product-info";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductServiceAdapter {
  private requestBuilderService: RequestBuilderHelper =
    inject(RequestBuilderHelper);
  private http: HttpClient = inject(HttpClient);

  getProductsFromServer(params: HttpParams): Observable<ProductInfo[]> {
    const url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.getProducts,
    );
    return this.http.get<ProductInfo[]>(url, { params: params });
  }

  deleteProduct(id: number) {
    const url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.deleteProduct.replace("{id}", id.toString()),
    );
    return this.http.delete(url);
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
    return this.http.patch(url, productInfo);
  }
}
