import { Routes } from "@angular/router";
import { PlpPageComponent } from "./plp/components/plp-page/plp-page";
import { DetailsPageComponent } from "./details-page/components/details-page/details-page";
import { EditPageComponent } from "./edit-page/components/edit-page/edit-page";
import { CartPageComponent } from "./cart/components/cart-view/cart-view";

export const routes: Routes = [
  {
    path: "",
    component: PlpPageComponent,
  },
  {
    path: "product/:id",
    component: DetailsPageComponent,
  },
  {
    path: "product/edit/:id",
    component: EditPageComponent,
  },
  {
    path: "cart",
    component: CartPageComponent,
  },
];
