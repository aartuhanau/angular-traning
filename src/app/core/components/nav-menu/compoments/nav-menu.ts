import { Component, inject, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { AuthService } from "src/app/shared/services/auth-service";
import { CartService } from "src/app/shared/services/cart-service";

@Component({
  selector: "aa-nav-menu",
  standalone: false,
  templateUrl: "nav-menu.component.html",
  styleUrl: "nav-menu.css",
})
export class NavMenuComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  private authService: AuthService = inject(AuthService);
  cartId$!: Observable<string>;

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartId$ = this.cartService
      .getCurrentCart()
      .pipe(map((cart) => cart.id));
  }

  isAnonymous(): boolean {
    return !this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
