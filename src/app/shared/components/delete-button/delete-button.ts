import { Component, inject, Input } from "@angular/core";
import { ProductService } from "../../services/product-service";

@Component({
  selector: "aa-delete-button",
  imports: [],
  templateUrl: "delete-button.component.html",
  styleUrl: "./delete-button.css",
})
export class DeleteButtonComponent {
  private productService: ProductService = inject(ProductService);
  @Input({ required: true })
  productId = 0;

  deleteProduct(): void {
    this.productService.deleteProduct(this.productId);
  }
}
