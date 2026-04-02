import { Component, inject, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ProductInfo } from "src/app/shared/models/product-info";
import { ProductService } from "src/app/shared/services/product-service";

@Component({
  selector: "aa-product-info-section",
  standalone: false,
  templateUrl: "product-info-section.component.html",
  styleUrl: "./product-info-section.css",
})
export class ProductInfoSectionComponent {
  @Input({ required: true })
  productId: string = "";
  product$!: Observable<ProductInfo>;
  productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    this.product$ = this.productService.getProduct(this.productId);
  }
}
