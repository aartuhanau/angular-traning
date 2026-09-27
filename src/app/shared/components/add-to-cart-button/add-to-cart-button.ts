import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { CartService } from "src/app/cart/services/cart-service";
import { ProductInfo } from "../../models/product-info";

@Component({
  standalone: false,
  selector: "aa-add-to-cart-button",
  templateUrl: "add-to-cart-button.component.html",
  styleUrl: "add-to-cart-button.css",
})
export class AddToCartButtonComponent implements OnInit, OnChanges {
  private _counter: number = 0;
  private cartService: CartService = inject(CartService);
  @Input()
  updateCounter: boolean = false;
  @Input()
  productInfo!: ProductInfo;
  @Input()
  count?: number;
  @Input()
  disabled: boolean = false;

  ngOnInit(): void {
    if (this.updateCounter) {
      this.cartService.getProductCount(this.productInfo.id).subscribe(entryCount => this._counter = entryCount);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.count !== undefined) {
      this._counter = this.count;
    }
  }

  addToCart(): void {
    this.increaseCounter();
  }

  increaseCounter(): void {
    this.cartService.addProduct(
      this.productInfo.id,
      1,
      this.productInfo.title,
      this.productInfo.price,
    );
    this._counter++;
  }

  decreaseCounter(): void {
    if (this._counter - 1 === 0) {
      this.cartService.removeProductFromCart(this.productInfo.id)
    } else {
      this.cartService.addProduct(this.productInfo.id, -1);
    }
    this._counter--;
  }

  counter(): number {
    return this._counter;
  }
}
