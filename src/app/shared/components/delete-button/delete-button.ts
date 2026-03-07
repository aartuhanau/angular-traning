import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  input,
} from "@angular/core";
import { ProductService } from "../../services/product-service";

@Component({
  selector: "delete-button",
  imports: [],
  templateUrl: "delete-button.component.html",
  styleUrl: "./delete-button.css",
})
export class DeleteButton {
  productService: ProductService = inject(ProductService);
  @Input({ required: true })
  public id = 0;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.id);
  }
}
