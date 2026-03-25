import { AsyncPipe, SlicePipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CartInfo } from "src/app/shared/models/cart-info";
import { CartService } from "src/app/shared/services/cart-service";
import { CartPaginationComponent } from "../cart-pagination/cart-pagination";
import { PaginationInfo } from "src/app/shared/models/pagination-info";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AddToCartButtonComponent } from "src/app/shared/components/add-to-cart-button/add-to-cart-button";

@Component({
  selector: "aa-cart-table",
  imports: [
    AsyncPipe,
    SlicePipe,
    CartPaginationComponent,
    FontAwesomeModule,
    AddToCartButtonComponent,
  ],
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
