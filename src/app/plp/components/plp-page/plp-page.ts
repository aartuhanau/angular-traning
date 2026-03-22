import { Component } from "@angular/core";
import { ProductListingComponent } from "../product-listing/product-listing";
import { FilterFormComponent } from "../filter/filter-form";

@Component({
  selector: "aa-plp-page",
  imports: [ProductListingComponent, FilterFormComponent],
  templateUrl: "plp-page.component.html",
  styleUrl: "plp-page.css",
})
export class PlpPageComponent {}
