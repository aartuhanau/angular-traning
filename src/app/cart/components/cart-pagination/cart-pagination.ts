import { AsyncPipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { map, Observable } from "rxjs";
import { CartService } from "src/app/shared/services/cart-service";

@Component({
  selector: "cart-pagination",
  imports: [AsyncPipe],
  templateUrl: "cart-pagination.component.html",
  styles: ``,
})
export class CartPagination implements OnInit {
  private cartService: CartService = inject(CartService);
  @Input()
  currentPage: number = 0;
  @Input()
  pageSize: number = 3;
  @Input()
  totalCount!: number;
  pages!: Observable<number[]>;

  @Output()
  startItem = new EventEmitter<number>();

  ngOnInit(): void {
    this.pages = this.cartService
      .getCurrentCart()
      .pipe(
        map((cart) =>
          Array.from(
            { length: cart.products.length / this.pageSize },
            (_, index) => index,
          ),
        ),
      );
  }
}
