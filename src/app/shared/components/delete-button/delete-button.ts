import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  input,
} from "@angular/core";
import { ProductService } from "../../services/product-service";
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: "delete-button",
  imports: [RouterLinkActive],
  templateUrl: "delete-button.component.html",
  styleUrl: "./delete-button.css",
})
export class DeleteButton {
  private productService: ProductService = inject(ProductService);
  @Input({ required: true })
  id = 0;

  deleteProduct(): void {
    this.productService.deleteProduct(this.id);
  }
}
