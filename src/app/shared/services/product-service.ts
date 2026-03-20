import { inject, Injectable } from "@angular/core";
import { ProductInfo } from "../models/product-info";
import { RequestBuilderService } from "./request-builder-service";
import { backendConfig } from "../endpoints";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private requestBuilderService: RequestBuilderService = inject(
    RequestBuilderService,
  );
  private http: HttpClient = inject(HttpClient);

  getProducts(params: HttpParams): Observable<ProductInfo[]> {
    const url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.getProducts,
    );
    return this.http.get<ProductInfo[]>(url, { params: params });
  }

  getProductCount(params: HttpParams): Observable<number> {
    return this.getProducts(params).pipe(map((result) => result.length));
  }

  deleteProduct(id: number): void {
    const url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.deleteProduct.replace("{id}", id.toString()),
    );
    this.http.delete(url).subscribe();
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
