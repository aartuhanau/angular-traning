import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { CartInfo } from "src/app/shared/models/cart-info";
import { CartService } from "src/app/shared/services/cart-service";

@Component({
  selector: "cart-table",
  imports: [],
  templateUrl: "cart-table.component.html",
  styles: ``,
})
export class CartTable implements OnInit {
  private cartService: CartService = inject(CartService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  cartInfo$!: Observable<CartInfo>;

  ngOnInit(): void {
    this.cartInfo$ = this.route.paramMap.pipe(
      switchMap((paramMap) =>
        this.cartService.getCart(paramMap.get("id") ?? ""),
      ),
    );
  }
}
