import { Component } from "@angular/core";
import { ProductListing } from "../product-listing/product-listing";
import { FilterSection } from "../filter-section/filter-section";

@Component({
  selector: "app-plp-page",
  imports: [ProductListing, FilterSection],
  templateUrl: "plp-page.component.html",
  styleUrl: "plp-page.css",
})
export class PlpPage {}
