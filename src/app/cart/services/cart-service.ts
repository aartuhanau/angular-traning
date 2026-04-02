import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { RequestBuilderHelper } from "src/app/shared/services/request-builder-helper";
import { CartInfo } from "src/app/shared/models/cart-info";
import { backendConfig } from "src/app/shared/endpoints";
import { CartEntryInfo } from "src/app/shared/models/cart-entry";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private requestBuilderService: RequestBuilderHelper =
    inject(RequestBuilderHelper);
  private http: HttpClient = inject(HttpClient);
  private cartInfoSubject: BehaviorSubject<CartInfo> =
    new BehaviorSubject<CartInfo>({ id: "", products: [], userId: "" });
  cartInfo$: Observable<CartInfo> = this.cartInfoSubject.asObservable();

  getCurrentCart(): Observable<CartInfo> {
    return this.cartInfo$;
  }

  loadCart() {
    this.getCart(this.getCurrentCartId() ?? "").subscribe((cart) =>
      this.cartInfoSubject.next(cart),
    );
  }

  private getCart(id: string) {
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.getCart,
    );
    url = url.replace("{id}", id);
    return this.http.get<CartInfo>(url);
  }

  getCurrentCartId(): string | null {
    let sessionCart = localStorage.getItem("sessionCart");
    if (sessionCart === null) {
      localStorage.setItem("sessionCart", "1");
    }
    return sessionCart ?? "1";
  }

  removeProductFromCart(productId: number) {
    const cartInfo = this.cartInfoSubject.value;
    cartInfo.products = cartInfo.products.filter(
      (entry) => entry.id !== productId,
    );
    this.updateCart(cartInfo);
  }

  addProduct(productId: number, count: number) {
    const cartInfo = this.cartInfoSubject.value;
    let entry: CartEntryInfo | undefined =
      this.getCartEntryForProduct(productId);
    if (entry === undefined) {
      entry = { id: productId, title: "", price: NaN, count: count };
      cartInfo.products.push(entry);
    } else {
      if (entry.count + count > 0) {
        entry.count = entry.count + count;
      }
    }
    cartInfo.products = cartInfo.products.filter((ent) => ent.count > 0);
    this.updateCart(cartInfo);
  }

  private updateCart(cartInfo: CartInfo) {
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.updateCart,
    );
    url = url.replace("{id}", cartInfo.id);
    this.http.put(url, cartInfo).subscribe();
  }

  getProductCount(productId: number): number {
    return this.getCartEntryForProduct(productId)?.count ?? 0;
  }

  getCartEntryForProduct(productId: number): CartEntryInfo | undefined {
    const cartInfo = this.cartInfoSubject.value;
    return cartInfo.products.find((entry) => entry.id == productId);
  }
}
