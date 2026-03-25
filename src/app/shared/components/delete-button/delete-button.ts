import { Component, inject, Input } from "@angular/core";
import { ProductService } from "../../services/product-service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "aa-delete-button",
  imports: [],
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
