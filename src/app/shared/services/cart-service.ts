import { inject, Injectable } from "@angular/core";
import { RequestBuilderService } from "./request-builder-service";
import { HttpClient } from "@angular/common/http";
import { backendConfig } from "../endpoints";
import { CartInfo } from "../models/cart-info";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private requestBuilderService: RequestBuilderService = inject(
    RequestBuilderService,
  );
  private http: HttpClient = inject(HttpClient);
  getCart(id: string) {
      let url = this.requestBuilderService.getTargetUrl(
          backendConfig.backendUrls.getProduct,
        );
        url = url.replace("{id}", id);
        return this.http.get<CartInfo>(url);
  }
}
