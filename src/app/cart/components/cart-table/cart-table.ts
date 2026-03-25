import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CartInfo } from "src/app/shared/models/cart-info";
import { CartService } from "src/app/shared/services/cart-service";
import { PaginationInfo } from "src/app/shared/models/pagination-info";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "aa-cart-table",
  standalone: false,
  templateUrl: "cart-table.component.html",
  styleUrl: "cart-table.css",
})
export class CartTableComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  cartInfo$!: Observable<CartInfo | null>;
  start: number = 0;
  end: number = 5;
  faXmark = faXmark;

  ngOnInit(): void {
    this.cartInfo$ = this.cartService.getCurrentCart();
  }

  updatePagination(pageInfo: PaginationInfo) {
    this.start = pageInfo.startNumber;
    this.end = pageInfo.endNumber;
  }

  removeProduct(productId: number) {
    this.cartService.removeProductFromCart(productId);
  }
}
