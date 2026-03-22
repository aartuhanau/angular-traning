import { Routes } from "@angular/router";
import { PlpPageComponent } from "./plp/components/plp-page/plp-page";
import { DetailsPageComponent } from "./details-page/components/details-page/details-page";
import { EditPageComponent } from "./edit-page/components/edit-page/edit-page";
import { CartPageComponent } from "./cart/components/cart-view/cart-view";
import { AuthComponent } from "./auth/components/auth-component/auth-component";
import { authGuard } from "./shared/guards/auth-guards";

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
    component: CartPageComponent,
  },
  {
    path: "auth",
    component: AuthComponent,
  },
];
