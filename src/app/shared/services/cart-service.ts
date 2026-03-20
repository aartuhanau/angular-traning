import { inject, Injectable } from "@angular/core";
import { RequestBuilderService } from "./request-builder-service";
import { HttpClient } from "@angular/common/http";
import { backendConfig } from "../endpoints";
import { CartInfo } from "../models/cart-info";
import { CartEntryInfo } from "../models/cart-entry";
import { BehaviorSubject, map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private requestBuilderService: RequestBuilderService = inject(
    RequestBuilderService,
  );
  private http: HttpClient = inject(HttpClient);
  private cartInfoSubject: BehaviorSubject<CartInfo> =
    new BehaviorSubject<CartInfo>({ id: "", products: [], userId: "" });
  private loadingCartInfoSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  cartInfo$: Observable<CartInfo> = this.cartInfoSubject.asObservable();

  getCurrentCart(): Observable<CartInfo> {
    return this.cartInfo$;
  }

  loadCart() {
    this.loadingCartInfoSubject.next(true);
    this.getCart(this.getCurrentCartId() ?? "")
      .pipe(
        map((cart) => {
          this.cartInfoSubject.next(cart);
          this.loadingCartInfoSubject.next(false);
        }),
      )
      .subscribe();
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

  addProduct(productId: number, count: number) {
    const cartInfo = this.cartInfoSubject.value;
    let entry: CartEntryInfo | undefined = cartInfo.products.find(
      (entry) => entry.id == productId,
    );
    if (entry === undefined) {
      entry = { id: productId, title: "", price: NaN, count: count };
      cartInfo.products.push(entry);
    } else {
      if (entry.count + count > 0) {
        entry.count = entry.count + count;
      }
    }
    cartInfo.products = cartInfo.products.filter((ent) => ent.count > 0);
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.getCart,
    );
    url = url.replace("{id}", cartInfo.id);
    this.http.put(url, cartInfo).subscribe();
  }
}
