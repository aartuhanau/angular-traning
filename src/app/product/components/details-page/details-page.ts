import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "aa-details-page",
  standalone: false,
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
