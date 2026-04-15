import { inject, Injectable } from "@angular/core";

import { BehaviorSubject, map, Observable } from "rxjs";
import { CartInfo } from "src/app/shared/models/cart-info";
import { CartEntryInfo } from "src/app/shared/models/cart-entry";
import { CartServiceAdapter } from "./cart-service-adapter";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartServiceAdapter: CartServiceAdapter = inject(CartServiceAdapter);
  private cartInfoSubject: BehaviorSubject<CartInfo> =
    new BehaviorSubject<CartInfo>({ id: "", products: [], userId: "" });
  cartInfo$: Observable<CartInfo> = this.cartInfoSubject.asObservable();

  getCurrentCart(): Observable<CartInfo> {
    return this.cartInfo$;
  }

  loadCart() {
    this.cartServiceAdapter
      .getCart(this.getCurrentCartId() ?? "")
      .subscribe((cart) => this.cartInfoSubject.next(cart));
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
    this.cartServiceAdapter.updateCart(cartInfo).subscribe();
  }

  addProduct(productId: number, count: number, title?: string, price?: number) {
    const cartInfo = this.cartInfoSubject.value;
    this.getCartEntryForProduct(productId).subscribe((entry) => {
      if (entry === undefined) {
        entry = {
          id: productId,
          title: title ?? "",
          price: price ?? NaN,
          count: count,
        };
        cartInfo.products.push(entry);
      } else {
        if (entry.count + count > 0) {
          entry.count = entry.count + count;
        }
      }
      cartInfo.products = cartInfo.products.filter((ent) => ent.count > 0);
      this.cartServiceAdapter.updateCart(cartInfo).subscribe();
    });
  }

  getProductCount(productId: number): Observable<number> {
    return this.getCartEntryForProduct(productId).pipe(
      map((entry) => entry?.count ?? 0),
    );
  }

  getCartEntryForProduct(
    productId: number,
  ): Observable<CartEntryInfo | undefined> {
    return this.cartInfo$.pipe(
      map((cart) => cart.products.find((entry) => entry.id == productId)),
    );
  }
}
