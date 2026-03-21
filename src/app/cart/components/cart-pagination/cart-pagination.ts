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
import { PaginationInfo } from "src/app/shared/models/pagination-info";
import { CartService } from "src/app/shared/services/cart-service";

@Component({
  selector: "cart-pagination",
  imports: [AsyncPipe],
  templateUrl: "cart-pagination.component.html",
  styleUrl: "cart-pagination.css",
})
export class CartPagination implements OnInit {
  private cartService: CartService = inject(CartService);
  @Input()
  currentPage: number = 0;
  @Input()
  pageSize: number = 3;
  @Input()
  entriesCount!: number;
  pages!: Observable<number[]>;

  @Output()
  paginationInfo = new EventEmitter<PaginationInfo>();

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

  updatePagination(page: number): void {
    this.currentPage = page;
    const paginationStart = page * this.pageSize;
    const paginationEnd =
      (page + 1) * this.pageSize > this.entriesCount
        ? this.entriesCount
        : (page + 1) * this.pageSize;
    this.paginationInfo.emit({
      startNumber: paginationStart,
      endNumber: paginationEnd,
    });
  }
}
