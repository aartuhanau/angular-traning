import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CartInfo } from "src/app/shared/models/cart-info";
import { CartService } from "src/app/shared/services/cart-service";

@Component({
  selector: "cart-table",
  imports: [AsyncPipe],
  templateUrl: "cart-table.component.html",
  styleUrl: "cart-table.css",
})
export class CartTable implements OnInit {
  private cartService: CartService = inject(CartService);
  cartInfo$!: Observable<CartInfo | null>;

  ngOnInit(): void {
    this.cartInfo$ = this.cartService.getCurrentCart();
  }
}
