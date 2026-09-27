import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { backendConfig } from "src/app/shared/endpoints";
import { CartInfo } from "src/app/shared/models/cart-info";
import { RequestBuilderHelper } from "src/app/shared/helpers/request-builder-helper";

@Injectable({
  providedIn: "root",
})
export class CartServiceAdapter {
  private requestBuilderService: RequestBuilderHelper =
    inject(RequestBuilderHelper);
  private http: HttpClient = inject(HttpClient);

  getCart(id: string): Observable<CartInfo> {
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.getCart,
    );
    url = url.replace("{id}", id);
    return this.http.get<CartInfo>(url);
  }

  updateCart(cartInfo: CartInfo): Observable<Object> {
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.updateCart,
    );
    url = url.replace("{id}", cartInfo.id);
    return this.http.put(url, cartInfo);
  }
}
