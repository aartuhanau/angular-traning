import { Component } from '@angular/core';
import { CartTable } from "../cart-table/cart-table";
import { CartPagination } from "../cart-pagination/cart-pagination";

@Component({
  selector: 'cart-view',
  imports: [CartTable, CartPagination],
  templateUrl: 'cart-view.component.html',
  styles: ``,
})
export class CartPage {

}
