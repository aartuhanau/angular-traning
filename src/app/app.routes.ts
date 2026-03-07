import { Routes } from "@angular/router";
import { PlpPage } from "./plp/components/plp-page/plp-page";
import { DetailsPage } from "./details-page/components/details-page/details-page";

export const routes: Routes = [
  {
    path: "",
    component: PlpPage,
  },
  {
    path: "details/:id",
    component: DetailsPage,
  },
];
