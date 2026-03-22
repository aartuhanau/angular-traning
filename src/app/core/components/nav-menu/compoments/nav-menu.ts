import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { map, Observable } from "rxjs";
import { CartService } from "src/app/shared/services/cart-service";

@Component({
  selector: "aa-nav-menu",
  imports: [RouterLink],
  templateUrl: "nav-menu.component.html",
  styleUrl: "nav-menu.css",
})
export class NavMenuComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  cartId$!: Observable<string>;

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartId$ = this.cartService
      .getCurrentCart()
      .pipe(map((cart) => cart.id));
  }
}
