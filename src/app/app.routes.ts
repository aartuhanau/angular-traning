import { Routes } from "@angular/router";
import { PlpPage } from "./plp/components/plp-page/plp-page";
import { DetailsPage } from "./details-page/components/details-page/details-page";
import { EditPage } from "./edit-page/components/edit-page/edit-page";
import { CartPage } from "./cart/components/cart-view/cart-view";

export const routes: Routes = [
  {
    path: "",
    component: PlpPage,
  },
  {
    path: "product/:id",
    component: DetailsPage,
  },
  {
    path: "product/edit/:id",
    component: EditPage,
  },
  {
    path: "cart/:id",
    component: CartPage,
  },
];
