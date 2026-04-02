import { Routes } from "@angular/router";
import { AuthComponent } from "./auth/components/auth-component/auth-component";
import { authGuard } from "./shared/guards/auth-guards";
import { CartTableComponent } from "./cart/components/cart-table/cart-table";
import { PlpPageComponent } from "./product/components/plp-page/plp-page";
import { DetailsPageComponent } from "./product/components/details-page/details-page";
import { EditPageComponent } from "./product/components/edit-page/edit-page";

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
