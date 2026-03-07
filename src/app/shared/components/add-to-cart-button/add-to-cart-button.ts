import { Component } from "@angular/core";

@Component({
  selector: "add-to-cart-button",
  imports: [],
  templateUrl: "add-to-cart-button.component.html",
  styleUrl: "add-to-cart-button.css",
})
export class AddToCartButton {
  public counter: number = 0;

  increaseCounter(): void {
    this.counter++;
  }

  decreaseCounter(): void {
    this.counter--;
  }
}
