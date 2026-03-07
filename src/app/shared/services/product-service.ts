import { inject, Injectable } from "@angular/core";
import { ProductInfo } from "../models/productinfo";
import { RequestBuilderService } from "./request-builder-service";
import { backendConfig } from "../endpoints";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  requestBuilderService: RequestBuilderService = inject(RequestBuilderService);
  http: HttpClient = inject(HttpClient);

  getProducts(): Observable<ProductInfo[]> {
    const url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.getProducts,
    );
    return this.http.get<ProductInfo[]>(url);
  }

  deleteProduct(id: number): void {
    const url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.deleteProduct.replace("{id}", id.toString()),
    );
    this.http.delete(url).subscribe();
  }
}
