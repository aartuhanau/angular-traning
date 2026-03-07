import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReviewSection } from "../review-section/review-section";
import { ProductInfoSection } from "../product-info-section/product-info-section";

@Component({
  selector: "details-page",
  imports: [ReviewSection, ProductInfoSection],
  templateUrl: "details-page.component.html",
  styleUrl: "./details-page.css",
})
export class DetailsPage {
  productId: string;
  private route = inject(ActivatedRoute);

  constructor() {
    this.productId = this.route.snapshot.paramMap.get("id") ?? "";
  }
}
