import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReviewSectionComponent } from "../review-section/review-section";
import { ProductInfoSectionComponent } from "../product-info-section/product-info-section";

@Component({
  selector: "aa-details-page",
  imports: [ReviewSectionComponent, ProductInfoSectionComponent],
  templateUrl: "details-page.component.html",
  styleUrl: "./details-page.css",
})
export class DetailsPageComponent {
  productId: string;
  private route = inject(ActivatedRoute);

  constructor() {
    this.productId = this.route.snapshot.paramMap.get("id") ?? "";
  }
}
