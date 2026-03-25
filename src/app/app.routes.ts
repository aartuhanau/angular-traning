import { Routes } from "@angular/router";
import { PlpPageComponent } from "./plp/components/plp-page/plp-page";
import { DetailsPageComponent } from "./details-page/components/details-page/details-page";
import { EditPageComponent } from "./edit-page/components/edit-page/edit-page";
import { AuthComponent } from "./auth/components/auth-component/auth-component";
import { authGuard } from "./shared/guards/auth-guards";
import { CartTableComponent } from "./cart/components/cart-table/cart-table";

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
    canActivate: [authGuard],
  },
  {
    path: "cart",
    component: CartTableComponent,
  },
  {
    path: "auth",
    component: AuthComponent,
  },
];
