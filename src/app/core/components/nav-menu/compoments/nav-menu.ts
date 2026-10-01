import { Component, computed, inject, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth-service";
import { CartService } from "src/app/cart/services/cart-service";
import { Store } from "@ngrx/store";
import { authActions } from "../../../../store/actions/auth.actions";

@Component({
  selector: "aa-nav-menu",
  standalone: false,
  templateUrl: "nav-menu.component.html",
  styleUrl: "nav-menu.css",
})
export class NavMenuComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  private authService: AuthService = inject(AuthService);
  private store: Store = inject(Store);
  isAnonymous = computed(() => !this.authService.isAuthenticated());
  cartId$!: Observable<string>;

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartId$ = this.cartService
      .getCurrentCart()
      .pipe(map((cart) => cart.id));
  }

  logout(): void {
    this.store.dispatch(authActions.authLogoutUser());
  }
}
