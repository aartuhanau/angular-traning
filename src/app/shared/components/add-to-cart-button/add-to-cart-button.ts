import { Component, inject, Input, OnInit } from "@angular/core";
import { CartService } from "../../services/cart-service";

@Component({
  selector: "aa-add-to-cart-button",
  imports: [],
  templateUrl: "add-to-cart-button.component.html",
  styleUrl: "add-to-cart-button.css",
})
export class AddToCartButtonComponent implements OnInit {
  private _counter: number = 0;
  private cartService: CartService = inject(CartService);
  @Input()
  updateCounter: boolean = false;
  @Input()
  productId!: number;
  @Input()
  disabled: boolean = false;

  ngOnInit(): void {
    if (this.updateCounter) {
      this._counter = this.cartService.getProductCount(this.productId);
    }
  }

  addToCart(): void {
    this._counter = this.cartService.getProductCount(this.productId);
    this.increaseCounter();
  }

  increaseCounter(): void {
    this.cartService.addProduct(this.productId, 1);
    this._counter++;
  }

  decreaseCounter(): void {
    this.cartService.addProduct(this.productId, -1);
    this._counter--;
  }

  counter(): number {
    return this._counter;
  }
}
