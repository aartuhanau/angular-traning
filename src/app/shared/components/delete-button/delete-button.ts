import { Component, inject, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/product/services/product-service";

@Component({
  standalone: false,
  selector: "aa-delete-button",
  templateUrl: "delete-button.component.html",
  styleUrl: "./delete-button.css",
})
export class DeleteButtonComponent {
  private productService: ProductService = inject(ProductService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  @Input({ required: true })
  productId = 0;

  deleteProduct(): void {
    this.productService.deleteProduct(
      this.productId,
      this.route.snapshot.queryParamMap,
    );
  }
}
