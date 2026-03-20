import { Component, inject, Input } from "@angular/core";
import { CartService } from "../../services/cart-service";

@Component({
  selector: "add-to-cart-button",
  imports: [],
  templateUrl: "add-to-cart-button.component.html",
  styleUrl: "add-to-cart-button.css",
})
export class AddToCartButton {
  private _counter: number = 0;
  private cartService: CartService = inject(CartService);
  @Input()
  productId!: number;
  @Input()
  disabled: boolean = false;

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
