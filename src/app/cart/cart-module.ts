import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { routes } from "../app.routes";

import { SharedModule } from "../shared/shared-module";
import { CartTableComponent } from "./components/cart-table/cart-table";
import { CartPaginationComponent } from "./components/cart-pagination/cart-pagination";

@NgModule({
  exports: [CartTableComponent],
  declarations: [CartTableComponent, CartPaginationComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class CartModule {}
